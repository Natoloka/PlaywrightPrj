import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker'

test.describe.only('some description', () => {
    //configure number of retries for each test
    test.describe.configure({ retries: 2 })


    test('test with generated data', async ({ page }, testInfo) => {
        //to check something during the retry...
        if (testInfo.retry) {
            //do something
        }
    const randomFullName = await faker.person.fullName()
    const randomNumber = await faker.number.int(1000)
    const toPrint = `${randomNumber}${randomFullName}`
    console.log(toPrint)
})
})
