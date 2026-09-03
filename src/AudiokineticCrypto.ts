export default class AudiokineticCrypto {
	static readonly #public_key_string = `-----BEGIN PUBLIC KEY-----
		MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnAYv/1xDhJ39iT7Ftzcv
		zXmhZRHkw5fbMPvz65z0Zh30yZCCmi5RZ0ds5kLcNdov0cdRkhPkWGkWe9/G+dkX
		54DRMdvgIcuvmpAgxKz3re1vuTZHvz1DR2sy5FpSPV6lsX3CRLpaXzEo9fgYdqyB
		cnqeOaq1byeNTMp2uRUF84NzkH2A3x6Vxx6pThdVMAVKbvPUhEtSBARAKxQstCkQ
		ut8FlvQm2RgJrwbmXQfloz4h7uPwaM2jD2eApCfXHK05xh+1zMWFu6oqhqkfKUIK
		GceEwONPkd039fwirfgKjbD5iGli3AuNn6PFVqyK0tcG/qYhjNVtJLCsHSmHyipD
		rQIDAQAB
		-----END PUBLIC KEY-----`;

	static readonly #public_key = crypto.subtle.importKey(
		'spki',
		Uint8Array.fromBase64(
			this.#public_key_string
				.substring(26, this.#public_key_string.length - 24)
				.replaceAll(/\s+/g, ''),
		),
		{
			name: 'RSASSA-PKCS1-v1_5',
			hash: 'SHA-1',
		},
		false,
		['verify'],
	);

	static async verify(
		signature: string,
		payload: string,
	) {
		return crypto.subtle.verify(
			{
				name: 'RSASSA-PKCS1-v1_5',
			},
			await this.#public_key,
			Uint8Array.fromBase64(signature),
			Uint8Array.fromBase64(payload),
		);
	}
}
