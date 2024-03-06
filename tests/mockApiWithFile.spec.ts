import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json'

/**
 * Before request on UI we make mock for api request. 
 */
test.beforeEach(async ({ page }) => {
    await page.route('https://conduit.productionready.io/api/tags', async route => {
    //or we can simplify the same for every url:
    // await page.route('*/**/api/tags', async route => {
    
    //here we fulfill body with imported mock file
    await route.fulfill({
      body: JSON.stringify(tags)
    })
  })
  await page.goto('https://angular.realworld.io/')
})

test('has title', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
});


