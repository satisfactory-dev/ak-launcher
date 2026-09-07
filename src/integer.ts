export type integer = (
	& number
	& {
		_is_integer: never,
	}
);

export default integer;
