import { afterEach, beforeAll, describe, expect, test } from 'bun:test';
import { assertEnvironmentReady, clearRateLimit, requestWeather, uniqueTestIp } from './apiTestHelpers';

// Must match RATE_LIMIT_OPTIONS in src/routes/api/weather.tsx
const RATE_LIMIT = 30;

describe('Weather route rate limiting', () => {
  const ipsToClear: string[] = [];

  beforeAll(async () => {
    await assertEnvironmentReady();
  });

  afterEach(async () => {
    for (const ip of ipsToClear.splice(0)) {
      await clearRateLimit(ip);
    }
  });

  test(`allows ${RATE_LIMIT} requests from one IP, then returns 429 with Retry-After`, async () => {
    const ip = uniqueTestIp();
    ipsToClear.push(ip);

    for (let i = 0; i < RATE_LIMIT; i++) {
      const response = await requestWeather('Dallas, TX', ip);
      expect(response.status).not.toBe(429);
    }

    const limited = await requestWeather('Dallas, TX', ip);
    const body = await limited.json();

    expect(limited.status).toBe(429);
    expect(Number(limited.headers.get('Retry-After'))).toBeGreaterThan(0);
    expect(body.error.code).toBe('rate_limited');
  });

  test('keeps limits separate for different IP addresses', async () => {
    const limitedIp = uniqueTestIp();
    const otherIp = uniqueTestIp();
    ipsToClear.push(limitedIp, otherIp);

    for (let i = 0; i < RATE_LIMIT + 1; i++) {
      await requestWeather('Dallas, TX', limitedIp);
    }

    const otherResponse = await requestWeather('Dallas, TX', otherIp);

    expect(otherResponse.status).not.toBe(429);
  });

  test('counts requests that fail validation toward the limit', async () => {
    const ip = uniqueTestIp();
    ipsToClear.push(ip);

    for (let i = 0; i < RATE_LIMIT; i++) {
      await requestWeather('Washington', ip);
    }

    const limited = await requestWeather('Dallas, TX', ip);

    expect(limited.status).toBe(429);
  });
});
