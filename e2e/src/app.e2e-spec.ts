import { element, by } from 'protractor';

describe('App', () => {
  it('AeroGear logo should be visible', () => {
    expect(element(by.css('ion-img.logo')).isDisplayed()).toBeTruthy();
  });
});
