# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 1-navbar.spec.ts >> Navbar elements >> constant navbar elements are rendered on a tablet viewport
- Location: tests/1-navbar.spec.ts:13:3

# Error details

```
Error: page.goto: Could not connect to the server.
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1  | import test from "@playwright/test";
  2  | import { setDesktopViewport, setMobileViewport, setTabletViewport, testNavbarExistence } from "./globalTestFunctions/globalTestFunctions";
  3  | 
  4  | test.describe('Navbar elements', () => {
  5  |   test('constant navbar elements are rendered on a mobile viewport', async ({
  6  |     page,
  7  |   }) => {
  8  |     await setMobileViewport(page);
  9  |     await page.goto('/');
  10 |     await testNavbarExistence(page, { viewport: 'mobile' });
  11 |   });
  12 | 
  13 |   test('constant navbar elements are rendered on a tablet viewport', async ({
  14 |     page,
  15 |   }) => {
  16 |     await setTabletViewport(page);
> 17 |     await page.goto('/');
     |                ^ Error: page.goto: Could not connect to the server.
  18 |     await testNavbarExistence(page, { viewport: 'tablet' });
  19 |   });
  20 | 
  21 |   test('constant navbar elements are rendered on a desktop viewport', async ({
  22 |     page,
  23 |   }) => {
  24 |     await setDesktopViewport(page);
  25 |     await page.goto('/');
  26 |     await testNavbarExistence(page, { viewport: 'desktop' });
  27 |   });
  28 | });
```