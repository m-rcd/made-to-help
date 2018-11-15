/* eslint-disable */

const { reloadApp } = require('detox-expo-helpers');

describe('Map - Permissions', () => {
  
  it('Push Notifications permission is granted', async () => {
    await device.launchApp({ permissions: { notifications: 'YES' } });
  });
  
  it('Location permission is granted', async () => {
    await device.launchApp({ permissions: { location: 'inuse' } });
  });
});

