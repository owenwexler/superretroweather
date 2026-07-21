# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 1-core-weather-functions.spec.ts >> Core weather functions, mobile viewport >> typing Washington, DC in the search box and clicking the button gets weather data for Washington, DC, typing Los Angeles, CA in the search box gets weather data for Los Angeles, both locations are saved in saved locations, saved locations persist across a page refresh and get the weather data as they are supposed to
- Location: tests/1-core-weather-functions.spec.ts:17:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#weather-header')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#weather-header')

```

```yaml
- navigation:
  - link "SuperRetroWeather":
    - /url: /
    - paragraph: SuperRetroWeather
  - textbox "Enter location..."
  - button "SEARCH":
    - paragraph: SEARCH
  - separator
  - button "Washington, DC"
- main:
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - paragraph
  - heading "L O A D I N G" [level=1]
  - heading "SuperRetroWeather is a free open-source project made by Owen Wexler." [level=6]
  - heading "To contribute, visit the Github page, read the CONTRIBUTING.MD file, and make a pull request." [level=6]:
    - text: To contribute, visit the
    - link "Github":
      - /url: https://github.com/owenwexler/superretroweather
    - text: page, read the CONTRIBUTING.MD file, and make a pull request.
  - paragraph
- button "Open TanStack Devtools":
  - img "TanStack Devtools"
```

# Test source

```ts
  1   | import type { Page } from "playwright/test";
  2   | 
  3   | import { expect } from '@playwright/test';
  4   | import type { IVCWeatherResponse } from "../../src/typedefs/IVCWeatherResponse";
  5   | import { formatDateMMDDYY } from "../../src/helper/formatDateMMDDYY";
  6   | import { formatTime } from "../../src/helper/formatTime";
  7   | import type { IVCWeatherDayValueSet } from "../../src/typedefs/IVCWeatherDayValueSet";
  8   | import { getPicNameFromCondition } from "../../src/helper/getPicNameFromCondition";
  9   | import type { TConditionImageType } from "../../src/typedefs/TConditionImageType";
  10  | 
  11  | const checkWeatherImage = async (page: Page, id: string, icon: string | null | undefined) => {
  12  |   const picName = getPicNameFromCondition(icon ? icon as TConditionImageType : 'clear');
  13  | 
  14  |   await expect(page.locator(id)).toBeVisible()
  15  |   await expect(page.locator(id)).toHaveAttribute('src', `/images/weather/${picName}`);
  16  | }
  17  | 
  18  | const checkCurrentConditions = async (page: Page, weatherObject: IVCWeatherResponse, header: string) => {
  19  |   const currentConditions = weatherObject.location.currentConditions;
  20  | 
  21  |   const {
  22  |     wdir,
  23  |     temp,
  24  |     sunrise,
  25  |     visibility,
  26  |     wspd,
  27  |     icon,
  28  |     stations,
  29  |     heatindex,
  30  |     cloudcover,
  31  |     datetime,
  32  |     precip,
  33  |     moonphase,
  34  |     snowdepth,
  35  |     sealevelpressure,
  36  |     dew,
  37  |     sunset,
  38  |     humidity,
  39  |     wgust,
  40  |     windchill
  41  |   } = currentConditions;
  42  | 
  43  |   const dateLoc = page.locator('#current-conditions-date');
  44  | 
  45  |   const tempLoc = page.locator('#current-conditions-temp');
  46  |   const wspdLoc = page.locator('#current-conditions-wspd');
  47  |   const gustLoc = page.locator('#current-conditions-gust');
  48  |   const cloudcoverLoc = page.locator('#current-conditions-cloud-cover');
  49  |   const humidityLoc = page.locator('#current-conditions-humidity');
  50  |   const precipLoc = page.locator('#current-conditions-precip');
  51  |   const sunriseLoc = page.locator('#current-conditions-sunrise');
  52  |   const sunriseTimeLoc = page.locator('#current-conditions-sunrise-time');
  53  |   const sunsetLoc = page.locator('#current-conditions-sunset');
  54  |   const sunsetTimeLoc = page.locator('#current-conditions-sunset-time');
  55  | 
> 56  |   await expect(page.locator('#weather-header')).toBeVisible();
      |                                                 ^ Error: expect(locator).toBeVisible() failed
  57  |   await expect(page.locator('#weather-header')).toContainText(header);
  58  | 
  59  |   await checkWeatherImage(page, '#current-conditions-image', currentConditions.icon);
  60  | 
  61  |   await expect(dateLoc).toBeVisible();
  62  |   await expect(dateLoc).toHaveText(`${formatDateMMDDYY(datetime)}`);
  63  | 
  64  |   await expect(tempLoc).toBeVisible();
  65  |   await expect(tempLoc).toHaveText(`${Math.round(temp)}º`);
  66  | 
  67  |   await expect(wspdLoc).toBeVisible();
  68  |   await expect(wspdLoc).toHaveText(`WSPD: ${Math.round(wspd)}`);
  69  | 
  70  |   await expect(gustLoc).toBeVisible();
  71  |   await expect(gustLoc).toHaveText(`GUST: ${Math.round(wgust)}`);
  72  | 
  73  |   await expect(cloudcoverLoc).toBeVisible();
  74  |   await expect(cloudcoverLoc).toHaveText(`CLOUD COVER: ${Math.round(cloudcover)}`);
  75  | 
  76  |   await expect(humidityLoc).toBeVisible();
  77  |   await expect(humidityLoc).toHaveText(`HUMIDITY: ${Math.round(humidity)}`);
  78  | 
  79  |   await expect(precipLoc).toBeVisible();
  80  |   await expect(precipLoc).toHaveText(`PRECIP: ${Math.round(precip)}`);
  81  | 
  82  |   await expect(sunriseLoc).toBeVisible();
  83  |   await expect(sunriseLoc).toHaveText(/SUNRISE/);
  84  | 
  85  |   await expect(sunriseTimeLoc).toBeVisible();
  86  |   await expect(sunriseTimeLoc).toHaveText(`${formatTime(sunrise)}`);
  87  | 
  88  |   await expect(sunsetLoc).toBeVisible();
  89  |   await expect(sunsetLoc).toHaveText(/SUNSET/);
  90  | 
  91  |   await expect(sunsetTimeLoc).toBeVisible();
  92  |   await expect(sunsetTimeLoc).toHaveText(`${formatTime(sunset)}`);
  93  | }
  94  | 
  95  | const checkSevenDayListItem = async (page: Page, sevenDayListItem: IVCWeatherDayValueSet) => {
  96  |   const {
  97  |     maxt,
  98  |     visibility,
  99  |     wspd,
  100 |     datetimeStr,
  101 |     cloudcover,
  102 |     heatindex,
  103 |     mint,
  104 |     precip,
  105 |     snowdepth,
  106 |     snow,
  107 |     humidity,
  108 |     wgust,
  109 |     conditions,
  110 |     windchill
  111 |   } = sevenDayListItem;
  112 | 
  113 |   const condition = conditions.toLowerCase() as TConditionImageType;
  114 | 
  115 |   const dateTimeIdDate = datetimeStr.slice(0, datetimeStr.indexOf('T'));
  116 | 
  117 |   await checkWeatherImage(page, `#seven-day-image-${dateTimeIdDate}`, condition);
  118 | 
  119 |   const dateLoc = page.locator(`#seven-day-date-${dateTimeIdDate}`);
  120 |   const lowLoc = page.locator(`#seven-day-low-${dateTimeIdDate}`);
  121 |   const highLoc = page.locator(`#seven-day-high-${dateTimeIdDate}`);
  122 |   const wspdLoc = page.locator(`#seven-day-wspd-${dateTimeIdDate}`);
  123 |   const gustLoc = page.locator(`#seven-day-wgust-${dateTimeIdDate}`);
  124 |   const wchillLoc = page.locator(`#seven-day-wchill-${dateTimeIdDate}`);
  125 |   const visLoc = page.locator(`#seven-day-vis-${dateTimeIdDate}`);
  126 |   const cloudCoverLoc = page.locator(`#seven-day-cloudcover-${dateTimeIdDate}`);
  127 |   const humidityLoc = page.locator(`#seven-day-humidity-${dateTimeIdDate}`);
  128 | 
  129 |   await expect(dateLoc).toBeVisible();
  130 |   await expect(dateLoc).toHaveText(`${formatDateMMDDYY(datetimeStr)}`);
  131 | 
  132 |   await expect(highLoc).toBeVisible();
  133 |   await expect(highLoc).toHaveText(`HIGH: ${Math.round(maxt)}º`);
  134 | 
  135 |   await expect(lowLoc).toBeVisible();
  136 |   await expect(lowLoc).toHaveText(`LOW: ${Math.round(mint)}º`);
  137 | 
  138 |   await expect(wspdLoc).toBeVisible();
  139 |   await expect(wspdLoc).toHaveText(`WSPD: ${Math.round(wspd)}`);
  140 | 
  141 |   await expect(gustLoc).toBeVisible();
  142 |   await expect(gustLoc).toHaveText(`WGUST: ${Math.round(wgust)}`);
  143 | 
  144 |   await expect(cloudCoverLoc).toBeVisible();
  145 |   await expect(cloudCoverLoc).toHaveText(`CLOUD COVER: ${Math.round(cloudcover)}`);
  146 | 
  147 |   await expect(humidityLoc).toBeVisible();
  148 |   await expect(humidityLoc).toHaveText(`HUMIDITY: ${Math.round(humidity)}`);
  149 | 
  150 |   await expect(wchillLoc).toBeVisible();
  151 |   await expect(wchillLoc).toHaveText(`WCHILL: ${windchill ? Math.round(windchill) : 0}`);
  152 | 
  153 |   await expect(visLoc).toBeVisible();
  154 |   await expect(visLoc).toHaveText(`VISIBILITY: ${Math.round(visibility)}`);
  155 | }
  156 | 
```