import { createFileRoute } from '@tanstack/react-router';
import { env } from "#/env";
import redis from "#/redis/redis";
import type { IVCWeatherResponse } from "#/typedefs/IVCWeatherResponse";
import { getVCWeatherData } from "#/VC/VC";
import { locationSchema } from "#/schemas/locationSchema";
import { checkRateLimit, getClientIp } from "#/server/rateLimit";
import { success, failure } from 'dataerror';
import type { ErrorType } from 'dataerror';

// 30 weather requests per IP address per minute
const RATE_LIMIT_OPTIONS = {
  limit: 30,
  windowSeconds: 60
};

const rateLimitedError: ErrorType = {
  code: 'rate_limited',
  message: 'Too many requests',
  details: 'Too many weather requests were sent from this IP address',
  hint: 'Wait a minute and try again'
};

export const Route = createFileRoute('/api/weather')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const ip = getClientIp(request);
        const rateLimit = await checkRateLimit(ip, RATE_LIMIT_OPTIONS);

        if (!rateLimit.allowed) {
          console.warn(`RATE LIMITED: ${ip}`);
          const result = await failure<IVCWeatherResponse>(rateLimitedError, 'api/weather GET');
          return new Response(JSON.stringify(result), {
            status: 429,
            headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) }
          });
        }

        const url = new URL(request.url);
        const parsedLocation = locationSchema.safeParse(url.searchParams.get('location') ?? '');

        if (!parsedLocation.success) {
          const invalidLocationError: ErrorType = {
            code: 'invalid_location',
            message: 'Invalid location',
            details: parsedLocation.error.issues[0]?.message ?? 'Location is invalid',
            hint: 'Use CITY, STATE, CITY, COUNTRY, a postal or ZIP code, latitude,longitude, or a street address'
          };
          const result = await failure<IVCWeatherResponse>(invalidLocationError, 'api/weather GET');
          return new Response(JSON.stringify(result), { status: 400 });
        }

        const location = parsedLocation.data;

        const CACHE_KEY_PREFIX = 'srwcache::';

        const viteEnv =
          env.SRW_ENV === 'development'
          ?
            'development'
          :
            'production';

        const devMode =
          env.DEV_MODE === 'offline'
          ?
            'offline'
          :
            'online';

        const cacheKey = `${CACHE_KEY_PREFIX}${location}`;

        try {
          const cacheResponse = await redis.get(cacheKey);

          if (cacheResponse) {
            console.log(`CACHE HIT: ${cacheKey}`);
            const parsedResponse = JSON.parse(cacheResponse) as IVCWeatherResponse;
            const result = await success<IVCWeatherResponse>(parsedResponse);
            return new Response(JSON.stringify(result), { status: 200 })
          }
        } catch (error) {
          console.error(error);
          // We do not want a cache error to return, but pass through to the live API response
        }

        console.log(`CACHE MISS OR ERROR: ${cacheKey}`);

        try {
          const weatherResponse = await getVCWeatherData(location, {
            viteEnv,
            devMode,
            apiKey: env.VC_API_KEY
          });

          const stringifiedWeatherResponse = JSON.stringify(weatherResponse);

          await redis.set(cacheKey, stringifiedWeatherResponse, 'EX', 60 * 60);

          const result = await success<IVCWeatherResponse>(weatherResponse);
          return new Response(JSON.stringify(result), { status: 200 });
        } catch (error) {
          console.error(error)
          const result = await failure<IVCWeatherResponse>(error, 'api/weather GET');
          return new Response(JSON.stringify(result), { status: 500 })
        }
      },
    },
  },
});
