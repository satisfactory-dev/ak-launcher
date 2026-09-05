import AudiokineticPayload from '../AudiokineticPayload.ts';

export type SuccessfulResponse<
	T extends {[key: string]: unknown},
> = {
	statusCode: 200,
	data: T,
};

export default abstract class AbstractApi {
	readonly #package_version: string;

	constructor(
		package_version: string,
	) {
		this.#package_version = package_version;
	}

	protected async api_call(
		jwt: string,
		url: `https://blob-api.gowwise.com/${Exclude<string, ''>}`,
	): Promise<unknown>;
	protected async api_call<T>(
		jwt: string,
		url: `https://blob-api.gowwise.com/${Exclude<string, ''>}`,
		validate_verified_payload: (maybe: unknown) => maybe is T,
	): Promise<T>;
	protected async api_call<T>(
		jwt: string,
		url: `https://blob-api.gowwise.com/${Exclude<string, ''>}`,
		validate_verified_payload?: (maybe: unknown) => maybe is T,
	) {
		const result: unknown = await (await fetch(
			url,
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
					'X-client-version': this.#package_version,
				},
			},
		)).json();

		if (validate_verified_payload) {
			return AudiokineticPayload.from_unverified<
				T
			>(
				result,
				validate_verified_payload,
			);
		}

		return AudiokineticPayload.from_unverified(
			result,
		);
	}
}
