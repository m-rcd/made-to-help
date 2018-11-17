import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import LinksScreen from '../screens/LinksScreen';

describe('Links snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders directions form', async () => {
    const tree = renderer.create(<LinksScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
