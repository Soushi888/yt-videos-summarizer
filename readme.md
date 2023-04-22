# Youtube Videos Summarizer

This simple program take a youtube video link and return a summary of the video made by chatGPT.
It fetches captions of the video with the youtube-api-v3, then it split the captions in text chunks and send them to chatGPT. At the end, it asks chatGPT to generate clear summary of the video from his previous answers.

1. Fetch the captions of the video with the youtube-api-v3
2. Split the subtitles in text chunks
3. Send the text chunks to chatGPT and collect the answers
4. Ask chatGPT to generate clear summary of the video from the answers collection