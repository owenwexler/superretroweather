import { env } from '#/env';

declare global {
  var redisClient: Bun.RedisClient | undefined;
}

function getRedisClient() {
  // Access the global Bun runtime safely
  if (typeof Bun !== 'undefined') {
    // Reuse the existing instance if it exists, otherwise create a new one
    const redis = globalThis.redisClient ?? new Bun.RedisClient(env.REDIS_URL || 'redis://localhost:6379',      {
      // Crucial configurations for development
      idleTimeout: 0,            // Prevents Bun from closing the connection when idle
      connectionTimeout: 5000,   // Fail fast instead of hanging indefinitely
    });

    if (process.env.NODE_ENV !== "production") {
      // Attach a recovery hook to clear the broken instance if closed
      redis.onclose = (err) => {
        console.warn("⚠️ Bun Redis closed connection. Purging stale client reference.", err);
        globalThis.redisClient = undefined; 
      };      

      globalThis.redisClient = redis;
    } 

    return redis;
  }
  
  throw new Error("Redis client can only be initialized on a Bun server environment.");
}

const client = getRedisClient();

export default client;
