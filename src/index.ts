import {splitIntoChunks} from "./text_chunker";
import {fetchTranscript} from "./transcript";
import {summarizeTranscript} from "./openai";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

(async () => {
	const videoUrl = process.argv[2]
	const transcript = await fetchTranscript(videoUrl);
	const chunks = splitIntoChunks(transcript);
	const summarized_transcript = await summarizeTranscript(chunks);
	fs.writeFileSync('summarized_transcript.txt', summarized_transcript);
	console.log("Done.")
})();