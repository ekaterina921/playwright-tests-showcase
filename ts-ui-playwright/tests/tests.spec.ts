import { test, expect } from '@playwright/test';
import PagesManager from '../pages/pagesManager';

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
})