import type {} from '@signpostmarv/js-types';

import type {
	SuccessfulResponse,
} from '../AbstractApi.ts';
import AbstractApi from '../AbstractApi.ts';

// oxlint-disable-next-line @stylistic/max-len
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

type minimumRequiredVersion = (
	| {
		major: number,
		minor: number,
	}
	| {
		major: `${number}`,
		minor: `${number}`,
	}
);

type MacOS = {
	IS_USING_ROOT_LIBRARY: boolean,
	minimumRequiredVersion: minimumRequiredVersion,
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

type ProductDependentDataUnrealIntegration_supportedPlatforms_value = (
	| 'Android'
	| 'Linux'
	| 'Mac'
	| 'iOS'
	| 'tvOS'
	| 'PS4'
	| 'PS5'
	| 'Switch'
	| 'Switch2'
	| 'Windows'
	| 'WinGC'
	| 'UWP'
	| 'XboxOne'
	| 'XboxOneGC'
	| 'XboxSerisX'
	| 'XboxSeriesX'
	| 'Stadia'
	| 'Lumin'
	| 'Pellegrino'
);

type ProductDependentDataUnrealIntegration_base = {
	supportedPlatforms: [
		ProductDependentDataUnrealIntegration_supportedPlatforms_value,
		...ProductDependentDataUnrealIntegration_supportedPlatforms_value[],
	],
	supportedUnrealVersions: [
		minimumRequiredVersion,
		...minimumRequiredVersion[],
	],
	wwiseSdkBuild: number,
};

type ProductDependentDataUnrealIntegration_sdkPlatformFolders = (
	& ProductDependentDataUnrealIntegration_base
	& {
		sdkPlatformFolders: (
			| [
				sdkPlatformFolder_include,
				...sdkPlatformFolder_include[],
			]
			| [
				sdkPlatformFolder_fileMatchExpression,
				...sdkPlatformFolder_fileMatchExpression[],
			]
			| [
				sdkPlatformFolder_fileMatchExpression_with_untilEngine,
				...sdkPlatformFolder_fileMatchExpression_with_untilEngine[],
			]
			| [
				sdkPlatformFolder_fileMatchExpression_with_sinceEngine,
				...sdkPlatformFolder_fileMatchExpression_with_sinceEngine[],
			]
		),
	}
);

type ProductDependentDataUnrealIntegration_platformFolders_mandatory_item = (
	| 'include'
	| 'Win32_vc140'
	| 'Win32_vc150'
	| 'Win32_vc160'
	| 'Win32_vc170'
	| 'x64_vc140'
	| 'x64_vc150'
	| 'x64_vc160'
	| 'x64_vc170'
	| 'Mac'
);

type ProductDependentDataUnrealIntegration_platformFolders_optional_item = (
	| 'Win32_vc140'
	| 'Win32_vc150'
	| 'Win32_vc160'
	| 'Win32_vc170'
	| 'x64_vc140'
	| 'x64_vc150'
	| 'x64_vc170'
	| 'WinGC_vc150'
	| 'WinGC_vc160'
	| 'WinGC_vc170'
	| 'UWP_ARM64_vc150'
	| 'UWP_ARM64_vc160'
	| 'UWP_ARM64_vc170'
	| 'Linux_x32'
	| 'Linux_x64'
	| 'Linux_aarch64'
	| 'XboxOne_vc110'
	| 'XboxOne_vc140'
	| 'XboxOne_vc150'
	| 'XboxOne_vc160'
	| 'XboxOneGC_vc150'
	| 'XboxOneGC_vc160'
	| 'XboxOneGC_vc170'
	| 'PS4'
	| 'PS4_SDK9.500'
	| 'PS4_SDK10.000'
	| 'PS4_SDK10.500'
	| 'NX64'
	| 'NX64_SDK15'
	| 'NX64_SDK16'
	| 'GGP'
	| 'Android_armeabi-v7a'
	| 'Android_x86'
	| 'Android_arm64-v8a'
	| 'android-9_armeabi-v7a'
	| 'android-21_arm64-v8a'
	| 'android-21_x86_64'
	| 'android-9_x86'
	| 'Android_x86_64'
	| 'iOS'
	| 'tvOS'
	| 'PS5'
	| 'PS5_SDK5.000'
	| 'PS5_SDK6.000'
	| 'PS5_SDK7.000'
	| 'XboxSeriesX_vc150'
	| 'XboxSeriesX_vc160'
	| 'XboxSeriesX_vc170'
	| 'Mac'
	| 'Lumin'
	| 'Pellegrino'
	| 'Chinook_vc150'
	| 'Chinook_vc160'
	| 'GX_vc150'
	| 'GX_vc160'
	| 'GDX_vc150'
	| 'GDX_vc160'
);

type ProductDependentDataUnrealIntegration_platformFolders = (
	& ProductDependentDataUnrealIntegration_base
	& {
		platformFolders: {
			mandatory: [
				ProductDependentDataUnrealIntegration_platformFolders_mandatory_item,
				...ProductDependentDataUnrealIntegration_platformFolders_mandatory_item[],
			],
			optional: [
				ProductDependentDataUnrealIntegration_platformFolders_optional_item,
				...ProductDependentDataUnrealIntegration_platformFolders_optional_item[],
			],
		},
	}
);

type sdkPlatformFolder_base = {
	destination: Exclude<string, ''>,
	option: boolean,
	source: Exclude<string, ''>,
};

type sdkPlatformFolder_include = (
	& sdkPlatformFolder_base
	& {
		include: [
			Exclude<string, ''>,
			...Exclude<string, ''>[],
		],
	}
);

type sdkPlatformFolder_fileMatchExpression = (
	& sdkPlatformFolder_base
	& {
		fileMatchExpression: Exclude<string, ''>,
	}
);

type sdkPlatformFolder_fileMatchExpression_with_untilEngine = (
	& sdkPlatformFolder_fileMatchExpression
	& {
		untilEngine: minimumRequiredVersion,
	}
);

type sdkPlatformFolder_fileMatchExpression_with_sinceEngine = (
	& sdkPlatformFolder_fileMatchExpression
	& {
		sinceEngine: minimumRequiredVersion,
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
	tag: Exclude<string, ''>|null,
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
		| ProductDependentDataUnrealIntegration_sdkPlatformFolders
		| ProductDependentDataUnrealIntegration_platformFolders
	),
	vendor: Exclude<string, ''>,
	version: nicknamed_version<Exclude<string, ''>>,
	links: Link[],
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

export type VersionEula = {
	displayName: Exclude<string, ''>,
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

export type filename_pkg = StringPassesRegex<
	typeof VersionSchema.$defs.filename_pkg.pattern,
	`${Exclude<string, ''>}.pkg`
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

export type bundle_by_id_response = SuccessfulResponse<(
	| Version
	| Omit<Version, (
		| 'links'
		| 'productDependentData'
	)>
)>;

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

export type filter_bundle_by_id_response_filter = {
	include?: bundle_by_id_response_filter,
	include_documentation?: boolean,
	exclude_id_prefixes?: string[],
	keep_executable_config?: {
		[key in VersionExecutableFile['config']]: boolean
	},
};

export type file_response = SuccessfulResponse<{
	id: Exclude<string, ''>,
	url: `https://${Exclude<string, ''>}`,
}>;

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
	}: filter_bundle_by_id_response_filter,
): (
	& Omit<bundle_by_id_response, 'data'>
	& {
		data: (
			& Omit<bundle_by_id_response['data'], (
				| 'eulas'
				| 'executables'
				| 'files'
			)>
			& {
				eulas: bundle_by_id_response['data']['eulas'][number][],
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
		eulas,
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

	const file_groups = files.flatMap(({groups}) => groups);

	const eulaIds = new Set(unfiltered.groups
		.filter(({id: groupId, values}) => {
			const groupValueId_list = new Set(values.map(({id}) => id));

			return file_groups.some((maybe) => (
				maybe.groupId === groupId
				&& groupValueId_list.has(maybe.groupValueId)
			));
		})
		.flatMap(({values}) => values.flatMap(({eulaIds}) => eulaIds)));

	return {
		statusCode: 200,
		data: {
			...unfiltered,
			eulas: eulas.filter((maybe) => eulaIds.has(maybe.id)),
			executables,
			files,
		},
	};
}

export default class Versions extends AbstractApi {
	bundles_by_category(
		jwt: string,
		category: BundleType & (
			| 'wwise'
			| 'Launcher'
		),
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

	async file(
		jwt: string,
		id: string,
		filename: (
			| VersionFile['id']
		),
		validate_verified_payload: (
			maybe: unknown,
		) => maybe is file_response,
	) {
		return this.api_call(
			jwt,
			`https://blob-api.gowwise.com/products/versions/${
				encodeURIComponent(id)
			}/file?filename=${
				encodeURIComponent(filename)
			}`,
			validate_verified_payload,
		).then(({data: {url}}) => fetch(url));
	}
}
