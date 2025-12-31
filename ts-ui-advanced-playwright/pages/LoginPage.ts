import { expect, Page } from "playwright/test";

export class LoginPage {
  constructor(private page: Page) {
    this.page = page;
  }
    async goto(): Promise<void> {
        await this.page.goto('https://demoqa.com/login/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.page.getByRole('textbox', { name: 'UserName' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async verifyLoginSuccess(username: string): Promise<void> {
        await expect(this.page.locator('#userName-value')).toContainText(username);
        await expect(this.page.getByRole('button', { name: 'Log out' })).toBeVisible();
    }
}