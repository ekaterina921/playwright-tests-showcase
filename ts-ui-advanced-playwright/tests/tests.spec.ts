import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Verify login functionality', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
  await loginPage.verifyLoginSuccess(process.env.USER_NAME!);
}); 
