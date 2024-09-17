import type { Page } from "playwright/test";

import { expect } from '@playwright/test';
import type { IVCWeatherResponse } from "../../src/typedefs/IVCWeatherResponse";

const testLinkById = async (page: Page, id: string, href: string) => {
  await expect(page.locator(id)).toBeVisible();
  await expect(page.locator(id)).toHaveAttribute('href', href);
}

const setMobileViewport = async (page: Page) => {
  await page.setViewportSize({ width: 390, height: 844 });
  return;
}

const setTabletViewport = async (page: Page) => {
  await page.setViewportSize({ width: 820, height: 1180 });
  return;
}

const setDesktopViewport = async (page: Page) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  return;
}

const setGalaxyFoldViewport = async (page: Page) => {
  await page.setViewportSize({ width: 280, height: 653 });
  return;
}

const testNavbarExistence = async (page: Page, args: { viewport: 'mobile' | 'tablet' | 'desktop' }) => {
  const { viewport } = args;

  await expect(page.locator('#srw-navbar-outer').first()).toBeVisible();
  await expect(page.locator('#srw-navbar-inner').first()).toBeVisible();
  await expect(page.locator('#srw-search-input').first()).toBeVisible();
  await expect(page.locator('#srw-search-button').first()).toBeVisible();

  if (viewport === 'mobile') {
    await expect(page.locator('#responsive-logo-text-mobile').first()).toBeVisible();
    await expect(page.locator('#responsive-logo-text-tablet').first()).not.toBeVisible();
  } else {
    await expect(page.locator('#responsive-logo-text-mobile').first()).not.toBeVisible();
    await expect(page.locator('#responsive-logo-text-tablet').first()).toBeVisible();
  }
}

const checkUrl = async (page: Page, id: string, url: string) => {
  const locator = page.locator(id);
  await expect(locator).toBeVisible();
  await expect(locator).toHaveAttribute('href', url);
}

const checkDefaultMessage = async (page: Page,  args: { exists: boolean }) => {
  const { exists } = args;
  const itsDangerous = page.locator('#default-msg-its-dangerous');
  const enterLocation = page.locator('#default-msg-enter-your-location');

  if (exists) {
    await expect(itsDangerous).toBeVisible();
    await expect(itsDangerous).toContainText(/IT'S DANGEROUS TO NOT KNOW THE WEATHER!/);
    await expect(enterLocation).toBeVisible();
    await expect(enterLocation).toContainText(/Enter your location above or pick one of your previous saved locations./);
  } else {
    await expect(itsDangerous).not.toBeVisible();
    await expect(enterLocation).not.toBeVisible();
  }
}

const searchFor = async(page: Page, searchQuery: string) => {
  const searchInput = page.locator('#srw-search-input');
  const searchButton = page.locator('#srw-search-button');

  await searchInput.fill(searchQuery);
  await expect(searchInput).toHaveValue(searchQuery);
  await searchButton.click({ force: true });
}

export {
  setMobileViewport,
  setTabletViewport,
  setDesktopViewport,
  setGalaxyFoldViewport,
  testNavbarExistence,
  checkUrl,
  checkDefaultMessage,
  searchFor
}