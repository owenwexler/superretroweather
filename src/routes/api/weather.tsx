import { createFileRoute } from '@tanstack/react-router';
import { env } from "#/env";
import redis from "#/redis/redis";
import type { IVCWeatherResponse } from "#/typedefs/IVCWeatherResponse";
import { getVCWeatherData } from "#/VC/VC";
import z from "zod";
import { success, failure, errors } from 'dataerror';

const searchSchema = z.object({
  location: z.string().min(1)
});

export const Route = createFileRoute('/api/weather')({
  validateSearch: searchSchema,
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const parsed = searchSchema.safeParse({
          location: url.searchParams.get('location') ?? ''
        });

        if (!parsed.success) {
          console.error('Missing location');
          const result = await failure<IVCWeatherResponse>(errors.missingInputs, 'api/weather GET');
          return new Response(JSON.stringify(result), { status: 404 });
        }

        const { location } = parsed.data;

        const CACHE_KEY_PREFIX = 'srwcache::';

        if (!location || location === '') {
          console.error('Missing location')
          const result = await failure<IVCWeatherResponse>(errors.missingInputs, 'api/weather GET');
          return new Response(JSON.stringify(result), { status: 404 });
        }

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
