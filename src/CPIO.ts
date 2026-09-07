import type integer from './integer.ts';

type cpio_odc_header = Readonly<{
	c_magic: '070707',
	c_dev: (
		& string
		& {
			readonly length: 6,
		}
	),
	c_ino: (
		& string
		& {
			readonly length: 6,
		}
	),
	c_mode: (
		& string
		& {
			readonly length: 6,
		}
	),
	c_uid: (
		& string
		& {
			readonly length: 6,
		}
	),
	c_gid: (
		& string
		& {
			readonly length: 6,
		}
	),
	c_nlink: (
		& string
		& {
			readonly length: 6,
		}
	),
	c_rdev: (
		& string
		& {
			readonly length: 6,
		}
	),
	c_mtime: (
		& string
		& {
			readonly length: 11,
		}
	),
	c_namesize: (
		& string
		& {
			readonly length: 6,
		}
	),
	c_filesize: (
		& string
		& {
			readonly length: 11,
		}
	),
}>;

function ascii_to_text_by_length<
	Length extends number,
>(
	decoder: TextDecoder,
	from: Uint8Array,
	start: number,
	length: Length,
) {
	const maybe = decoder.decode(from.subarray(start, start + length));

	if (maybe.length !== length) {
		throw new Error(
			`Expected a size of ${
				length
			}, received ${
				maybe.length
			}`,
		);
	}

	return maybe as (
		& string
		& {
			readonly length: Length,
		}
	);
}

class CpioOdcHeader {
	readonly raw: cpio_odc_header;

	readonly #c_namesize: integer;

	readonly #c_filesize: integer;

	readonly #offset: integer;

	readonly #decoder: TextDecoder;

	readonly #from: Uint8Array;

	#filename: (
		| string
		| undefined
	) = undefined;

	get next_offset(): integer {
		return (
			this.#offset
			+ 76
			+ this.#c_namesize
			+ this.#c_filesize
		) as integer;
	}

	get filename() {
		if (undefined === this.#filename) {
			this.#filename = ascii_to_text_by_length(
				this.#decoder,
				this.#from,
				this.#offset + 76,
				this.#c_namesize - 1,
			);
		}

		return this.#filename;
	}

	get contents() {
		const offset = this.#offset + 76 + this.#c_namesize;

		return this.#from.subarray(
			offset,
			offset + this.#c_filesize,
		);
	}

	constructor(
		decoder: TextDecoder,
		from: Uint8Array,
		offset: integer,
		trailer_start: integer,
		header: cpio_odc_header,
	) {
		if (!/^\d+$/.test(header.c_namesize)) {
			throw new Error('c_header was not an ascii integer!');
		} else if (!/^\d+$/.test(header.c_filesize)) {
			throw new Error('c_header was not an ascii integer!');
		}

		const c_namesize = parseInt(header.c_namesize, 8) as integer;
		const c_filesize = parseInt(header.c_filesize, 8) as integer;

		if (c_namesize < 2) {
			throw new Error(
				'Was expecting 2 or more bytes for c_namesize length!',
			);
		}

		if ((offset + 76 + c_namesize + c_filesize) > trailer_start) {
			throw new Error(

				// oxlint-disable-next-line @stylistic/max-len
				'This header indicates a file that would sneak past the start of the cpio trailer!',
			);
		}

		this.raw = header;
		this.#decoder = decoder;
		this.#from = from;
		this.#offset = offset;
		this.#c_namesize = c_namesize;
		this.#c_filesize = c_filesize;
	}
}

export type {
	CpioOdcHeader,
};

export default class CPIO {
	#headers: (
		| [CpioOdcHeader, ...CpioOdcHeader[]]
		| undefined
	) = undefined;

	#decoder: TextDecoder;

	#from: Uint8Array;

	#trailer_start: integer;

	get headers() {
		if (!this.#headers) {
			this.#headers = CPIO.#cpio_odc_headers(
				this.#decoder,
				this.#from,
				this.#trailer_start,
			);
		}

		return this.#headers;
	}

	constructor(
		decoder: TextDecoder,
		from: Uint8Array,
	) {
		this.#decoder = decoder;
		this.#from = from;

		let maybe_null_trailer = from.byteLength as integer;

		while (
			0 === from.at(maybe_null_trailer - 1)
			&& maybe_null_trailer > 0
		) {
			--maybe_null_trailer;
		}

		const cpio_trailer = ascii_to_text_by_length(
			decoder,
			from,
			maybe_null_trailer - 10,
			10,
		);

		if ('TRAILER!!!' !== cpio_trailer) {
			throw new Error('CPIO trailer was not found!');
		} else if (
			from.byteLength < 86
		) {
			throw new Error(

				// oxlint-disable-next-line @stylistic/max-len
				'Uncompressed payload is smaller than a single header + trailer',
			);
		}

		this.#trailer_start = maybe_null_trailer - 10 - 76 as integer;
	}

	ls(comparator?: (maybe: string) => boolean) {
		if (!comparator) {
			return this.headers;
		}

		const actual_comparator = (maybe: CpioOdcHeader) => {
			return comparator(maybe.filename);
		};

		return this.headers.filter(actual_comparator);
	}

	find(comparator: (maybe: string) => boolean): CpioOdcHeader | undefined {
		for (const header of this.headers) {
			if (comparator(header.filename)) {
				return header;
			}
		}
	}

	static #is_integer(maybe: unknown): maybe is integer {
		return 'number' === typeof maybe && Number.isSafeInteger(maybe);
	}

	static #is_c_magic(maybe: unknown): maybe is '070707' {
		return '070707' === maybe;
	}

	static #cpio_odc_header(
		decoder: TextDecoder,
		from: Uint8Array,
		offset: integer,
		trailer_start: integer,
	) {
		if (!this.#is_integer(offset)) {
			throw new Error('Offset must be an integer!');
		} else if (!this.#is_integer(trailer_start)) {
			throw new Error('Trailer start must be an integer!');
		} else if (offset < 0) {
			throw new Error('Offset must be equal to or greater than zero!');
		} else if (trailer_start > (from.byteLength - 10)) {
			throw new Error(
				`Trailer is 10 characters long, not counting null bytes.${
					' '

				// oxlint-disable-next-line @stylistic/max-len
				}Cannot expect the trailer to start without enough space left.`,
			);
		} else if ((offset + 76) > trailer_start) {
			throw new Error(

				// oxlint-disable-next-line @stylistic/max-len
				'Cannot find header in remaining space in the uncompressed payload!',
			);
		}

		const c_magic = ascii_to_text_by_length(decoder, from, offset, 6);

		if (!this.#is_c_magic(c_magic)) {
			throw new Error(
				`Was expecting cpio magic bytes value of 070707, received ${
					c_magic
				} at offset ${
					offset
				}`,
			);
		}

		return Object.freeze({
			c_magic,
			c_dev: ascii_to_text_by_length(
				decoder,
				from,
				offset + 6,
				6,
			),
			c_ino: ascii_to_text_by_length(
				decoder,
				from,
				offset + 12,
				6,
			),
			c_mode: ascii_to_text_by_length(
				decoder,
				from,
				offset + 18,
				6,
			),
			c_uid: ascii_to_text_by_length(
				decoder,
				from,
				offset + 24,
				6,
			),
			c_gid: ascii_to_text_by_length(
				decoder,
				from,
				offset + 30,
				6,
			),
			c_nlink: ascii_to_text_by_length(
				decoder,
				from,
				offset + 36,
				6,
			),
			c_rdev: ascii_to_text_by_length(
				decoder,
				from,
				offset + 42,
				6,
			),
			c_mtime: ascii_to_text_by_length(
				decoder,
				from,
				offset + 48,
				11,
			),
			c_namesize: ascii_to_text_by_length(
				decoder,
				from,
				offset + 59,
				6,
			),
			c_filesize: ascii_to_text_by_length(
				decoder,
				from,
				offset + 65,
				11,
			),
		});
	}

	static #cpio_odc_headers(
		decoder: TextDecoder,
		from: Uint8Array,
		trailer_start: integer,
	) {
		let offset = 0 as integer;

		const headers: CpioOdcHeader[] = [];

		while (offset < trailer_start) {
			const current_header = new CpioOdcHeader(
				decoder,
				from,
				offset,
				trailer_start,
				this.#cpio_odc_header(
					decoder,
					from,
					offset,
					trailer_start,
				),
			);

			headers.push(current_header);

			offset = current_header.next_offset;

			if (offset >= trailer_start) {
				break;
			}
		}

		if (headers.length < 1) {
			throw new Error('Could not find any headers!');
		}

		return headers as [CpioOdcHeader, ...CpioOdcHeader[]];
	}
}
