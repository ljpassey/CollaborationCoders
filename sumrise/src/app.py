import os
from flask import Flask, jsonify, request
from db import create_podcast
from functions import (
    download_mp3,
    fetch_podcast_feed,
    transcribe_mp3,
    validate_rss,
)
from redis import Redis
from rq import Queue

app = Flask(__name__)

q = Queue(connection=Redis())


# track podcast
@app.route("/podcast", methods=["POST"])
def podcast():
    # get the request body
    body = request.get_json()
    # get the podcast rss
    rss_url = body.get("rss_url")
    # validate the podcast rss
    title = validate_rss(rss_url)
    if title == None:
        return jsonify({"message": "Could not validate podcast"}), 400

    # add to the database
    create_podcast(title, rss_url)
    return jsonify({"message": "Podcast added successfully"}), 201


@app.route("/")
def podcast_feed():
    rss = request.args.get("rss")
    podcasts = fetch_podcast_feed(rss)
    # title, mp3_url

    testing = True
    if testing:
        podcasts = podcasts[:1]

    for podcast in podcasts:
        filePath = download_mp3(
            episode_title=podcast["title"],
            mp3_url=podcast["mp3_url"],
            download_folder="downloads",
        )
        podcast["text"] = transcribe_mp3(filePath)
        # delete file
        os.remove(filePath)
        # TODO - Implement job queue
        # q.enqueue(transcribe_mp3, podcast["mp3_url"])

    return jsonify({"podcasts": podcasts}), 200


if __name__ == "__main__":
    app.run(debug=True)
