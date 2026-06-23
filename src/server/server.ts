import { env } from "#/env";
import redis from "#/redis/redis";
import type { IVCWeatherResponse } from "#/typedefs/IVCWeatherResponse";
import { getVCWeatherData } from "#/VC/VC";
import { createServerFn } from '@tanstack/react-start';
import z from "zod";

export const getSRWEnv = createServerFn({ method: 'GET' })
  .handler(async () => {
    // data is typed and validated
    // context comes from middleware, also typed
    return env.SRW_ENV;
  });

export const getWeatherData = createServerFn({ method: 'GET' })
  .validator(z.object({ location: z.string().min(1) }))
  .handler(async ({ data }) => {
    const CACHE_KEY_PREFIX = 'srwcache::';

    const { location } = data;

    if (!location || location === '') {
      return new Response(null, {
        status: 404,
        statusText: 'Location missing'
      })
    }

    const viteEnv = env.SRW_ENV === 'development' ? 'development' : 'production';
    const devMode = env.DEV_MODE === 'offline' ? 'offline' : 'online';

    const cacheKey = `${CACHE_KEY_PREFIX}${location}`;

    try {
      const cacheResponse = await redis.get(cacheKey);

      if (cacheResponse) {
        return cacheResponse as IVCWeatherResponse;
      } else {
        const weatherResponse = await getVCWeatherData(location, {
          viteEnv,
          devMode,
          apiKey: env.VC_API_KEY
        });

        const stringifiedWeatherResponse = JSON.stringify(weatherResponse);

        redis.set(cacheKey, stringifiedWeatherResponse, 'EX', 60 * 60);

        return weatherResponse;
      }
    } catch (error) {
      console.error(error);
      const responseObj = { error: error }
      return responseObj;
    }
  });
