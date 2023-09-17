import os
import sqlite3
import time
import schedule

from db import (
    create_episode_table,
    create_podcast_table,
    get_connection,
    create_episodes,
)
from functions import download_mp3, episodes_from_feed, transcribe_mp3

# from functions import insert_episodes_into_db

# Connect to the database or create it if it doesn't exist

DOWNLOAD_FOLDER = "downloads"


def poll_latest_episodes():
    print("Polling for new podcast episodes...")
    cursor = get_connection().cursor()
    cursor.execute("SELECT * FROM podcast")
    for row in cursor.fetchall():
        podcast_id = row[0]
        rss_url = row[2]
        episodes = episodes_from_feed(rss_url)
        create_episodes(podcast_id, episodes)
    cursor.close()


def poll_transcribe_jobs():
    print("Polling for outstanding transcription jobs...")
    cursor = get_connection().cursor()
    cursor.execute("SELECT * FROM episode WHERE transcript IS NULL")
    for episode in cursor.fetchall():
        id = episode[0]
        title = episode[2]
        mp3_url = episode[4]
        print(f"Downloading {mp3_url}...")
        file_path = download_mp3(title, mp3_url, DOWNLOAD_FOLDER)
        print(f"Transcribing {file_path}...")
        transcript = transcribe_mp3(file_path)
        os.remove(file_path)
        update_query = "UPDATE episode SET transcript = ? WHERE id = ?"
        data_to_update = (transcript, id)
        cursor.execute(update_query, data_to_update)
        get_connection().commit()
    cursor.close()


# Create tables if they don't exist
create_podcast_table()
create_episode_table()

# Schedule the polling functions
schedule.every(5).seconds.do(poll_latest_episodes)
schedule.every(10).seconds.do(poll_transcribe_jobs)

# Keep the service running
while True:
    schedule.run_pending()
    time.sleep(1)
