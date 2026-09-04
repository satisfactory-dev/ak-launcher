import AudiokineticPayload from '../../AudiokineticPayload.ts';

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

type BundleBase = {
	id: Exclude<string, ''>,
	tag: Exclude<string, ''>,
	versionTag: Exclude<string, ''>,
	published: 0|1,
	stable: 0|1,
	type: Exclude<string, ''>,
	name: Exclude<string, ''>,
	versionName: Exclude<string, ''>,
	description: null,
	requiredLicenseId: 0|1,
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
	version: {
		build: number,
		major: number,
		minor: number,
		nickname: Exclude<string, ''>,
		year: number,
	},
	documentation: Array<never>,
	links: [Link, ...Link[]],
	$checked: null,
	$unlocked: null,
	$visible: null,
	$disabled: null,
	$message: null,
	$sortGroupIndex: number,
	applicable: null,
	automaticDeletion: 0|1,
	supported: 0|1,
	categoryId: number,
	image: null,
	labels: Array<never>,
	initialPublishDate: number,
	updateDate: number|null,
	publishDate: number|null,
};

type Bundle = (
	| BundleBase
	| (
		& BundleBase
		& {
			launcher: {
				minimumRequiredVersion: {
					major: number,
					minor: number,
					year: number,
				},
			},
		}
	)
);

export type by_category_response = {
	statusCode: 200,
	data: {
		bundles: [Bundle, ...Bundle[]],
	},
};


export default class Versions {
	readonly #package_version: string;

	constructor(
		package_version: string,
	) {
		this.#package_version = package_version;
	}

	async #api_call<T>(
		jwt: string,
		url: `https://blob-api.gowwise.com/${Exclude<string, ''>}`,
		validate_verified_payload?: (maybe: unknown) => maybe is T,
	) {
		const result = await (await fetch(
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

	bundles_by_category(
		jwt: string,
		category: BundleType & 'wwise',
		validate_verified_payload: (
			maybe: unknown,
		) => maybe is by_category_response,
	) {
		return this.#api_call(
			jwt,
			`https://blob-api.gowwise.com/products/versions/?category=${
				encodeURIComponent(category)
			}`,
			validate_verified_payload,
		);
	}
}
