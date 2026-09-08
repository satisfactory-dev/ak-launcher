import type {} from '@signpostmarv/js-types';

import type {
	SuccessfulResponse,
} from '../AbstractApi.ts';
import AbstractApi from '../AbstractApi.ts';

type BundleType = (
	| 'wwise'
	| 'plugin'
	| 'UnityIntegration'
	| 'UnrealIntegration'
	| 'sample'
	| 'Launcher'
	| 'collection'
	| 'Library'
	| 'course'
);

type Link = {
	displayName: Exclude<string, ''>,
	id: Exclude<string, ''>,
	url: `https://${Exclude<string, ''>}`,
};

type MacOS = {
	IS_USING_ROOT_LIBRARY: boolean,
	minimumRequiredVersion: {
		major: number,
		minor: number,
	},
};

type ProductDependentData = {
	crossoverBottleName: Exclude<string, ''>,
};

type ProductDependentDataWithPlugins = (
	& ProductDependentData
	& {
		plugins: {
			oldestSupportedWwiseVersion: {
				major: number,
				year: number,
			},
		},
	}
);

export type nicknamed_version<
	nickname extends string = string,
	year extends number = number,
	major extends number = number,
	minor extends number = number,
	build extends number = number,
> = {
	build: build,
	major: major,
	minor: minor,
	nickname: nickname,
	year: year,
};

type VersionCommonBase = {
	id: Exclude<string, ''>,
	tag: Exclude<string, ''>,
	type: Exclude<string, ''>,
	name: Exclude<string, ''>,
	productDependentData: (
		| Record<never, never>
		| ProductDependentData
		| ProductDependentDataWithPlugins
		| (
			& ProductDependentDataWithPlugins
			& {
				macOS: (
					| MacOS
					| (
						& MacOS
						& {
							skipWinePrefix: true,
						}
					)
				),
			}
		)
	),
	vendor: Exclude<string, ''>,
	version: nicknamed_version<Exclude<string, ''>>,
	links: [Link, ...Link[]],
	$checked: null,
	$unlocked: null,
	$visible: null,
	$disabled: null,
	$message: null,
	$sortGroupIndex: number,
	applicable: null,
	labels: Array<never>,
	initialPublishDate: number,
};

type BundleBase = VersionCommonBase & {
	versionTag: Exclude<string, ''>,
	published: 0|1,
	stable: 0|1,
	versionName: Exclude<string, ''>,
	description: null,
	requiredLicenseId: 0|1,
	documentation: Array<never>,
	automaticDeletion: 0|1,
	supported: 0|1,
	categoryId: number,
	image: null,
	updateDate: number|null,
	publishDate: number|null,
};

type VersionLauncherBase = (
	& VersionCommonBase
	& {
		launcher: {
			minimumRequiredVersion: {
				major: number,
				minor: number,
				year: number,
			},
		},
	}
);

type Bundle = (
	| BundleBase
	| (
		& BundleBase
		& VersionLauncherBase
	)
);

type VersionEula = {
	display: Exclude<string, ''>,
	fileName: `${Exclude<string, ''>}.txt`,
	id: Exclude<string, ''>,
};

type VersionExecutableFile = (
	& {
		architecture: 'amd64',
		displayName: Exclude<string, ''>,
	}
	& (
		| (
			& {
				os: 'Windows',
			}
			& (
				| {
					config: 'Release',
					filePath: `Authoring/x64/Release/Bin/${
						Exclude<string, ''>
					}.exe`,
				}
				| {
					config: 'Debug',
					filePath: `Authoring/x64/Debug/Bin/${
						Exclude<string, ''>
					}.exe`,
				}
			)
		)
		| {
			config: 'Release',
			os: 'Mac',
			filePath: `${Exclude<string, ''>}.app`,
		}
	)
);

type VersionFileDocumentation = {
	displayName: Exclude<string, ''>,
	path: `${Exclude<string, ''>}.${'chm' | 'pdf'}`,
};

type VersionFileGroup = (
	| {
		groupId: 'Packages',
		groupValueId: (
		| 'Authoring'
		| 'Documentation'
			| 'SDK'
		),
	}
	| {
		groupId: 'AuthoringPlatforms',
		groupValueId: (
		| 'x64'
		),
	}
	| {
		groupId: 'AuthoringOS',
		groupValueId: (
		| 'Windows'
			| 'OSX'
		),
	}
	| {
		groupId: 'DeploymentPlatforms',
		groupValueId: (
		| 'WinGC'
			| 'Windows_vc160'
			| 'Windows_vc170'
		| 'Linux'
		| 'Android'
		| 'iOS'
		| 'tvOS'
		| 'visionOS'
		| 'Mac'
		),
	}
);

type filename_xz = `${Exclude<string, ''>}.tar.xz`;
type filename_zip = `${Exclude<string, ''>}.zip`;
type filename_compressed = (
	| filename_xz
	| filename_zip
);
type filename_exe = `${Exclude<string, ''>}.exe`;

type VersionFile = {
	documentationFiles: [
		VersionFileDocumentation,
		...VersionFileDocumentation[],
	],
	groups: [
		VersionFileGroup,
		...VersionFileGroup[],
	],
	id: filename_compressed,
	licenses: Array<never>,
	name: filename_compressed,
	sha1: (
		& string
		& {
			readonly length: 40,
		}
	),
	size: number, // integer
	sourceName: filename_compressed,
	uncompressedSize: number, // integer
};

type VersionExecutable = {
	files: [VersionExecutableFile, ...VersionExecutableFile[]],
	groupId: Exclude<string, ''>,
	id: Exclude<string, ''>,
};

type VersionGroupValueBase = {
	displayName: Exclude<string, ''>,
	eulaIds: [Exclude<string, ''>, ...Exclude<string, ''>[]],
	id: Exclude<string, ''>,
};

type VersionGroupValueWithLicense = (
	& VersionGroupValueBase
	& {
		license: {
			platform: (
				| 'Android'
				| 'iOS'
				| 'Mac'
				| 'Linux'
				| 'Emscripten'
				| 'OpenHarmony'
				| 'Windows'
				| 'XboxOne'
				| 'Switch'
				| 'Ounce'
				| 'PS4'
				| 'PS5'
				| 'XboxSeriesX'
			),
		},
	}
);

type VersionGroupValueHasVisible = {
	$visible: (
		| boolean
		| 'hasNoMessage'
	),
};

type VersionGroupValueHasApplicable = {
	applicable: (
		| 'isOSX'
		| 'isWindows'
	),
};

type VersionGroupValueHasChecked = {
	$checked: boolean,
};

type VersionGroupValueHasDescription = {
	description: Exclude<string, ''>,
};

type VersionGroupValue = (
	| VersionGroupValueBase
	| VersionGroupValueWithLicense
	| (
		& VersionGroupValueWithLicense
		& VersionGroupValueHasVisible
	)
	| (
		& VersionGroupValueBase
		& VersionGroupValueHasApplicable
	)
	| (
		& VersionGroupValueBase
		& VersionGroupValueHasChecked
		& VersionGroupValueHasVisible
		& VersionGroupValueHasDescription
	)
	| (
		& VersionGroupValueBase
		& VersionGroupValueHasChecked
	)
	| (
		& VersionGroupValueBase
		& VersionGroupValueHasChecked
		& VersionGroupValueHasApplicable
	)
	| (
		& VersionGroupValueBase
		& VersionGroupValueHasApplicable
		& VersionGroupValueHasChecked
		& VersionGroupValueHasVisible
		& VersionGroupValueHasDescription
	)
);

type VersionGroupBase = {
	displayName: Exclude<string, ''>,
	id: Exclude<string, ''>,
	values: [VersionGroupValue, ...VersionGroupValue[]],
};

type VersionGroup = (
	| VersionGroupBase
	| (
		& VersionGroupBase
		& {
			$visible: boolean,
		}
	)
);

type VersionBase = (
	& (
		| VersionCommonBase
		| VersionLauncherBase
	)
	& {
		eulas: [VersionEula, ...VersionEula[]],
		executables: [VersionExecutable, ...VersionExecutable[]],
		files: [VersionFile, ...VersionFile[]],
		groups: [VersionGroup, ...VersionGroup[]],
	}
);

type VersionRedistributableRequirement = {
	key: {
		hKey: 'HKLM',
		keyPath: Exclude<string, ''>,
		wow64: boolean,
	},
	minVersion: `${number}.${number}`, // decimal (probably actually semver)
	type: 'regKeyVersion',
	valueName: 'Version',
};

type VersionRedistributable = {
	displayName: Exclude<string, ''>,
	fileName: filename_exe,
	requirements: [
		VersionRedistributableRequirement,
		...VersionRedistributableRequirement[],
	],
	url: `https://${Exclude<string, ''>}`,
};

type Version = (
	| VersionBase
	| (
		& VersionBase
		& {
			redistributables: [
				VersionRedistributable,
				...VersionRedistributable[],
			],
		}
	)
);

export type by_category_response = SuccessfulResponse<{
	bundles: [Bundle, ...Bundle[]],
}>;

export type bundle_by_id_response = SuccessfulResponse<Version>;

type bundle_by_id_response_filter_groups = Partial<{
	[VFG in VersionFileGroup as VFG['groupId']]: [
		VFG['groupValueId'],
		...VFG['groupValueId'][],
	]
}>;

export type bundle_by_id_response_filter = {
	files?: {
		groups?: [
			bundle_by_id_response_filter_groups,
			...bundle_by_id_response_filter_groups[]
		],
	},
};

export function filter_bundle_by_id_response(
	response: bundle_by_id_response,
	{
		include = {},
		include_documentation = true,
		exclude_id_prefixes = [],
	}: {
		include?: bundle_by_id_response_filter,
		include_documentation?: boolean,
		exclude_id_prefixes?: string[],
	},
): (
	& Omit<bundle_by_id_response, 'data'>
	& {
		data: (
			& Omit<bundle_by_id_response['data'], 'files'>
			& {
				files: bundle_by_id_response['data']['files'][number][],
			}
		),
	}
) {
	const {
		files: _files,
		...unfiltered
	} = response.data;

	let files: bundle_by_id_response['data']['files'][number][] = _files;

	const files_groups_filter = (
		include.files?.groups || []
	).map((filter) => Object.entries(
		filter,
	));

	if (files_groups_filter.length > 0) {
		files = files.filter((maybe) => {
			if (
				(
					exclude_id_prefixes.length > 0
					&& exclude_id_prefixes.some((
						prefix,
					) => maybe.id.startsWith(prefix))
				)
				|| (
					!include_documentation
					&& /^[^.]+\.Documentation\./.test(maybe.id)
				)
			) {
				return false;
			}

			return files_groups_filter.some((match_all_of_these) => {
				const filter_groupId_list = new Set(match_all_of_these.map(([
					groupId,
				]) => groupId));

				return match_all_of_these.every(([
					groupId,
					groupValueId_list,
				]) => {
					const maybe_groupId_list = new Set(maybe.groups.map(({
						groupId,
					}) => groupId));

					if (filter_groupId_list.symmetricDifference(
						maybe_groupId_list,
					).size > 0) {
						return false;
					}

					return maybe.groups.some((group) => (
						group.groupId === groupId
						&& (
							groupValueId_list as string[]
						).includes(group.groupValueId)
					));
				});
			});
		});
	}

	return {
		statusCode: 200,
		data: {
			...unfiltered,
			files,
		},
	};
}

export default class Versions extends AbstractApi {
	bundles_by_category(
		jwt: string,
		category: BundleType & 'wwise',
		validate_verified_payload: (
			maybe: unknown,
		) => maybe is by_category_response,
	) {
		return this.api_call(
			jwt,
			`https://blob-api.gowwise.com/products/versions/?category=${
				encodeURIComponent(category)
			}`,
			validate_verified_payload,
		);
	}

	async bundle_by_id(
		jwt: string,
		id: string,
		validate_verified_payload: (
			maybe: unknown,
		) => maybe is bundle_by_id_response,
	) {
		return this.api_call(
			jwt,
			`https://blob-api.gowwise.com/v4/products/versions/${
				encodeURIComponent(id)
			}`,
			validate_verified_payload,
		);
	}
}
