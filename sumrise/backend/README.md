# sumrise

Using AI to analyze the world

## Description

Sumrise allows you to automatically summarize podcasts and other audio files. It uses a combination of speech-to-text and text summarization to create a summary of the audio file.

## Database Schema

podcast

- title: text
- rss_url: text
- verified: boolean

episode

- podcast_id: integer
- title: text
- published: datetime
- mp3_url: text
- transcript: text
