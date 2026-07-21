# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 1-default-message.spec.ts >> Default message, mobile viewport >> default message is rendered on page load
- Location: tests/1-default-message.spec.ts:5:3

# Error details

```
Error: page.goto: Could not connect to the server.
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1  | import test from "@playwright/test";
  2  | import { checkDefaultMessage, setDesktopViewport, setMobileViewport, setTabletViewport, testNavbarExistence } from "./globalTestFunctions/globalTestFunctions";
  3  | 
  4  | test.describe('Default message, mobile viewport', () => {
  5  |   test('default message is rendered on page load', async ({
  6  |     page,
  7  |   }) => {
  8  |     await setMobileViewport(page);
> 9  |     await page.goto('/');
     |                ^ Error: page.goto: Could not connect to the server.
  10 |     await checkDefaultMessage(page, { exists: true });
  11 |   });
  12 | });
```