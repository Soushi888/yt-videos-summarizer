import fs from 'fs';

function tokenize(text: string) {
	const tokens = text.match(/\p{L}+|\p{N}+|[^\p{L}\p{N}\s]+|\s+/gu);
	return tokens || [];
}

function splitIntoChunks(text: string, chunkSize: number) {
	const tokens = tokenize(text);
	const chunks = [];

	let currentChunk = [];
	let currentChunkSize = 0;

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

	return chunks;
}

export function chunkFile() {
	const inputFilePath = 'input.txt';
	const outputDirPath = 'chunks';
	const chunkSize = 8000;

	fs.promises.mkdir(outputDirPath, {recursive: true}).then(() => {
		fs.readFile(inputFilePath, 'utf-8', (err: NodeJS.ErrnoException | null, data: string) => {
			if (err) {
				console.error(err);
				return;
			}

			const chunks = splitIntoChunks(data, chunkSize);

			chunks.forEach((chunk, index) => {
				fs.writeFile(`${outputDirPath}/chunk_${index + 1}.txt`, chunk, 'utf-8', (err: NodeJS.ErrnoException | null) => {
					if (err) {
						console.error(err);
					} else {
						console.log(`Chunk ${index + 1} written to file`);
					}
				});
			});
		});
	});
}
