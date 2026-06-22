import type { APIContext } from 'astro';

import { getVCWeatherData } from '../../helper/getVCWeatherData';
import redis from '../../redis/redis';

export async function GET ({ request }: APIContext) {
  const CACHE_KEY_PREFIX = 'srwcache::';

  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);

  const location: string = params.location;

  if (!location || location === '') {
    return new Response(null, {
      status: 404,
      statusText: 'Location missing'
    })
  }

  const viteEnv = import.meta.env.NODE_ENV === 'development' ? 'development' : 'production';
  const devMode = import.meta.env.DEV_MODE === 'offline' ? 'offline' : 'online';

  const cacheKey = `${CACHE_KEY_PREFIX}${location}`;

  try {
    const cacheResponse = await redis.get(cacheKey);

    if (cacheResponse) {
      return new Response(cacheResponse);
    } else {
      const weatherResponse = await getVCWeatherData(location!, {
        viteEnv,
        devMode,
        apiKey: import.meta.env.VC_API_KEY
      });

      const stringifiedWeatherResponse = JSON.stringify(weatherResponse);

      redis.set(cacheKey, stringifiedWeatherResponse, 'EX', 60 * 60);

      return new Response(
        JSON.stringify(weatherResponse)
      )
    }
  } catch (error) {
    console.error(error);
    const responseObj = { error: error }
    return new Response(
      JSON.stringify(responseObj)
    )
  }
}