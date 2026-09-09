import {
	execSync,
} from 'node:child_process';

import {
	glob,
	readFile,
	writeFile,
} from 'node:fs/promises';

import {
	basename,
} from 'node:path';

for await (const file_path of glob('./schema/**/*.json')) {
	const contents = (await readFile(file_path)).toString();

	await writeFile(
		file_path.replace(/\.json$/, '.const.ts'),
		`// oxlint-disable @stylistic/max-len${
			'\n'
		}const schema = Object.freeze(${contents.trim()} as const);${
			'\n'
		}export default schema;${
			'\n'
		}`,
	);

	await writeFile(
		file_path.replace(/\.json$/, '.ts'),
		`import raw from ${JSON.stringify(
			`./${basename(file_path)}`,
		)} with {type: 'json'};${
			'\n'
		}import type schema from './${
			basename(file_path).replace(/\.json$/, '.const.ts')
		}';${
			'\n'
		}export default raw as unknown as typeof schema;${
			'\n'
		}`,
	);
}

for (let i = 0; i < 4; ++i) {
	try {
		execSync('./node_modules/.bin/oxlint --fix ./schema/ --silent', {
			stdio: 'ignore',
		});

	// oxlint-disable-next-line no-unused-vars
	} catch (_) {
		// we aren't doing anything
	}
}
