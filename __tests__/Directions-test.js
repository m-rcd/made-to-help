import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import DirectionsScreen from '../screens/DirectionsScreen';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Directions snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders directions form', () => {
    const tree = renderer.create(<DirectionsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('setState of origin', () => {
    const wrapper = shallow(<DirectionsScreen />);
    const instance = wrapper.instance()
    instance.updateOrigin({latitude: -0.09, longitude: 51})
    expect(instance.state.origin).toEqual({latitude: -0.09, longitude: 51})
  })

  it('setState of destination', () => {
    const wrapper = shallow(<DirectionsScreen />);
    const instance = wrapper.instance()
    instance.updateDestination({latitude: -0.09, longitude: 51})
    expect(instance.state.destination).toEqual({latitude: -0.09, longitude: 51})
  })

});
