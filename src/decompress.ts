export default async function decompress(
	from: Uint8Array,
	compression_format: ConstructorParameters<typeof DecompressionStream>[0],
) {
	const stream = new ReadableStream({
		start: (controller) => {
			controller.enqueue(from);
			controller.close();
		},
	});

	const decompression = new DecompressionStream(compression_format);

	return await (
		new Response(stream.pipeThrough(decompression))
	).arrayBuffer();
}
