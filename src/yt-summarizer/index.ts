import {splitIntoChunks} from "./text_chunker";
import {fetchTranscript} from "./transcript";
import {createSummarizedTranscript} from "./openai";

export async function summarizeYoutubeVideo(videoUrl: string) {
	const transcript = await fetchTranscript(videoUrl);
	const chunkSize = 4000;
	// const chunkSize = process.env.CHUNK_SIZE ? parseInt(process.env.CHUNK_SIZE) : 4000;
	const transcriptChunks = splitIntoChunks(transcript, chunkSize);
	return await createSummarizedTranscript(transcriptChunks);
}