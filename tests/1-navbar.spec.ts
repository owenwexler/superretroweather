import test from "@playwright/test";
import { setDesktopViewport, setMobileViewport, setTabletViewport, testNavbarExistence } from "./globalTestFunctions/globalTestFunctions";

test.describe('Navbar elements', () => {
  test('constant navbar elements are rendered on a mobile viewport', async ({
    page,
  }) => {
    await setMobileViewport(page);
    await page.goto('/');
    await testNavbarExistence(page, { viewport: 'mobile' });
  });

  test('constant navbar elements are rendered on a tablet viewport', async ({
    page,
  }) => {
    await setTabletViewport(page);
    await page.goto('/');
    await testNavbarExistence(page, { viewport: 'tablet' });
  });

  test('constant navbar elements are rendered on a desktop viewport', async ({
    page,
  }) => {
    await setDesktopViewport(page);
    await page.goto('/');
    await testNavbarExistence(page, { viewport: 'desktop' });
  });
});