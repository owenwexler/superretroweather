import test from "@playwright/test";
import { checkDefaultMessage, searchFor, setTabletViewport } from "./globalTestFunctions/globalTestFunctions";

import { checkCurrentConditions } from "./globalTestFunctions/weatherTestFunctions";
import type { IVCWeatherResponse } from "../src/typedefs/IVCWeatherResponse";
import { getOfflineWeatherData } from "../src/helper/getOfflineWeatherData";

import { dc } from '../src/data/VCMockData/dc';

test.describe('Core weather functions, mobile viewport', () => {
  test.beforeEach(async ({page}) => {
    await setTabletViewport(page);
    await page.goto('/');
  });

  test('typing Washington, DC in the search box and clicking the button gets weather data for Washington, DC', async ({
    page,
  }) => {
    await checkDefaultMessage(page, { exists: true });
    await searchFor(page, 'Washington, DC');
    await checkDefaultMessage(page, { exists: false });

    await checkCurrentConditions(page, dc as unknown as IVCWeatherResponse);
  });
});