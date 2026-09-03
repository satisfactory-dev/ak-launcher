import AudiokineticPayload from '../../AudiokineticPayload.ts';
import FromUri from './Launcher/FromUri.ts';

export default class Launcher {
	async login(
		code: string,
		validate_verified_payload: (
			maybe: unknown,
		) => maybe is {code: 200, jwt: string},
	) {
		const result: unknown = await (await fetch(
			`https://www.audiokinetic.com/wwise/launcher/?action=login`,
			{
				method: 'POST',
				body: new URLSearchParams({
					code,
				}),
			},
		)).json();

		return AudiokineticPayload.from_unverified(
			result,
			validate_verified_payload,
		);
	}

	async login_from_uri(
		maybe: string,
		validate_verified_payload: Parameters<Launcher['login']>[1],
	) {
		return this.login(
			(new FromUri(maybe)).toString(),
			validate_verified_payload,
		);
	}
}
