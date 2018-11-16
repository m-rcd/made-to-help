import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DynamicLocation from '../DynamicLocation';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-native-maps', () => {
  const React = require('react');
  return class MockMapView extends React.Component {
    static Marker = props => React.createElement('Marker', props, props.children);

    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  };
});

test('Renders DynamicLocation component', () => {
  const snapshot = renderer.create(<DynamicLocation />).toJSON();
  expect(snapshot).toMatchSnapshot();
});

it('Should test for setState changes to locationChanged', () => {
  const snapshot = renderer.create(<DynamicLocation />);

  const instance = snapshot.getInstance()
  expect(instance.state).toMatchSnapshot('something');

  instance.locationChanged({coords: { latitude: -0.09, longitude: 51 } })
  expect(instance.state).toMatchSnapshot('Something Updated')
});

it('Should test for setState changes to journeyTime and journeyDistance', () => {
  const wrap = shallow(<DynamicLocation />);
  expect(wrap).toMatchSnapshot();
});
