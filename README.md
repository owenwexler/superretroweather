# SuperRetroWeather
## An open-source 8-bit weather app by Owen Wexler
SuperRetroWeather is an open-source weather app with a twist - an 8-bit retro experience that takes you right back to the good old days of the Nintendo Entertainment System. Just type your location into the search box and you can get a variety of weather data for your city in a fun nostalgic 8-bit package. As an added bonus, the app also remembers the last five locations you visited!

SuperRetroWeather uses the [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) font from Google Fonts.  We self-host the font using CSS code from [Google Webfonts Helper](https://gwfh.mranftl.com/fonts) for offline use and to guarantee perpetual availability in production, but we will also include, commented out, a link in the CSS to get the font directly from Google Fonts if you so desire.  The self-hosted font is NOT included in the repo.  If you want to self-host the font, download it from Google Fonts and place it in the public/fonts directory.

8-Bit weather images by [Mariia Khmelnytska](https://www.istockphoto.com/portfolio/kmarfu?assettype=image&mediatype=illustration&sort=best), courtesy of [iStock.com](http://iStockPhoto.com)

# Replace with new demos after finishing 2.0 ![](srw_demo_1.gif) ![](srw_demo_2.gif) ![](srw_demo_3.gif)

10/31/2023: We are in the process of migrating SuperRetroWeather to Qwik City.  All evergreen Qwik City-related details are included below.

## Accessing the VisualCrossing Weather API

- SuperRetroWeather uses [VisualCrossing's Weather Data Services](https://www.visualcrossing.com/weather/weather-data-services#/login) to retrieve all weather data.
- To get SuperRetroWeather working on your machine, you will have to sign up for an account at the above site and get an API key.  Your API key can be found by clicking the _Account_ tab in the upper right hand corner, and is called your _Account Key_.

- As is customary with API keys, the API key is stored in .env, which is .gitignored.  Copy the .env.example file in this repo into a blank .env file, and insert your API key where it says ``FILL_ME_IN``.

# Qwik City App ⚡️

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)

---

## Project Structure

This project is using Qwik with [QwikCity](https://qwik.builder.io/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory-based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Add Integrations and deployment

Use the `npm run qwik add` command to add additional integrations. Some examples of integrations includes: Cloudflare, Netlify or Express Server, and the [Static Site Generator (SSG)](https://qwik.builder.io/qwikcity/guides/static-site-generation/).

```shell
npm run qwik add # or `yarn qwik add`
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm start # or `yarn start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
npm run preview # or `yarn preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
npm run build # or `yarn build`
```


