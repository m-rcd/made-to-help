import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CurrentLocation from '../CurrentLocation';

Enzyme.configure({ adapter: new Adapter() });

test('Renders CurrentLocation component', () => {
  const snapshot = renderer.create(<CurrentLocation />).toJSON();
  expect(snapshot).toMatchSnapshot();
});

describe('Current Location', () => {
  it('shallow renders', () => {
    const wrapper = shallow(<CurrentLocation />);
    expect(wrapper.state('longitude')).toBe(0);
  });

  it('test location async', () => {
    const wrapper = shallow(<CurrentLocation />);
    const instanceComponent = wrapper.instance();
    instanceComponent._getLocationAsync = () => {
      wrapper.setState({ latitude: 34 });
    };
    instanceComponent._getLocationAsync();
    expect(wrapper.state('latitude')).toBe(34);
  });
});
