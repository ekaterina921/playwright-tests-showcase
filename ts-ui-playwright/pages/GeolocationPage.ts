import { Browser, Page } from '@playwright/test'
import CommonActions from '../utils/CommonActions.ts'

export default class GolocationPage{
    private actions: CommonActions;

constructor(public page: Page) {   
    this.actions = new CommonActions(page);
}

async setGeolocation(browser: Browser, latitude: number, longitude: number){
    return await browser.newContext({
        permissions:['geolocation'],
        geolocation:{latitude:latitude, longitude: longitude}
    })
}

async navigate(){
        await this.actions.navigate('https://the-internet.herokuapp.com/geolocation')
    }
}