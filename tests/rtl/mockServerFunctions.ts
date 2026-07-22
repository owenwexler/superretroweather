import { mock } from 'bun:test';

// Exported so individual tests can override return values/implementations
// (e.g. mockImplementationOnce) for a single assertion, then let them fall
// back to these defaults afterwards.
export const getWeatherDataMock = mock(() => Promise.resolve({ error: 'not mocked in tests' }));
export const getSRWEnvMock = mock(() => Promise.resolve('development'));

// TanStack Start's Vite plugin strips server-function bodies (and everything
// they import, e.g. the Redis client) out of the client bundle at build time.
// bun:test has no such build step, so without this mock, importing a
// component that calls a server function would load the real handler -
// including server-only code that env.ts correctly refuses to run once a
// `window` global exists. This mock stands in for that build-time split.
mock.module('#/server/server', () => ({
  getWeatherData: getWeatherDataMock,
  getSRWEnv: getSRWEnvMock,
}));
