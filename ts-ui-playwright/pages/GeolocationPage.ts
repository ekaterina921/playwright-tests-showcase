import { expect, Page } from '@playwright/test'
import CommonActions from '../utils/CommonActions.ts'

export default class GolocationPage{
    private actions: CommonActions;

constructor(public page: Page) {   
    this.actions = new CommonActions(page);
}

}