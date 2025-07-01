import type { Page } from "playwright/test";

import { expect } from '@playwright/test';
import type { IVCWeatherResponse } from "../../src/typedefs/IVCWeatherResponse";
import { formatDateMMDDYY } from "../../src/helper/formatDateMMDDYY";
import { formatTime } from "../../src/helper/formatTime";
import type { IVCWeatherDayValueSet } from "../../src/typedefs/IVCWeatherDayValueSet";
import { getPicNameFromCondition } from "../../src/helper/getPicNameFromCondition";
import type { TConditionImageType } from "../../src/typedefs/TConditionImageType";

const checkWeatherImage = async (page: Page, id: string, icon: string | null | undefined) => {
  const picName = getPicNameFromCondition(icon ? icon as TConditionImageType : 'clear');

  await expect(page.locator(id)).toBeVisible()
  await expect(page.locator(id)).toHaveAttribute('src', `/public/images/weather/${picName}?url&jsx`)
}

const checkCurrentConditions = async (page: Page, weatherObject: IVCWeatherResponse, header: string) => {
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

  await expect(page.locator('#weather-header')).toBeVisible();
  await expect(page.locator('#weather-header')).toContainText(header);

  await checkWeatherImage(page, '#current-conditions-image', currentConditions.icon);

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

const checkSevenDayListItem = async (page: Page, sevenDayListItem: IVCWeatherDayValueSet) => {
  const {
    maxt,
    visibility,
    wspd,
    datetimeStr,
    cloudcover,
    heatindex,
    mint,
    precip,
    snowdepth,
    snow,
    humidity,
    wgust,
    conditions,
    windchill
  } = sevenDayListItem;

  const condition = conditions.toLowerCase() as TConditionImageType;

  const dateTimeIdDate = datetimeStr.slice(0, datetimeStr.indexOf('T'));

  await checkWeatherImage(page, `#seven-day-image-${dateTimeIdDate}`, condition);

  const dateLoc = page.locator(`#seven-day-date-${dateTimeIdDate}`);
  const lowLoc = page.locator(`#seven-day-low-${dateTimeIdDate}`);
  const highLoc = page.locator(`#seven-day-high-${dateTimeIdDate}`);
  const wspdLoc = page.locator(`#seven-day-wspd-${dateTimeIdDate}`);
  const gustLoc = page.locator(`#seven-day-wgust-${dateTimeIdDate}`);
  const wchillLoc = page.locator(`#seven-day-wchill-${dateTimeIdDate}`);
  const visLoc = page.locator(`#seven-day-vis-${dateTimeIdDate}`);
  const cloudCoverLoc = page.locator(`#seven-day-cloudcover-${dateTimeIdDate}`);
  const humidityLoc = page.locator(`#seven-day-humidity-${dateTimeIdDate}`);

  await expect(dateLoc).toBeVisible();
  await expect(dateLoc).toHaveText(`${formatDateMMDDYY(datetimeStr)}`);

  await expect(highLoc).toBeVisible();
  await expect(highLoc).toHaveText(`HIGH: ${Math.round(maxt)}º`);

  await expect(lowLoc).toBeVisible();
  await expect(lowLoc).toHaveText(`LOW: ${Math.round(mint)}º`);

  await expect(wspdLoc).toBeVisible();
  await expect(wspdLoc).toHaveText(`WSPD: ${Math.round(wspd)}`);

  await expect(gustLoc).toBeVisible();
  await expect(gustLoc).toHaveText(`WGUST: ${Math.round(wgust)}`);

  await expect(cloudCoverLoc).toBeVisible();
  await expect(cloudCoverLoc).toHaveText(`CLOUD COVER: ${Math.round(cloudcover)}`);

  await expect(humidityLoc).toBeVisible();
  await expect(humidityLoc).toHaveText(`HUMIDITY: ${Math.round(humidity)}`);

  await expect(wchillLoc).toBeVisible();
  await expect(wchillLoc).toHaveText(`WCHILL: ${windchill ? Math.round(windchill) : 0}`);

  await expect(visLoc).toBeVisible();
  await expect(visLoc).toHaveText(`VISIBILITY: ${Math.round(visibility)}`);
}

const checkAllSevenDayListItems = async (page: Page, sevenDayList: IVCWeatherDayValueSet[]) => {
  const promises = [];

  for (const sevenDayListItem of sevenDayList) {
    promises.push(checkSevenDayListItem(page, sevenDayListItem));
  }

  await Promise.all(promises);
}

export {
  checkCurrentConditions,
  checkSevenDayListItem,
  checkAllSevenDayListItems
}
