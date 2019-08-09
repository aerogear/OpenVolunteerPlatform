import { element, by, browser } from 'protractor';

describe('App', () => {
  beforeAll(async () => {
    // Sometimes protractor is faster than angular.
    // By making Appium sleep for 1s before injecting protractor
    // we ensure that angular get loaded correctly.
    await browser.sleep(1000);
  });

  it('AeroGear logo should be visible', () => {
    expect(element(by.css('ion-img.logo')).isDisplayed()).toBeTruthy();
  });
});
