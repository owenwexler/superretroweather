# SuperRetroWeather
## An open-source 8-bit weather app by Owen Wexler
SuperRetroWeather is an open-source weather app with a twist - an 8-bit retro experience that takes you right back to the good old days of the Nintendo Entertainment System. Just type your location into the search box and you can get a variety of weather data for your city in a fun nostalgic 8-bit package. As an added bonus, the app also remembers the last five locations you visited!

8-Bit weather images by [Mariia Khmelnytska](https://www.istockphoto.com/portfolio/kmarfu?assettype=image&mediatype=illustration&sort=best), courtesy of [iStock.com](http://iStockPhoto.com)

# Replace with new demos after finishing 2.0 ![](srw_demo_1.gif) ![](srw_demo_2.gif) ![](srw_demo_3.gif)

10/31/2023: We are in the process of moving SuperRetroWeather to Qwik City.  File Location, Installing Dependencies, and Server Operates are all out of date at this time.

## File Location

- The code is located in the ``/retroweather`` subdirectory.
- Make sure to install all dependencies in that subfolder and let that subfolder be the one you open in your IDE.

## Installing Dependencies

- To install dependencies, type ``npm install`` in your terminal.

## Server Operations

- To watch the front-end in development type ``npm run react-dev``
- To start the server type ``npm start``

## Accessing the VisualCrossing Weather API

- SuperRetroWeather uses [VisualCrossing's Weather Data Services](https://www.visualcrossing.com/weather/weather-data-services#/login) to retrieve all weather data.
- To get SuperRetroWeather working on your machine, you will have to sign up for an account at the above site and get an API key.  Your API key can be found by clicking the _Account_ tab in the upper right hand corner, and is called your _Account Key_.

- As is customary with API keys, the API key is stored in a .gitignored config file, called ``superretroweather/retroweather/weathercrossing/wc-api-key.js``.  Copy the ``wc-api-key-example.js`` file in that directory, rename it to ``wc-api-key.js`` and insert your API key where it says ``FILL_ME_IN``.
