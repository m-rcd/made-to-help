/* eslint-disable */
const { reloadApp } = require('detox-expo-helpers');

describe('Example', () => {
  beforeEach(async () => {
    await reloadApp();
  });

  it('should load a map onto screen', async () => {
    await expect(element(by.id('map'))).toBeVisible();
  });
});
