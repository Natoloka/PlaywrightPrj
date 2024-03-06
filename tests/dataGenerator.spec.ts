import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker'

test('test with generated data', async ({ page }) => {
    const randomFullName = await faker.person.fullName()
    const randomNumber = await faker.number.int(1000)
    const toPrint = `${randomNumber}${randomFullName}`
    console.log(toPrint)
})