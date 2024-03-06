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

test('delete article', async ({ page, request }) => {
    //authorize, get token
    const response = await request.post('https://api.realworld.io/api/users/login', {
        //data is instead of request body
        data: {
            "user": {"email":"example@example.com", "password":"psswd"}
        }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.accesssToken
    //post to articles with body and with authorization header
    const articleResponse = await request.post('https://api.realworld.io/api/articles/',{
        data: {
            "article":{"tagList":[], "title":"This title is a test title", "description":"some description"}
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    expect(articleResponse.status()).toEqual(201)
    await page.getByText('Global Feed').click()
    await page.getByText('This is a test title').click()
})


