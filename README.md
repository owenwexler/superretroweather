# SuperRetroWeather
## An open-source 8-bit weather app by Owen Wexler
SuperRetroWeather is an open-source weather app with a twist - an 8-bit retro experience that takes you right back to the good old days of the Nintendo Entertainment System. Just type your location into the search box and you can get a variety of weather data for your city in a fun nostalgic 8-bit package. As an added bonus, the app also remembers the last five locations you visited!

SuperRetroWeather uses the [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) font from Google Fonts.  We self-host the font for offline use and to guarantee perpetual availability in production, but we will also include, commented out, a link in the index to get the font directly from Google Fonts if you so desire.  The self-hosted font is NOT included in the repo.  If you want to self-host the font, download it from Google Fonts and place it in the public/fonts directory.

8-Bit weather images by [Mariia Khmelnytska](https://www.istockphoto.com/portfolio/kmarfu?assettype=image&mediatype=illustration&sort=best), courtesy of [iStock.com](http://iStockPhoto.com)
Due to licensing issues with using paid stock images in an FOSS app, these will be replaced with something we own all rights to soon.  For now, the images are .gitignored and any contributors must purchase their own license to be granted access to the images.  Stock images go in the public/images/istock folder.  The images are to be named as follows: clear.png, cloudy-night.png, partly-cloudy-rain.png, partly-cloudy.png, rain.png, snow-rain.png, snow.png, thunderstorm.png

## Accessing the VisualCrossing Weather API

- SuperRetroWeather uses [VisualCrossing's Weather Data Services](https://www.visualcrossing.com/weather/weather-data-services#/login) to retrieve all weather data.
- To get SuperRetroWeather working on your machine, you will have to sign up for a VisualCrossing account at the above site and get an API key.  Your API key can be found by clicking the _Account_ tab in the upper right hand corner, and is called your _Account Key_.

- As is customary with API keys, the API key is stored in .env, which is .gitignored.  Copy the .env.example file in this repo into a blank .env file, and insert your API key where it says ``FILL_ME_IN``.

## REDIS
SuperRetroWeather uses a REDIS cache to cache responses from the VisualCrossing API.  We use an Astro API route to check the REDIS cache with the ioredis library for a previously cached response (responses are cached for one hour), and gets a live API response and caches it for an hour if not cached.  SuperRetroWeather is set up to use local REDIS in development; you must have REDIS installed on your development machine.

## Astro/React
As of July 2024, SuperRetroWeather uses [Astro](https://www.astro.build) as its meta-framework with [React](https://www.react.dev) on the client to power interactivity in all interactive [islands](https://docs.astro.build/en/concepts/islands/).  All evergreen Astro-related details are included below.

# Astro Starter Kit: Minimal

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── components/
│   └── pages/
|       └── api
|         └── weather.ts
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
