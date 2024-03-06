// import { test as setup } from '@playwright/test';

// const authFile = '.auth/user.json'
// setup('authentication', async ({ page }) => {
//     await page.goto('https://angular.realworld.io')
//     await page.getByText('Sign in').click()
//     await page.getByRole('textbox', {name: "Email"}).fill("a@a.com")
//     await page.getByRole('textbox', { name: "Password" }).fill("12345")
//     await page.getByRole('button').click()
//     await page.waitForResponse('https://api.realworld.io/api/tags')
//     await page.context().storageState({path: authFile})
// })

import { test as setup } from '@playwright/test';
import user from '../.auth/user.json';
import fs from 'fs';
/**
 * authorizes user and resrites file with auth config
 */
const authFile = '.auth/user.json'
setup('authentication', async ({ request }) => {
    const response = await request.post('https://api.realworld.io/api/users/login', {
        data: {
           "user": {"email":"user1", "password":"12345"}
       }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.token
    user.origins[0].localstorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))
    process.env['ACCESS_TOKEN']=accessToken
})