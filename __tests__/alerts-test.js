import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import AlertsScreen from '../screens/AlertsScreen';

describe('Alerts snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders report form', async () => {
    const tree = renderer.create(<AlertsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
