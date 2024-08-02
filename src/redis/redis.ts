import Redis from 'ioredis';

const redisConnection = import.meta.env.REDIS_CONNECTION;

const redis = redisConnection && redisConnection !== '' ? new Redis(redisConnection) : new Redis();

redis.on('connect', () => {
  console.log('REDIS connection successful.')
})

export default redis;