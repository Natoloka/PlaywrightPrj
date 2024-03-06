import { test, expect } from '@playwright/test';

/**
 * Before request on UI we make mock for api request. 
 */
test.beforeEach(async ({ page }) => {
  await page.route('http://api.someapi.com/tags', async route => {
    //Here we create mocked response body
    const tags = {
      "tags": [
        "automation",
        "playwright",
      ]
    }
    //here we fulfill body with mock above
    await route.fulfill({
      body: JSON.stringify(tags)
    })
  })
  await page.goto('http://api.weatherapi.com/v1/current.json?q=Kyiv&lang=en&key=e7bef16297ec404796a92912242102')
})

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Playwright/);
});


