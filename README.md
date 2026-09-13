# @satisfactory-dev/ak-launcher

A workaround for the Audiokinetic Launcher not being easy to run in a devcontainer

This package was created due to some difficulties in getting the Audiokinetic Launcher to run under a devcontainer via wine.

## Documentation

Going to be kinda light on documentation unless this package has people other than myself using it.

### Things in the package other than the api

Due to needing to unpackage the launcher to get the EULAs, [XAR](./src/XAR.ts) and [CPIO](./src/CPIO.ts) parsers have been implemented to facilitate usage of the Mac version of the Launcher, since using the Windows version of the Launcher would require the use of GPL-licensed libraries.

### JWT from application URI

```ts
import factory from '@satisfactory-dev/ak-launcher';

const api = factory({
	package_version: '2026.1.1+6296',
});

const {jwt} = api.Audiokinetic.Launcher.login_from_uri(
	maybe_uri,
	AudiokineticPayload.is_jwt_object,
);
```

### Payload validation

JSON Schemas for validating expected responses are included in the repository, but validators are not.

This for two reasons:

1. There's no sandbox API to run tests against (hence a lack of automated testing), so bundling a validator in the dependencies seemed fruitless.
2. Dependency reduction.
