import { type ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { splitIntoChunks } from "./text_chunker";

const OPENAI_API_KEY = "OPENAI_API_KEY";
const OPENAI_ORGANIZATION = "OPENAI_ORGANIZATION";

const PromptType = {
	CREATE_NOTES: "Write detailed notes about this video transcript part in a bullet list .\n\n---\n\nTranscript part:\n\n",
	CREATE_SUMMARY: "Create a clean and detailed summary of at least 350 words from those notes.\n\n---\n\nNotes:\n\n",
} as const;

type PromptType = typeof PromptType[keyof typeof PromptType];

const notesPrompt: ChatCompletionRequestMessage = {
	role: "system",
	content: PromptType.CREATE_NOTES,
};

const summarizePrompt: ChatCompletionRequestMessage = {
	role: "system",
	content: PromptType.CREATE_SUMMARY,
};

export async function createSummarizedTranscript(transcriptChunks: string[]): Promise<string> {
	const openai = new OpenAIApi(new Configuration({
		apiKey: OPENAI_API_KEY,
		organization: OPENAI_ORGANIZATION,
	}));

	const allNotes = await createNotesForChunks(transcriptChunks, openai);
	const allNotesText = allNotes.join('\n\n---\n\n');

	console.log("Creating final summary...");

	const notesChunks = splitIntoChunks(allNotesText, 8000);

	return await createSummaryFromNotes(notesChunks, openai);
}

async function callOpenAI(text: string, openai: OpenAIApi, promptType: PromptType): Promise<string> {
	const promptMessage = promptType === PromptType.CREATE_NOTES ? notesPrompt : summarizePrompt;

	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [promptMessage, { role: "user", content: text }],
	});

	return response.data.choices[0].message!.content;
}

async function createNotesForChunks(transcriptChunks: string[], openai: OpenAIApi): Promise<string[]> {
	const notes = [];

	for (let i = 0; i < transcriptChunks.length; i++) {
		console.log(`Creating notes for chunk ${i + 1} of ${transcriptChunks.length}...`);
		const response = await callOpenAI(transcriptChunks[i], openai, PromptType.CREATE_NOTES);
		notes.push(response);
	}

	return notes;
}

async function createSummaryFromNotes(summaryChunks: string[], openai: OpenAIApi): Promise<string> {
	if (summaryChunks.length === 1) {
		return callOpenAI(summaryChunks[0], openai, PromptType.CREATE_SUMMARY);
	}

	const summaryResponses = [];

	for (let i = 0; i < summaryChunks.length; i++) {
		const response = await callOpenAI(summaryChunks[i], openai, PromptType.CREATE_SUMMARY);
		summaryResponses.push(response);
	}

	return callOpenAI(summaryResponses.join('\n\n---\n\n'), openai, PromptType.CREATE_SUMMARY);
}
