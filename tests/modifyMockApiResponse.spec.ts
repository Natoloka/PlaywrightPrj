import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json'

/**
 * Before request on UI we make mock for api request. 
 */
test.beforeEach(async ({ page }) => {
    await page.route('*/**/api/tags', async route => { 
    //here we fulfill body with imported mock file
    await route.fulfill({
      body: JSON.stringify(tags)
    })
    })
    await page.route('*/**/api/articles*', async route => { 
        const response = await route.fetch()
        const responseBody = await response.json()
        //update response with test data
        responseBody.articles[0].title = "Test title"
        responseBody.articles[0].description = "Test description"

        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })
  await page.goto('https://angular.realworld.io/')
})

test('has title', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toHaveText('conduit');
    await expect(page.locator('h1').first()).toContainText('Test title');
    await expect(page.locator('p').first()).toContainText('Test description');
    // await page.waitForTimeout(1000)
});


