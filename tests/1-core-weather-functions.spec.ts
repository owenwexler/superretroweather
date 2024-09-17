import test, { expect } from "@playwright/test";
import { checkDefaultMessage, searchFor, setTabletViewport } from "./globalTestFunctions/globalTestFunctions";

import { checkAllSevenDayListItems, checkCurrentConditions } from "./globalTestFunctions/weatherTestFunctions";
import type { IVCWeatherResponse } from "../src/typedefs/IVCWeatherResponse";
import { getOfflineWeatherData } from "../src/helper/getOfflineWeatherData";

import { dc } from '../src/data/VCMockData/dc';
import { la } from '../src/data/VCMockData/la';
import type { IVCWeatherDayValueSet } from "../src/typedefs/IVCWeatherDayValueSet";

test.describe('Core weather functions, mobile viewport', () => {
  test.beforeEach(async ({page}) => {
    await setTabletViewport(page);
    await page.goto('/');
  });

  test('typing Washington, DC in the search box and clicking the button gets weather data for Washington, DC, typing Los Angeles, CA in the search box gets weather data for Los Angeles, both locations are saved in saved locations, saved locations persist across a page refresh and get the weather data as they are supposed to', async ({
    page,
  }) => {
    // this entire flow has to be in one test because localStorage clears across each test and we need to test localStorage persistence across page reloads
    await page.evaluate(() => window.localStorage.clear()); // clear localStorage before running the first test to keep saved locations consistent
    await expect(page.locator('#saved-location-washington-dc')).not.toBeVisible()
    await expect(page.locator('#saved-location-los-angeles-ca')).not.toBeVisible()
    await checkDefaultMessage(page, { exists: true });
    await searchFor(page, 'Washington, DC');
    await expect(page.locator('#saved-location-washington-dc')).toBeVisible();

    await checkDefaultMessage(page, { exists: false });
    await checkCurrentConditions(page, dc as unknown as IVCWeatherResponse, 'Washington, DC');
    await checkAllSevenDayListItems(page, dc.location.values as unknown as IVCWeatherDayValueSet[]);

    await searchFor(page, 'Los Angeles, CA');
    await expect(page.locator('#saved-location-los-angeles-ca')).toBeVisible();
    await checkCurrentConditions(page, la as unknown as IVCWeatherResponse, 'Los Angeles, CA');
    await checkAllSevenDayListItems(page, la.location.values as unknown as IVCWeatherDayValueSet[]);

    await page.reload(); // refresh the page

    await expect(page.locator('#saved-location-washington-dc')).toBeVisible();
    await expect(page.locator('#saved-location-los-angeles-ca')).toBeVisible();

    await page.locator('#saved-location-washington-dc').click({ force: true });
    await checkCurrentConditions(page, dc as unknown as IVCWeatherResponse, 'Washington, DC');
    await checkAllSevenDayListItems(page, dc.location.values as unknown as IVCWeatherDayValueSet[])

    await page.locator('#saved-location-los-angeles-ca').click({ force: true });
    await checkCurrentConditions(page, la as unknown as IVCWeatherResponse, 'Los Angeles, CA');
    await checkAllSevenDayListItems(page, la.location.values as unknown as IVCWeatherDayValueSet[])
  });
});