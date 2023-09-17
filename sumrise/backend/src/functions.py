import feedparser
import whisper
import requests
import os
from pydub import AudioSegment


def fetch_podcast_feed(rss_url):
    test = True
    if test and not rss_url:
        rss_url = "https://feeds.fireside.fm/bibleinayear/rss"

    # Parse the RSS feed
    feed = feedparser.parse(rss_url)

    # Check if the RSS feed was successfully parsed
    if not feed.entries:
        print("No podcast episodes found in the RSS feed.")
        return

    podcast_episodes = []

    for entry in feed.entries:
        episode_title = entry.title
        mp3_url = None

        # Find the mp3 URL in the entry
        for link in entry.links:
            if link.type == "audio/mpeg":
                mp3_url = link.href
                break

        # If mp3 URL is found, add it to the list of podcast episodes
        if mp3_url:
            podcast_episodes.append({"title": episode_title, "mp3_url": mp3_url})
        else:
            print(f"No mp3 URL found for: {episode_title}")

    return podcast_episodes


def download_mp3(episode_title, mp3_url, download_folder):
    if not mp3_url or not episode_title or not download_folder:
        print("Missing arguments.")
        return

    # Create the download folder if it doesn't exist
    os.makedirs(download_folder, exist_ok=True)

    print(f"Downloading: {episode_title}")
    mp3_file_path = os.path.join(download_folder, f"{episode_title}.mp3")

    try:
        response = requests.get(mp3_url, stream=True)
        response.raise_for_status()

        with open(mp3_file_path, "wb") as mp3_file:
            for chunk in response.iter_content(chunk_size=8192):
                mp3_file.write(chunk)

        print("Download completed.")
    except requests.exceptions.RequestException as e:
        print(f"Error downloading: {e}")

    return mp3_file_path


def convert_mp3_to_wav(mp3_path, wav_path):
    if not mp3_path or not wav_path:
        print("Missing arguments.")
        return

    # Create the download folder if it doesn't exist
    os.makedirs(wav_path, exist_ok=True)

    print(f"Converting: {mp3_path}")
    sound = AudioSegment.from_mp3(mp3_path)
    sound.export(wav_path, format="wav")

    print("Conversion completed.")

    return wav_path


def transcribe_mp3(mp3_file):
    model = whisper.load_model("tiny.en")
    result = model.transcribe(mp3_file)
    return result["text"]


def validate_rss(rss_url):
    feed = feedparser.parse(rss_url)
    if not feed.entries:
        print("No podcast episodes found in the RSS feed.")
        return None
    if not feed.feed.title:
        print("No title found in the RSS feed.")
        return None
    return feed.feed.title


def episodes_from_feed(rss_url):
    feed = feedparser.parse(rss_url)
    episodes = []
    for entry in feed.entries:
        title = entry.title

        # Find the mp3 URL in the entry
        mp3_url = None
        for link in entry.links:
            if link.type == "audio/mpeg":
                mp3_url = link.href
                break
        if not mp3_url:
            print(f"No mp3 URL found for: {title}")
            continue

        episode = {
            "title": title,
            "published": entry.published,
            "mp3_url": mp3_url,
        }
        episodes.append(episode)
    return episodes
