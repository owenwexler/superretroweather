// Server-only.  Per-IP fixed-window rate limiting backed by Redis, so the limit is shared by every server instance.  Lives in src/server/ because it uses the Redis client.
import redis from '#/redis/redis';

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

export interface RateLimitOptions {
  limit: number;
  windowSeconds: number;
}

const RATE_LIMIT_KEY_PREFIX = 'srwrate::';

// Uses the first address in X-Forwarded-For, which is the original client when the request passes through a reverse proxy.  Only trust this header when the app runs behind a proxy that sets it, because clients can send their own copy.
export const getClientIp = (request: Request): string => {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');

  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}

// Fixed window: the first request in a window starts a timer, and requests past the limit are rejected until the timer expires.
// If Redis is unavailable the request is allowed, the same as a cache error.  The weather API should not go down because the limiter does.
export const checkRateLimit = async (ip: string, options: RateLimitOptions): Promise<RateLimitResult> => {
  const key = `${RATE_LIMIT_KEY_PREFIX}${ip}`;

  try {
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, options.windowSeconds);
    }

    if (count > options.limit) {
      const ttl = await redis.ttl(key);
      const retryAfterSeconds = ttl > 0 ? ttl : options.windowSeconds;

      return {
        allowed: false,
        retryAfterSeconds
      };
    }

    return {
      allowed: true,
      retryAfterSeconds: 0
    };
  } catch (error) {
    console.error(error);
    return {
      allowed: true,
      retryAfterSeconds: 0
    };
  }
}
