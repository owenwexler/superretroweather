import { expect } from 'bun:test';

// The API suite sends real HTTP requests to a running dev server, so the server and Redis must both be up.
// Override the target with SRW_TEST_URL if the server is not on the default port.
export const BASE_URL = process.env.SRW_TEST_URL ?? 'http://localhost:3000';

// The suite opens its own Redis connection instead of importing src/redis/redis.ts, because that module
// validates the full app environment on import, and bun test sets NODE_ENV to "test", which the env schema rejects.
const redis = new Bun.RedisClient(process.env.REDIS_URL || 'redis://localhost:6379');

export const WEATHER_ROUTE = '/api/weather';

const RATE_LIMIT_KEY_PREFIX = 'srwrate::';

// Every test gets its own client IP, so rate-limit counts never leak between tests or runs.
export const uniqueTestIp = (): string => `api-test-${crypto.randomUUID()}`;

export const weatherUrl = (location: string): string => {
  const params = new URLSearchParams({ location });
  return `${BASE_URL}${WEATHER_ROUTE}?${params.toString()}`;
}

export const requestWeather = (location: string, ip: string): Promise<Response> =>
  fetch(weatherUrl(location), {
    headers: { 'X-Forwarded-For': ip }
  });

export const clearRateLimit = async (ip: string): Promise<void> => {
  await redis.del(`${RATE_LIMIT_KEY_PREFIX}${ip}`);
}

// Fails the suite with a clear message if the server or Redis is not running, instead of failing every test with a confusing error.
export const assertEnvironmentReady = async (): Promise<void> => {
  try {
    await fetch(`${BASE_URL}${WEATHER_ROUTE}?location=${encodeURIComponent('Dallas, TX')}`, {
      headers: { 'X-Forwarded-For': uniqueTestIp() }
    });
  } catch {
    throw new Error(`API tests need the dev server running at ${BASE_URL}. Start it with "bun run dev".`);
  }

  try {
    const pong = await redis.ping();
    expect(pong).toBe('PONG');
  } catch {
    throw new Error('API tests need Redis running, because rate limiting is stored there.');
  }
}
