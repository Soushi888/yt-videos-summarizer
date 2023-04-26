import dotenv from "dotenv";
import {splitIntoChunks} from "./text_chunker";
import {fetchTranscript} from "./transcript";
import {createSummarizedTranscript} from "./openai";
import * as fs from "fs";

dotenv.config();

(async () => {
	const videoUrl = process.argv[2]
	const transcript = await fetchTranscript(videoUrl);
	const chunkSize = process.env.CHUNK_SIZE ? parseInt(process.env.CHUNK_SIZE) : 4000;
	const transcriptChunks = splitIntoChunks(transcript, chunkSize);
	const summarized_transcript = await createSummarizedTranscript(transcriptChunks);
	fs.writeFileSync('summarized_transcript.txt', summarized_transcript);
	console.log("Done.");
})();