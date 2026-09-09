import type {} from '@signpostmarv/js-types';

import type {
	SuccessfulResponse,
} from '../AbstractApi.ts';
import AbstractApi from '../AbstractApi.ts';

import type VersionSchema from '../../../schema/WwiseApi/Products/Version.schema.ts';

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

type VersionFileGroup_Packages = {
		groupId: 'Packages',
		groupValueId: (
			| 'Authoring'
			| 'Documentation'
			| 'SDK'
		),
};

type VersionFileGroup_AuthoringPlatforms = {
		groupId: 'AuthoringPlatforms',
		groupValueId: (
		| 'x64'
		),
};

type VersionFileGroup_AuthoringOS = {
		groupId: 'AuthoringOS',
		groupValueId: (
			| 'Windows'
			| 'OSX'
		),
};

type VersionFileGroup_DeploymentPlatforms = {
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
};

type VersionFileGroup = (
	| VersionFileGroup_Packages
	| VersionFileGroup_AuthoringPlatforms
	| VersionFileGroup_AuthoringOS
	| VersionFileGroup_DeploymentPlatforms
);

declare const StringPassesRegexKey: unique symbol;

type StringPassesRegex<
	Source extends string,
	Guide extends string,
> = (
	& Guide
	& {
		[StringPassesRegexKey]: Source,
	}
);

export type filename_xz = StringPassesRegex<
	typeof VersionSchema.$defs.filename_xz.pattern,
	`${Exclude<string, ''>}.tar.xz`
>;
export type filename_zip = StringPassesRegex<
	typeof VersionSchema.$defs.filename_zip.pattern,
	`${Exclude<string, ''>}.zip`
>;
type filename_compressed = (
	| filename_xz
	| filename_zip
);

export type filename_exe = StringPassesRegex<
	typeof VersionSchema.$defs.filename_exe.pattern,
	`${Exclude<string, ''>}.exe`
>;

export type PatternMatchedFilename = (
	| filename_xz
	| filename_zip
	| filename_exe
);

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
			...bundle_by_id_response_filter_groups[],
		],
	},
};

export function filter_bundle_by_id_response(
	response: bundle_by_id_response,
	{
		include = {},
		include_documentation = true,
		exclude_id_prefixes = [],
		keep_executable_config = {
			Release: true,
			Debug: false,
		},
	}: {
		include?: bundle_by_id_response_filter,
		include_documentation?: boolean,
		exclude_id_prefixes?: string[],
		keep_executable_config?: {
			[key in VersionExecutableFile['config']]: boolean
		},
	},
): (
	& Omit<bundle_by_id_response, 'data'>
	& {
		data: (
			& Omit<bundle_by_id_response['data'], (
				| 'executables'
				| 'files'
			)>
			& {
				executables: (
					& Omit<VersionExecutable, 'files'>
					& {
						files: VersionExecutableFile[],
					}
				)[],
				files: bundle_by_id_response['data']['files'][number][],
			}
		),
	}
) {
	const {
		files: _files,
		executables: _executables,
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

	const executable_group_ids = new Set(files.map((
		e,
	) => e.sourceName.replace(/^.+\.([^.]+)\.(?:tar.xz|zip|exe)$/, '$1')));

	// oxlint-disable-next-line @stylistic/max-len
	// @todo update @signpostmarv/js-types to more accurately describe Array.prototype.flatMap()
	const files_groups_filter_flattened = files_groups_filter.flatMap((
		e,
	) => e) as [
		VersionFileGroup['groupId'],
		VersionFileGroup['groupValueId'][],
	][];

	const executable_os_filter = new Set(files_groups_filter_flattened.filter((
		maybe,
	): maybe is [
		VersionFileGroup_AuthoringOS['groupId'],
		VersionFileGroup_AuthoringOS['groupValueId'][],
	] => maybe[0] === 'AuthoringOS').flatMap(([, e]) => e).map((e) => {
		if ('OSX' === e) {
			return 'Mac';
		}

		return e;
	}));

	const executable_platform_filter = new Set(
		files_groups_filter_flattened.filter((
			maybe,
		): maybe is [
			VersionFileGroup_AuthoringPlatforms['groupId'],
			VersionFileGroup_AuthoringPlatforms['groupValueId'][],
		] => maybe[0] === 'AuthoringPlatforms').flatMap((
			[, e],
		) => e).map((e): (typeof e extends 'x64' ? 'amd64' : typeof e) => {
			if ('x64' === e) {
				return 'amd64';
			}

			return e;
		}),
	);

	const executable_file_filter = (file: VersionExecutableFile) => (
		keep_executable_config[file.config]
		&& executable_platform_filter.has(file.architecture)
		&& executable_os_filter.has(file.os)
	);

	const executables = _executables.filter((maybe) => {
		return (
			executable_group_ids.has(maybe.groupId)
			|| maybe.files.some(executable_file_filter)
		);
	}).map(({
		files,
		...remaining
	}) => ({
		...remaining,
		files: files.filter(executable_file_filter),
	}));

	return {
		statusCode: 200,
		data: {
			...unfiltered,
			executables,
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
