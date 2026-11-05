import { env } from "#/env";
import { createServerFn } from '@tanstack/react-start';

export const getSRWEnv = createServerFn({ method: 'GET' })
  .handler(async () => {
    // data is typed and validated
    // context comes from middleware, also typed
    return env.SRW_ENV;
  });

