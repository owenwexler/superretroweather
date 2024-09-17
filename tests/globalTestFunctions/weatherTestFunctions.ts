import type { Page } from "playwright/test";

import { expect } from '@playwright/test';
import type { IVCWeatherResponse } from "../../src/typedefs/IVCWeatherResponse";
import { formatDateMMDDYY } from "../../src/helper/formatDateMMDDYY";
import { formatTime } from "../../src/helper/formatTime";

const checkCurrentConditions = async (page: Page, weatherObject: IVCWeatherResponse) => {
  const currentConditions = weatherObject.location.currentConditions;

  const {
    wdir,
    temp,
    sunrise,
    visibility,
    wspd,
    icon,
    stations,
    heatindex,
    cloudcover,
    datetime,
    precip,
    moonphase,
    snowdepth,
    sealevelpressure,
    dew,
    sunset,
    humidity,
    wgust,
    windchill
  } = currentConditions;

  const dateLoc = page.locator('#current-conditions-date');

  const tempLoc = page.locator('#current-conditions-temp');
  const wspdLoc = page.locator('#current-conditions-wspd');
  const gustLoc = page.locator('#current-conditions-gust');
  const cloudcoverLoc = page.locator('#current-conditions-cloud-cover');
  const humidityLoc = page.locator('#current-conditions-humidity');
  const precipLoc = page.locator('#current-conditions-precip');
  const sunriseLoc = page.locator('#current-conditions-sunrise');
  const sunriseTimeLoc = page.locator('#current-conditions-sunrise-time');
  const sunsetLoc = page.locator('#current-conditions-sunset');
  const sunsetTimeLoc = page.locator('#current-conditions-sunset-time');

  await expect(dateLoc).toBeVisible();
  await expect(dateLoc).toHaveText(`${formatDateMMDDYY(datetime)}`);

  await expect(tempLoc).toBeVisible();
  await expect(tempLoc).toHaveText(`${Math.round(temp)}º`);

  await expect(wspdLoc).toBeVisible();
  await expect(wspdLoc).toHaveText(`WSPD: ${Math.round(wspd)}`);

  await expect(gustLoc).toBeVisible();
  await expect(gustLoc).toHaveText(`GUST: ${Math.round(wgust)}`);

  await expect(cloudcoverLoc).toBeVisible();
  await expect(cloudcoverLoc).toHaveText(`CLOUD COVER: ${Math.round(cloudcover)}`);

  await expect(humidityLoc).toBeVisible();
  await expect(humidityLoc).toHaveText(`HUMIDITY: ${Math.round(humidity)}`);

  await expect(precipLoc).toBeVisible();
  await expect(precipLoc).toHaveText(`PRECIP: ${Math.round(precip)}`);

  await expect(sunriseLoc).toBeVisible();
  await expect(sunriseLoc).toHaveText(/SUNRISE/);

  await expect(sunriseTimeLoc).toBeVisible();
  await expect(sunriseTimeLoc).toHaveText(`${formatTime(sunrise)}`);

  await expect(sunsetLoc).toBeVisible();
  await expect(sunsetLoc).toHaveText(/SUNSET/);

  await expect(sunsetTimeLoc).toBeVisible();
  await expect(sunsetTimeLoc).toHaveText(`${formatTime(sunset)}`);
}

export {
  checkCurrentConditions
}