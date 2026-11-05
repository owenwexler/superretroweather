import { mock } from 'bun:test';
import { dc } from '#/offlineWeatherData/VCMockData/dc';

// WeatherContainer calls the /api/weather route through snaxios, which uses the global fetch.
// Mocking fetch stands in for that route, so tests never reach the real route, Redis, or Visual Crossing.
// The default response matches what the route returns on success: success<IVCWeatherResponse>(weatherResponse).
// Any other request fails loudly so an unmocked call shows up as a test failure instead of a live network call.
export const weatherApiMock = mock(async (input: RequestInfo | URL, _init?: RequestInit) => {
  const url = new URL(String(input), 'http://localhost');

  if (url.pathname === '/api/weather') {
    return Response.json({ data: dc, error: null }, { status: 200 });
  }

  throw new Error(`Unmocked request in tests: ${url.pathname}`);
});

globalThis.fetch = weatherApiMock as unknown as typeof fetch;
