import AudiokineticCrypto from './AudiokineticCrypto.ts';

// oxlint-disable-next-line @stylistic/padded-blocks
export default class AudiokineticPayload {

	// oxlint-disable-next-line @stylistic/lines-around-comment
	/**
	 * JSON responses come with a payload and signature, we want to verify them
	 *
	 * @todo auto-throw if payload is an error response,
	 *  i.e. {statusCode: 410, message: string, err: string}
	 */
	static async from_unverified(
		maybe: unknown,
	): Promise<unknown>;
	static async from_unverified<
		T,
	>(
		maybe: unknown,
		validate_verified_payload: (maybe: unknown) => maybe is T,
	): Promise<T>;
	static async from_unverified<
		T,
	>(
		maybe: unknown,
		validate_verified_payload?: (maybe: unknown) => maybe is T,
	) {
		this.#assert_is_potentially_verifiable(maybe);

		if (!(await AudiokineticCrypto.verify(
			maybe.signature,
			maybe.payload,
		))) {
			throw new Error('Could not verify integrity of payload!');
		}

		const unvalidated: unknown = JSON.parse(
			(new TextDecoder()).decode(Uint8Array.fromBase64(maybe.payload)),
		);

		if (!validate_verified_payload) {
			return unvalidated;
		}

		if (!validate_verified_payload(unvalidated)) {
			throw new Error('Payload did not pass validation!');
		}

		return unvalidated;
	}

	static #assert_is_potentially_verifiable(
		maybe: unknown,
	): asserts maybe is {payload: string, signature: string} {
		if ('object' !== typeof maybe) {
			throw new Error('Argument was not an object!');
		} else if (null === maybe) {
			throw new Error('Argument was null!');
		} else if (Array.isArray(maybe)) {
			throw new Error('Argument was an array!');
		} else if (2 !== Object.keys(maybe).length) {
			throw new Error('Argument was expected to have two keys!');
		} else if (
			!('payload' in maybe)
		) {
			throw new Error('Argument did not contain payload!');
		} else if (
			!('signature' in maybe)
		) {
			throw new Error('Argument did not contain signature!');
		} else if ('string' !== typeof maybe.payload) {
			throw new Error(
				'Argument payload value was not supplied as a string!',
			);
		} else if ('string' !== typeof maybe.signature) {
			throw new Error(
				'Argument signature value was not supplied as a string!',
			);
		}
	}

	static is_jwt_object(maybe: unknown): maybe is {
		code: 200,
		jwt: string,
	} {
		return (
			'object' === typeof maybe
			&& null !== maybe
			&& !Array.isArray(maybe)
			&& 2 == Object.keys(maybe).length
			&& 'code' in maybe
			&& 'jwt' in maybe
			&& 200 === maybe.code
			&& 'string' === typeof maybe.jwt
		);
	}
}
