import { test, expect } from '../fixtures.ts';

test('Verify login functionality', async ({ loginPage }) => {
  await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
  await loginPage.verifyLoginSuccess(process.env.USER_NAME!);
}); 
