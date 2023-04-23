import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai";
import {splitIntoChunks} from "./text_chunker";
import * as fs from "fs";

enum SystemPrompt {
	NOTES = "Write detailed notes about this video transcript part in a bullet list .\n\n---\n\nTranscript part:\n\n",
	FINAL_SUMMARIZE = "Create a clean and detailed summary of at least 350 words from those notes.\n\n---\n\nNotes:\n\n",
}

const chunkSystemPrompt: ChatCompletionRequestMessage = {
	role: "system",
	content: SystemPrompt.NOTES,
}

const finalAnalyseSystemPrompt: ChatCompletionRequestMessage = {
	role: "system",
	content: SystemPrompt.FINAL_SUMMARIZE,
}

export async function summarizeTranscript(textChunks: string[]): Promise<string> {
	const openai = new OpenAIApi(new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
		organization: process.env.OPENAI_ORGANIZATION,
	}));

	const allNotesArray = await takeNotesFromChunks(textChunks, openai);
	const allNotes = allNotesArray.join('\n\n---\n\n');
	fs.writeFileSync('notes.md', allNotes);

	console.log("Making final summary...");

	const rawSummaryChunks = splitIntoChunks(allNotes, 8000);

	return await summarizeFinalSummary(rawSummaryChunks, openai);
}

async function callOpenAI(text: string, openai: OpenAIApi, systemPrompt: SystemPrompt): Promise<string> {
	const systemPromptMessage = systemPrompt === SystemPrompt.NOTES ? chunkSystemPrompt : finalAnalyseSystemPrompt;

	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [systemPromptMessage, {role: "user", content: text}],
	});

	return response.data.choices[0].message!.content;
}

async function takeNotesFromChunks(chunks: string[], openai: OpenAIApi): Promise<string[]> {
	const notes = [];

	for (let i = 0; i < chunks.length; i++) {
		console.log(`Take notes for chunk ${i + 1} of ${chunks.length}...`)
		const response = await callOpenAI(chunks[i], openai, SystemPrompt.NOTES);
		notes.push(response);
	}

	return notes;
}

async function summarizeFinalSummary(chunks: string[], openai: OpenAIApi): Promise<string> {
	if (chunks.length === 1) {
		return callOpenAI(chunks[0], openai, SystemPrompt.FINAL_SUMMARIZE);
	}

	const responses = [];

	for (let i = 0; i < chunks.length; i++) {
		const response = await callOpenAI(chunks[i], openai, SystemPrompt.FINAL_SUMMARIZE);
		responses.push(response);
	}

	return callOpenAI(responses.join('\n\n---\n\n'), openai, SystemPrompt.FINAL_SUMMARIZE);
}