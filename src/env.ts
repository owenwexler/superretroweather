import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_URL: z.string().url().optional(),
    NODE_ENV: z.enum(['development', 'production']),
    DEV_MODE: z.enum(['offline', 'online']),
    VC_API_KEY: z.string(),
    REDIS_CONNECTION: z.string(),
    SRW_ENV: z.enum(['development', 'production'])
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: 'VITE_',

  client: {
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DEV_MODE: process.env.DEV_MODE,
    VC_API_KEY: process.env.VC_API_KEY,
    REDIS_CONNECTION: process.env.REDIS_CONNECTION,
    SRW_ENV: process.env.SRW_ENV,
  },

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: false, // this needs to be false because ioredis accepts an empty string as well as a REDIS URL
})
