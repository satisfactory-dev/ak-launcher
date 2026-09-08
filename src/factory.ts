import Auth from './AudiokineticApi/Wwise/Launcher.ts';

import Launcher from './WwiseApi/Products/Launcher.ts';

import Versions from './WwiseApi/Products/Versions.ts';

export default function AkLauncherWorkaroundFactory({
	package_version,
}: {
	package_version: string,
}) {
	return Object.freeze({
		Audiokinetic: Object.freeze({
			Launcher: new Auth(),
		}),
		Wwise: Object.freeze({
			Products: Object.freeze({
				Launcher: new Launcher(package_version),
				Versions: new Versions(package_version),
			}),
		}),
	});
}
