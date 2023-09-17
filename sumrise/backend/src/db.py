import sqlite3

# Database connection parameters
db_file = "sumrise.db"

# Global variable to hold the connection
_connection = None


def get_connection():
    global _connection
    if not _connection:
        _connection = sqlite3.connect(db_file)
    return _connection


def close_connection():
    global _connection
    if _connection:
        _connection.close()
        _connection = None


def create_podcast_table():
    cursor = get_connection().cursor()
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS podcast (
                    id INTEGER PRIMARY KEY,
                    title TEXT,
                    rss_url TEXT,
                    verified BOOLEAN)"""
    )

    # Commit changes
    get_connection().commit()
    cursor.close()


def create_episode_table():
    cursor = get_connection().cursor()
    cursor.execute(
        """CREATE TABLE IF NOT EXISTS episode (
                    id INTEGER PRIMARY KEY,
                    podcast_id INTEGER REFERENCES podcast(id),
                    title TEXT NOT NULL,
                    published TEXT,
                    mp3_url TEXT UNIQUE,
                    transcript TEXT)"""
    )

    # Commit changes
    get_connection().commit()
    cursor.close()


def create_podcast(title, rss_url):
    cursor = get_connection().cursor()
    insert_query = "INSERT INTO podcast (title, rss_url, verified) VALUES (?, ?, ?)"
    data_to_insert = (title, rss_url, True)
    cursor.execute(insert_query, data_to_insert)

    # Commit changes
    get_connection().commit()
    cursor.close()


def create_episodes(podcast_id, episodes):
    cursor = get_connection().cursor()
    insert_query = "INSERT OR IGNORE INTO episode (podcast_id, title, published, mp3_url) VALUES (?, ?, ?, ?)"
    data_to_insert = [
        (
            podcast_id,
            episode["title"],
            episode["published"],
            episode["mp3_url"],
        )
        for episode in episodes
    ]

    cursor.executemany(insert_query, data_to_insert)

    # Commit changes
    get_connection().commit()
    cursor.close()
