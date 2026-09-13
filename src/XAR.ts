import type {
	readFile,
} from 'node:fs/promises';

import decompress from './decompress.ts';

import type integer from './integer.ts';

function naive_parse<
	ParentTag extends (
		| 'file'
		| 'data'
	),
>(
	xml: string,
	look_for: (
		ParentTag extends 'file'
			? '<name>Payload</name>'
			: '<encoding style="application/octet-stream"/>'
	),
	inside: (
		ParentTag extends 'file'
			? [ParentTag, 'id']
			: [ParentTag]
	),
): string {
	const matches: [number, number, number][] = [];

	const regex = new RegExp(RegExp.escape(look_for), 'g');
	const [opening_tag_name, opening_tag_first_attr] = inside;

	const opening_look_for = `<${opening_tag_name}${
		opening_tag_first_attr
			? ` ${opening_tag_first_attr}="`
			: ''
	}`;

	const closing_tag_string = `</${opening_tag_name}>`;

	for (const {
		index,
	} of xml.matchAll(regex)) {
		const opening_tag = xml.lastIndexOf(opening_look_for, index);

		if (-1 === opening_tag) {
			throw new Error(
				`Found what we're looking for, but without a corresponding ${
					opening_tag_name
				} tag!`,
			);
		}

		const opening_tag_closer = xml.indexOf('>', opening_tag);

		if (-1 === opening_tag_closer) {
			throw new Error(
				`Failed to find a closing bracket for the ${
					opening_tag_name
				} tag!`,
			);
		}

		const closing_tag = xml.indexOf(closing_tag_string, index);

		if (-1 === closing_tag) {
			throw new Error(
				`Found opening file tag without corresponding closing ${
					opening_tag_name
				} tag!`,
			);
		}

		if (matches.findIndex(([a, b, c]) => (
			a === opening_tag
			&& b === opening_tag_closer
			&& c === closing_tag
		)) >= 0) {
			continue;
		}

		matches.push([
			opening_tag,
			opening_tag_closer,
			closing_tag,
		]);
	}

	if (1 !== matches.length) {
		throw new Error(
			`Was expecting one match, found ${
				matches.length
			} for ${
				opening_tag_name
			}`,
		);
	}

	const [[, opening_tag_closer, closing_tag]] = matches;

	return xml.slice(opening_tag_closer, closing_tag);
}

function is_attribute_pair(maybe: string[]): maybe is [string, string] {
	return 2 === maybe.length;
}

function payload_data(
	toc: string,
) {
	const file_element = naive_parse(
		toc,
		'<name>Payload</name>',
		[
			'file',
			'id',
		],
	);

	const data_element = naive_parse(
		file_element,
		'<encoding style="application/octet-stream"/>',
		[
			'data',
		],
	);

	const output: (
		| [string, {[key: string]: string}]
		| [string, {[key: string]: string}, string]
	)[] = [];

	for (
		const [
			,
			element,
			attributes_raw,
			contents,
		] of data_element.matchAll(
			/<([a-z][a-z-]*)( [a-z]+="[^"]+")*(?:>([^<]+)<\/\1>|\s*\/>)/g,
		)
	) {
		const attributes = Object.freeze(
			Object.fromEntries(
				(attributes_raw || '')
					.trim()
					.split('" ')
					.filter((e) => '' !== e)
					.map((e): [
						string,
						string,
					] => {
						const parts = e.replace(/"$/, '').split('="');

						if (!is_attribute_pair(parts)) {
							throw new Error('non-pair split was found!');
						}

						return parts;
					}),
			),
		);

		const row: typeof output[number] = [
			element,
			attributes,
		];

		if (contents) {
			row.push(contents);
		}

		output.push(row);
	}

	const length = output.find((maybe): maybe is [
		'length',
		Record<never, never>,
		`${integer}`,
	] => (
		'length' === maybe[0]
		&& 0 === Object.keys(maybe[1]).length
		&& !!maybe[2]
		&& /^\d+$/.test(maybe[2])
	));

	const encoding = output.find((maybe): maybe is [
		'encoding',
		{style: 'application/octet-stream'},
	] => (
		'encoding' === maybe[0]
		&& 1 === Object.keys(maybe[1]).length
		&& 'style' in maybe[1]
		&& 'application/octet-stream' === maybe[1].style
		&& !maybe[2]
	));

	const offset = output.find((maybe): maybe is [
		'offset',
		Record<never, never>,
		`${integer}`,
	] => (
		'offset' === maybe[0]
		&& 0 === Object.keys(maybe[1]).length
		&& !!maybe[2]
		&& /^\d+$/.test(maybe[2])
	));

	const size = output.find((maybe): maybe is [
		'size',
		Record<never, never>,
		`${integer}`,
	] => (
		'size' === maybe[0]
		&& 0 === Object.keys(maybe[1]).length
		&& !!maybe[2]
		&& /^\d+$/.test(maybe[2])
	));

	type sha1 = (
		& string
		& {
			readonly length: 40,
		}
	);

	type checksum<T extends Exclude<string, ''>> = [
		`${T}-checksum`,
		{style: 'sha1'},
		sha1,
	];

	const extracted_checksum = output.find((
		maybe,
	): maybe is checksum<'extracted'> => (
		'extracted-checksum' === maybe[0]
		&& 1 === Object.keys(maybe[1]).length
		&& 'style' in maybe[1]
		&& 'sha1' === maybe[1].style
		&& !!maybe[2]
		&& /^[a-f0-9]{40}$/.test(maybe[2])
	));

	const archived_checksum = output.find((
		maybe,
	): maybe is checksum<'extracted'> => (
		'archived-checksum' === maybe[0]
		&& 1 === Object.keys(maybe[1]).length
		&& 'style' in maybe[1]
		&& 'sha1' === maybe[1].style
		&& !!maybe[2]
		&& /^[a-f0-9]{40}$/.test(maybe[2])
	));

	if (undefined === length) {
		throw new Error('Could not find length!');
	} else if (undefined === encoding) {
		throw new Error('Could not find encoding!');
	} else if (undefined === offset) {
		throw new Error('Could not find offset!');
	} else if (undefined === size) {
		throw new Error('Could not find size!');
	} else if (undefined === extracted_checksum) {
		throw new Error('Could not find extracted_checksum!');
	} else if (undefined === archived_checksum) {
		throw new Error('Could not find archived_checksum!');
	} else if (
		size[2] !== length[2]
	) {
		throw new Error('Expecting equal size and length values!');
	} else if (
		archived_checksum[2] !== extracted_checksum[2]
	) {
		throw new Error('Expecting equal checksums!');
	}

	return Object.freeze({
		length: parseInt(length[2], 10) as integer,
		encoding: encoding[1].style,
		offset: parseInt(offset[2], 10) as integer,
		size: parseInt(size[2], 10) as integer,
		'extracted-checksum': extracted_checksum[2],
		'archived-checksum': archived_checksum[2],
	});
}

async function cpio_payload_from_toc(
	toc: string,
	toc_compressed_length: integer,
	file_array: Uint8Array,
) {
	const payload = payload_data(toc);

	if ((payload.length + payload.offset + 28) > file_array.length) {
		throw new Error(

			// oxlint-disable-next-line @stylistic/max-len
			'XAR header + payload length & offset are greater than the size of the file!',
		);
	}

	const payload_start = (
		28
		+ toc_compressed_length
		+ payload.offset
	);

	const expected_payload = file_array.subarray(
		payload_start,
		payload_start + payload.length,
	);

	const sha1 = (new Uint8Array(await crypto.subtle.digest(
		'SHA-1',
		expected_payload as BufferSource,
	))).toHex();

	if (sha1 !== payload['archived-checksum']) {
		throw new Error(
			`Payload checksum does not match, expecting ${
				payload['archived-checksum']
			}, received ${
				sha1
			}`,
		);
	}

	return new Uint8Array(await decompress(expected_payload, 'gzip'));
}

export default async function cpio_payload_from_XAR(
	file: (
		| Buffer
		| Exclude<Awaited<ReturnType<typeof readFile>>, string>
		| ArrayBuffer
	),
	decoder: TextDecoder,
) {
	const file_array = new Uint8Array(file);
	const file_view = new DataView(file_array.buffer);

	if (!(
		file_array.length > 4
		&& 0x78 === file_array[0]
		&& 0x61 === file_array[1]
		&& 0x72 === file_array[2]
		&& 0x21 === file_array[3]
	)) {
		throw new Error('magic bytes header not found!');
	} else if (
		28 !== file_view.getUint16(4, false)
	) {
		throw new Error('uint16_t size was not 28!');
	} else if (
		1 !== file_view.getUint16(6, false)
	) {
		throw new Error('uint16_t version was not 1!');
	}

	const toc_length_compressed = file_view.getBigUint64(8, false);
	const toc_length_uncompressed = file_view.getBigUint64(16, false);
	const cksum_alg = file_view.getUint32(24, false);

	const max_big_int = BigInt(Number.MAX_SAFE_INTEGER);

	if (toc_length_compressed + 28n > file_array.length) {
		throw new Error(

			// oxlint-disable-next-line @stylistic/max-len
			'toc_length_compressed listed as being larger than the file itself!',
		);
	} else if (toc_length_compressed > max_big_int) {
		throw new Error(

			// oxlint-disable-next-line @stylistic/max-len
			'toc_length_compressed is of a size that will lose precision when cast to Number',
		);
	} else if (toc_length_uncompressed > max_big_int) {
		throw new Error(

			// oxlint-disable-next-line @stylistic/max-len
			'toc_length_uncompressed is of a size that will lose precision when cast to Number',
		);
	} else if (1 !== cksum_alg) {
		throw new Error(`cksum_alg expected to be 1, received ${cksum_alg}`);
	}

	const toc_compressed = file_array.subarray(
		28,
		28 + Number(toc_length_compressed),
	);

	const toc_uncompressed = await decompress(toc_compressed, 'deflate');

	if (BigInt(toc_uncompressed.byteLength) !== toc_length_uncompressed) {
		throw new Error(
			'Deflated length of toc does not match expected length!',
		);
	}

	const toc = decoder.decode(toc_uncompressed);

	return cpio_payload_from_toc(
		toc,
		toc_compressed.byteLength as integer,
		file_array,
	);
}
