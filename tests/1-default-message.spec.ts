import test from "@playwright/test";
import { checkDefaultMessage, setDesktopViewport, setMobileViewport, setTabletViewport, testNavbarExistence } from "./globalTestFunctions/globalTestFunctions";

test.describe('Default message, mobile viewport', () => {
  test('default message is rendered on page load', async ({
    page,
  }) => {
    await setMobileViewport(page);
    await page.goto('/');
    await checkDefaultMessage(page, { exists: true });
  });
});