from redis import Redis
from rq import Connection, Queue, Worker


if __name__ == "__main__":
    # Tell rq what Redis connection to use
    with Connection():
        q = Queue(connection=Redis())
        w = Worker(q)
        w.work()
