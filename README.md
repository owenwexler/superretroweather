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

## Tanstack Start
As of June 2026, SuperRetroWeather uses Tanstack Start as its framework.  From July 2024-June 2026, SuperRetroWeather used Astro and Preact, but has now migrated to Tanstack Start.  All evergreen Tanstack Start details are included below.

Welcome to your new TanStack Start app! 

# Getting Started

To run this application:

```bash
npm install
npm run dev
```

# Building For Production

To build this application for production:

```bash
npm run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Uninstall the packages: `npm install @tailwindcss/vite tailwindcss -D`

## Linting & Formatting


This project uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for linting and formatting. Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint). The following scripts are available:

```bash
npm run lint
npm run format
npm run check
```


## Deploy with Nitro

This project uses Nitro as a generic server adapter, so it can run on any Node-compatible host.

```bash
npm run build
node dist/server/index.mjs
```

The build output is a self-contained Node server. To deploy, push the `dist/` directory to your host (Render, Fly.io, your own VPS, etc.) and run the server command above.

For host-specific presets (Vercel, Netlify, Cloudflare, AWS Lambda, etc.) and tuning, see https://v3.nitro.build/deploy.



## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
})
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString()
})

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('')
  
  useEffect(() => {
    getServerTime().then(setTime)
  }, [])
  
  return <div>Server time: {time}</div>
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
})
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json()
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).
