import {Page} from '@playwright/test'
import LoginPage from './LoginPage.ts'

export default class PagesManager{
    loginPage: LoginPage;

    constructor(page: Page){
        this.loginPage = new LoginPage(page);
    }
}

