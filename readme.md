# Youtube Videos Summarizer

## Description

This project is a web application that allows users to summarize youtube videos. The user can enter the link of the video and the application will return a summary of the video in a text file.

1. Fetch the transcript of the video with youtube-transcript
2. Split the transcript in text chunks
3. Send the text chunks to chatGPT and ask it to take notes
4. Ask chatGPT to generate a full detailed summary of the video from the collected notes
5. Return the summary to the user in a text file