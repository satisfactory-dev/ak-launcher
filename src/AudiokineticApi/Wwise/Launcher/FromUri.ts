
type maybe_uuid = (
	& string
	& {
		readonly length: 36,
	}
);

type uuid = (
	& maybe_uuid
	& {
		readonly _: unique symbol,
	}
);

type ak_launcher_uri = (
	& `ak-launcher://signIn?code=${maybe_uuid}`
	& {
		readonly length: 62,

		substring(start: 26): maybe_uuid,
	}
);

export default class FromUri {
	readonly #uuid: uuid;

	constructor(maybe: string) {
		FromUri.#assert_uri(maybe);

		const maybe_uuid = maybe.substring(26);

		FromUri.#assert_uuid(maybe_uuid);

		this.#uuid = maybe_uuid;
	}

	valueOf(): uuid {
		return this.#uuid;
	}

	toString(): uuid {
		return this.#uuid;
	}

	toJSON() {
		return this.#uuid;
	}

	static #assert_uri(maybe: string): asserts maybe is ak_launcher_uri {
		const prefix = 'ak-launcher://signIn?code=';

		if (62 !== maybe.length) {
			throw new Error('Expecting a string with a length of 62!');
		} else if (!maybe.startsWith(prefix)) {
			throw new Error(`Expecting a string that starts with ${prefix}!`);
		}
	}

	static #assert_uuid(maybe: maybe_uuid): asserts maybe is uuid {
		if (!/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(maybe)) {
			console.error(maybe);
			throw new Error(
				'Expected a uuid, receieved something else!',
			);
		}
	}
}
