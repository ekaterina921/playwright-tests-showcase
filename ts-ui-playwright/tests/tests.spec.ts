import { test, expect, Browser, Page, BrowserContext } from '@playwright/test';
import PagesManager from '../pages/pagesManager';
import { chromium } from 'playwright'

let pagesManager: PagesManager;

test.describe('Login tests', () => {
    test.beforeEach(async ({ page }) => {
        pagesManager = new PagesManager(page);
    })

    test.afterEach(async ({ page }) => {
        await page.close()
    })

    test('Verify logging in with valid credentials', async ({ page }) => {
        await pagesManager.loginPage.navigate();
        await pagesManager.loginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect(page.locator('#flash')).toContainText(/You logged into a secure area!/);
        await expect(page.locator('h4.subheader')).toContainText('Welcome to the Secure Area. When you are done click logout below.');
    })

    test('Verify login with invalid username', async({page}) => {
        await pagesManager.loginPage.navigate();
        await pagesManager.loginPage.login('invalidUsername', 'SuperSecretPassword!')
        await pagesManager.loginPage.assertErrorMessage('Your username is invalid!')
    })

    test('Verify login with invalid password', async({page}) => {
        await pagesManager.loginPage.navigate();
        await pagesManager.loginPage.login('tomsmith', 'invalidPassword')
        await pagesManager.loginPage.assertErrorMessage('Your password is invalid!')
    })
})

let locations = [
    {latitude: 51.507351, longitude: -0.127758},
    {latitude:37.386052, longitude:-122.083851},
];

locations.forEach(({latitude, longitude}) => {
test.describe.only(`Verify geolocation [${latitude}, ${longitude}]`, () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    test.beforeAll(async () => {
    //launch Chrome browser before all tests
    browser = await chromium.launch({headless:true});
    pagesManager = new PagesManager(page);
})

    test.beforeEach(async () => {
    //create context (settings) for a browser
    context = await pagesManager.geoPage.setGeolocation(browser, latitude, longitude)
    //create new page
    page = await context.newPage();
    //navigate to test url
    await page.goto('/geolocation');
})

    test.afterEach(async () => {
    //close page and context
    await page.close();
    await context.close();
})
test.afterAll(async () => {
    //close the brower
    await browser.close();
})

test(`Verify geolocation setting [${latitude}, ${longitude}]`, async() => {
    await page.click('button');
    const lat = await page.textContent('#lat-value');
    const long = await page.textContent('#long-value');
    expect(parseFloat(lat!)).toBeCloseTo(latitude);
    expect(parseFloat(long!)).toBeCloseTo(longitude);
})
})
})