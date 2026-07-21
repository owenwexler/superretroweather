import { env } from '#/env';

function getRedisClient() {
  // Access the global Bun runtime safely
  if (typeof Bun !== 'undefined') {
    return new Bun.RedisClient(env.REDIS_URL);
  }
  
  throw new Error("Redis client can only be initialized on a Bun server environment.");
}

const client = getRedisClient();

export default client;
