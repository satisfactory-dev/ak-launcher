
import type {
	readFile,
} from 'node:fs/promises';

import type {
	CpioOdcHeader,
} from './CPIO.ts';
import CPIO from './CPIO.ts';

import Launcher from './WwiseApi/Products/Launcher.ts';

import cpio_payload_from_XAR from './XAR.ts';

type file_source = (
	| Buffer
	| Exclude<Awaited<ReturnType<typeof readFile>>, string>
	| ArrayBuffer
);

type result = [CpioOdcHeader, ...CpioOdcHeader[]];

function is_non_empty(
	maybe: CpioOdcHeader[],
): maybe is result {
	return maybe.length >= 1;
}

export default class EULA {
	static #regex = (
		/^\.\/Wwise Launcher\.app\/Contents\/Resources\/licenses\/[^.]+\.txt$/
	);

	static async from_mac_launcher(
		source: (
			| file_source
			| Promise<file_source>
		),
	): Promise<result>;
	static async from_mac_launcher(
		source: Launcher,
		...launcher_args: Parameters<Launcher['latest_launcher']>
	): Promise<result>;
	static async from_mac_launcher(
		source: (
			| file_source
			| Promise<file_source>
			| Launcher
		),
		...launcher_args: []|Parameters<Launcher['latest_launcher']>
	): Promise<result> {
		let file: file_source;

		if (source instanceof Launcher) {
			if (2 !== launcher_args.length) {
				throw new Error(

					// oxlint-disable-next-line @stylistic/max-len
					'Arguments for Launcher API must be passed when using Launcher API as a source!',
				);
			}

			const [jwt, validator] = launcher_args;

			const {data: {
				// yes we're getting the mac version
				// 7-zip js stuff seems to be unlicensed or gpl 🤷‍♂️
				filesUrl: [latest_launcher],
			}} = await source.latest_launcher(
				jwt,
				validator,
			);

			file = await (await fetch(latest_launcher.url)).arrayBuffer();
		} else {
			file = await source;
		}

		const decoder = new TextDecoder();

		const uncompressed_payload = await cpio_payload_from_XAR(
			file,
			decoder,
		);

		const cpio = new CPIO(decoder, uncompressed_payload);

		const licenses = cpio.ls((maybe) => this.#regex.test(maybe));

		if (!is_non_empty(licenses)) {
			throw new Error('Did not find any licenses!');
		}

		return licenses;
	}
}
