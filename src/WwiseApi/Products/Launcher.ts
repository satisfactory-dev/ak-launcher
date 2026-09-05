import type {
	SuccessfulResponse,
} from '../AbstractApi.ts';
import AbstractApi from '../AbstractApi.ts';

import type {
	nicknamed_version,
} from './Versions.ts';

type filesUrl<
	year extends number,
	major extends number,
	minor extends number,
	build extends number,
	format extends 'exe'|'pkg',
> = {
	name: `AudiokineticLauncher-${year}.${major}.${minor}.${build}.${format}`,
	url: `https://blob-api-builds.gowwise.com/Launcher_${
		year
	}.${
		major
	}.${
		minor
	}.${
		build
	}/AudiokineticLauncher-${
		year
	}.${
		major
	}.${
		minor
	}.${
		build
	}.${
		format
	}?Expires=${
		number
	}&Policy=${
		string
	}&Signature=${
		string
	}&Key-Pair-Id=${
		string
	}`,
};

export type latest_launcher<
	year extends number = number,
	major extends number = number,
	minor extends number = number,
	build extends number = number,
> = SuccessfulResponse<{
	filesUrl: [
		filesUrl<year, major, minor, build, 'pkg'>,
		filesUrl<year, major, minor, build, 'exe'>,
	],
	version: nicknamed_version<
		'',
		year,
		major,
		minor,
		build
	>,
}>;

export default class Launcher extends AbstractApi {
	latest_launcher(
		jwt: string,
		validate_verified_payload: (
			maybe: unknown,
		) => maybe is latest_launcher,
	): Promise<latest_launcher> {
		return this.api_call<latest_launcher>(
			jwt,
			'https://blob-api.gowwise.com/v4/products/launcher',
			validate_verified_payload,
		);
	}
}
