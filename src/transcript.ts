import {TranscriptResponse, YoutubeTranscript} from "youtube-transcript";

export async function fetchTranscript(url: string): Promise<string> {
	try {
		const transcript = await YoutubeTranscript.fetchTranscript(url);
		return transcript.map((item: TranscriptResponse) => item.text).join(' ');
	} catch (e) {
		console.log(`${e}`);
		return '';
	}
}
