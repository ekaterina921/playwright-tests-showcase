import { test, expect } from '../fixtures.ts';
import { request } from '@playwright/test';

test('Verify login functionality', async ({ loginPage }) => {
  await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
  await loginPage.verifyLoginSuccess(process.env.USER_NAME!);
}); 

test('Verify login via API', async ({request}) => {
  const response = await request.post('https://demoqa.com/Account/v1/GenerateToken',{
    data:{
      userName: process.env.USER_NAME!,
      password: process.env.PASSWORD!
    }
  });
  expect(response.status()).toBe(200);
  expect((await response.json()).token).toBeDefined();
  expect((await response.json()).token.length).toBeGreaterThan(0);
  expect((await response.json()).status).toBe('Success');
  expect((await response.json()).result).toBe('User authorized successfully.');
});