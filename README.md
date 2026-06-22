# SuperRetroWeather
## An open-source 8-bit weather app by Owen Wexler
SuperRetroWeather is an open-source weather app with a twist - an 8-bit retro experience that takes you right back to the good old days of the Nintendo Entertainment System. Just type your location into the search box and you can get a variety of weather data for your city in a fun nostalgic 8-bit package. As an added bonus, the app also remembers the last five locations you visited!

## Tech Stack
We are in the middle of migrating the entire app from Astro and Preact to Tanstack Start.

### Target stack:
Language: TypeScript
Runtime: Node
Framework: Tanstack Start (was Astro/Preact)
CSS Library: Tailwind
UI Library: none, all buttons and inputs are custom 
Database: localStorage for persisting saved locations, otherwise none
ORM: none
Cache: REDIS for caching weather API responses
Weather API: VisualCrossing Weather API
Custom font: Press Start 2P (from Google Fonts, self-hosted)
Error-handling library: none
Logging: none
Environment Variable Validation: none
Linting: ESLint
Client state management: Jotai (was Nanostores)
CI: none
Deployment target: Render.com

Currently, the project is a Tanstack Start scaffold with all the target stack dependencies in place and the components from the old Astro/Preact codebase. 

## Setup 
1.  Make sure you have [Node](https://nodejs.org/) and [REDIS](https://redis.io/lp/get-started2) installed locally.  In some Linux distributions, REDIS is replaced by Valkey under the hood - this shouldn't cause any problems in development.  Please submit an issue if it does.
2.  Sign up for a VisualCrossing account and get an API key (instructions for doing so below)
3.  Create a ```.env``` file and set up all environment variables according to the ```.env.example``` file.  Fill in the API key you got from VisualCrossing in VC_API_KEY.  Leave the REDIS_CONNECTION variable blank ('') for local REDIS in development.  SRW_ENV is necessary to determine whether the environment is development or production in client components.  Set DEV_MODE to "offline" before running the tests.   
4.  Install all dependencies by typing ```npm install```.  
5.  Run the development server in offline mode by typing ```npm run dev:offline```.
6.  Run the tests in UI mode by typing ```npm run test:e2e:ui``` or in CLI mode by typing ```npm run test:e2e:run```.  Make sure they all pass.

## Font
SuperRetroWeather uses the [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) font from Google Fonts.  We self-host the font for offline use and to guarantee perpetual availability in production, but we will also include, commented out, a link in the index to get the font directly from Google Fonts if you so desire.  The self-hosted font is included in the repo, which is necessary for it to be self-hosted on the app server as well.

## Images
As of September 2024, the current 8-bit weather images are from [Freepik.com](https://www.freepik.com).  The license is a premium commercial license that allows for any use including commercial use and derivative works.  We swapped out the images so we could include them in the repo, which is necessary for them to be hosted on the same server as the app.

## Accessing the VisualCrossing Weather API

- SuperRetroWeather uses [VisualCrossing's Weather Data Services](https://www.visualcrossing.com/weather/weather-data-services#/login) to retrieve all weather data.
- To get SuperRetroWeather working on your machine, you will have to sign up for a VisualCrossing account at the above site and get an API key.  Your API key can be found by clicking the _Account_ tab in the upper right hand corner, and is called your _Account Key_.

- As is customary with API keys, the API key is stored in .env, which is .gitignored.  Copy the .env.example file in this repo into a blank .env file, and insert your API key where it says ``FILL_ME_IN``.

## Offline mode
SuperRetroWeather has a built-in offline mode that uses pre-fetched VC API responses in JSON files instead of live VC API responses.  Activate this by setting DEV_MODE to "offline" in your .env file or run ``npm run dev:offline`` instead of ``npm run dev``.
NOTE: setting DEV_MODE to "offline" is required before running the end-to-end tests, as tests are run against static offline weather responses and there is no way to consistently test against live weather API responses.

## Tests
SuperRetroWeather uses [Playwright](https://playwright.dev/) as its testing framework.  Tests must be run in offline mode as detailed above for the tests to pass as tests are run against the static offline weather responses, not live API responses. 

## TypeScript
SuperRetroWeather uses [TypeScript](https://www.typescriptlang.org/).  This is non-negotiable.  Any pull requests removing TypeScript from the project will be rejected.

## REDIS
SuperRetroWeather uses a REDIS cache to cache responses from the VisualCrossing API.  We use an Astro API route to check the REDIS cache with the ioredis library for a previously cached response (responses are cached for one hour), and gets a live API response and caches it for an hour if not cached.  SuperRetroWeather is set up to use local REDIS in development; you must have REDIS installed on your development machine.  SuperRetroWeather uses the ioredis package as a REDIS client on the frontend.

## Nanostores
SuperRetroWeather uses the [Nano Stores](https://github.com/nanostores/nanostores) package to manage state globally across the app.

## Tailwind
SuperRetroWeather uses [Tailwind](https://tailwindcss.com/) for styling and CSS.

## Astro/Preact
As of July 2024, SuperRetroWeather uses [Astro](https://www.astro.build) as its meta-framework with [Preact](https://preactjs.com/) on the client to power interactivity in all interactive [islands](https://docs.astro.build/en/concepts/islands/).  All evergreen Astro-related details are included below.

NOTE: SuperRetroWeather is staying on Preact unless there is a compelling reason to move to React - pull requests moving the interactive portion of the codebase to React will be rejected unless a sufficiently compelling reason for the move is given.

# Astro Starter Kit: Minimal

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── tests/ - all end-to-end tests for SuperRetroWeather
├── src/
│   └── components/ - Astro and Preact components
│   └── helper/ - helper functions for formatting dates, getting weather data, getting picture URLs, etc.
│   └── data/ - the generic key used to persist saved locations to localStorage, static location and time data, and offline VC responses
│   └── redis/ - REDIS code
│   └── store/ - Nanostores code
│   └── typedefs/ - TypeScript type definitions
│   └── pages/ - all Astro pages, just the homepage right now
|       └── api
|         └── weather.ts - frontend API routes that securely get responses from the REDIS cache if available or the live weather API if not
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any React components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
