const DEFAULT_CHUNK_SIZE = 4000;

function tokenize(text: string) {
	if (!text) {
		return [];
	}

	const tokens = text.match(/\p{L}+|\p{N}+|[^\p{L}\p{N}\s]+|\s+/gu);
	return tokens || [];
}

export function splitIntoChunks(text: string) {
	const chunkSize = process.env.CHUNK_SIZE ? parseInt(process.env.CHUNK_SIZE) : DEFAULT_CHUNK_SIZE;
	const tokens = tokenize(text);
	const chunks = [];

	let currentChunk = [];
	let currentChunkSize = 0;

	if (tokens.length < chunkSize) {
		return [text];
	}

	for (const token of tokens) {
		if (currentChunkSize + token.length > chunkSize) {
			chunks.push(currentChunk.join(''));
			currentChunk = [];
			currentChunkSize = 0;
		}

		currentChunk.push(token);
		currentChunkSize += token.length;
	}

	if (currentChunkSize > 0) {
		chunks.push(currentChunk.join(''));
	}

	console.log(`Split text into ${chunks.length} chunks.`)

	return chunks;
}
