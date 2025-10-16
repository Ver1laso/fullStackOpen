const { test, expect, describe, beforeEach } = require('@playwright/test')
require('dotenv').config()

describe("Blog app", ()=> {

    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    // test('front page can be opened', async ({ page }) => {
    //     // await page.goto('http://localhost:5173')

    //     const locator = await page.getByText('Posts')
    //     await expect(locator).toBeVisible()
    //     await expect(page.getByText('Blog app, department of Computer Science, University of Helsinki 2025')).toBeVisible()
    // })

    // test('login form can be opened', async ({ page }) =>{
    //     // await page.goto('http://localhost:5173')

    //     await page.getByRole('button', {name: 'login'}).click()
    //     await page.getByTestId('username').first().fill(process.env.TEST_USER)
    //     await page.getByTestId('password').last().fill(process.env.TEST_PASS)
    //     await page.getByRole('button', { name: 'login'}).click()

    //     await expect(page.getByText('Robert C. Martin logged-in')).toBeVisible()
    // })

    test('login fails with wrong password', async ({ page })=>{
                await page.goto('http://localhost:5173')
                await page.getByRole('button', { name: 'login'}).click()
                await page.getByTestId('username').fill(process.env.TEST_USER)
                await page.getByTestId('password').fill('wrongpw')
                await page.getByRole('button', { name: 'login'}).click()

                await expect(page.getByText('wrong credentials')).toBeVisible()
            })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'login'}).click()
            await page.getByTestId('username').fill(process.env.TEST_USER)
            await page.getByTestId('password').fill(process.env.TEST_PASS)
            await page.getByRole('button', { name: 'login'}).click()

            await expect(page.getByText('Robert C. Martin logged-in')).toBeVisible()
        })

        test('a new post can be created', async ({ page }) =>{
            await page.getByRole('button', { name: 'Create a post'}).click()
            await page.getByTestId('title').fill('Post creado desde playwright')
            await page.getByTestId('url').fill('www.lalala.com')
            await page.getByRole('button', { name: 'save'}).click()

            await expect(page.getByText('Title: Post creado desde playwright')).toBeVisible()
        })
    })

    

})