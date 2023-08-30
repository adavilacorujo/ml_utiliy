import os
import redis

REDIS_HOST=os.getenv('REDIS_HOST', 'localhost')

redis_server = redis.Redis(host=REDIS_HOST, port=6379)