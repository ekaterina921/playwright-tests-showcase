import { expect, Page } from '@playwright/test'
import CommonActions from '../utils/CommonActions.ts'

export default class LoginPage {
    private actions: CommonActions;
    
    constructor(public page : Page) {
        this.actions = new CommonActions(page)
    }

    async navigate(){
        await this.actions.navigate('https://the-internet.herokuapp.com/login')
    }

    async login(username, password){
        await this.actions.fill('#username', username)
        await this.actions.fill('#password', password)
        await this.actions.click('button[type="submit"]')
    }

    async getErrorMessage(){
        return await this.actions.getText('#flash')
    }

    async asserErrorMessage(expectedMessage){
        const actualMessage = await this.getErrorMessage()
        expect(actualMessage).toContain(expectedMessage)
    }
}