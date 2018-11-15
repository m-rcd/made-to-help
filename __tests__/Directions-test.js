import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import DirectionsScreen from '../screens/DirectionsScreen';

describe('Directions snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders directions form', async () => {
    const tree = renderer.create(<DirectionsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
