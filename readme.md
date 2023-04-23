# YouTube Transcript Summarizer

This program uses OpenAI's GPT-3.5 Turbo model to automatically summarize YouTube video transcripts. It fetches the
transcript, generates detailed notes for each part of the transcript, and creates a final summary based on the notes.

## Prerequisites

- Node.js (version 12 or higher) and corresponding npm
- An OpenAI API key with access to GPT-3.5 Turbo

## Installation

1.Clone this repository:

```bash
git clone https://github.com/Soushi888/yt-videos-summarizer.git
```

2.Install npm packages:

```bash
npm install
```

3. Copy the `.env.example` file to a new file called `.env`:

```bash
cp .env.example .env
```

4. Update the `.env` file with your OpenAI API key and organization:

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_ORGANIZATION=your_openai_organization
```

## Chunk Size

```bash
# Chunk size is the number of characters that will be sent to OpenAI at once.
# Reduce this if you are getting 400 errors. Increase it if you are getting 413 errors.
# Lowering this will increase the number of requests made to OpenAI, but make more prcise notes.
# The default is 4000.
CHUNK_SIZE=4000
```

## System Prompts

The program uses the following prompts to generate the detailed notes and the final summary:

```ts
enum SystemPrompt {
	NOTES = "Write detailed notes about this video transcript part in a bullet list .\n\n---\n\nTranscript part:\n\n",
	FINAL_SUMMARIZE = "Create a full detailed summary from those notes.\n\n---\n\nNotes:\n\n",
}
```

## Usage

To summarize a YouTube video transcript, run the following command with the video URL as an argument:

```bash
node index.js https://www.youtube.com/watch?v=video_id
```

The program will fetch the transcript, split it into chunks, generate detailed notes for each chunk, and create a final
summary. The detailed notes will be saved in a file called `notes.md`, and the summarized transcript will be saved in a
file called `summarized_transcript.txt`.

## Example

![img.png](examples/example.png)

Input link: https://www.youtube.com/watch?v=i_a9bqvqmzo

For a video named "**How to Build a FULL App With ChatGPT in 20 minutes!**", length 18 minutes and 35 seconds, the
program generated the following files:

- [notes.md](examples/notes.md)
- [summarized_transcript.txt](examples/summarized_transcript.txt)