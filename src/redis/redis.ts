import Redis from 'ioredis';

const redisConnection = import.meta.env.REDIS_CONNECTION;

export default redisConnection && redisConnection !== '' ? new Redis(redisConnection) : new Redis();