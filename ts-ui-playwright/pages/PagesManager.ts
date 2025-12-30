import {Page} from '@playwright/test'
import LoginPage from './LoginPage.ts'
import GolocationPage from './GeolocationPage.ts';

export default class PagesManager{
    loginPage: LoginPage;
    geoPage: GolocationPage;

    constructor(page: Page){
        this.loginPage = new LoginPage(page);
        this.geoPage = new GolocationPage(page);
    }
}

