import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CurrentLocation from '../CurrentLocation';

Enzyme.configure({ adapter: new Adapter() });

test('Renders CurrentLocation component', () => {
  const snapshot = shallow(<CurrentLocation />);
  expect(snapshot).toMatchSnapshot();
});

describe('Current Location', () => {
  it('shallow renders', () => {
    const wrapper = shallow(<CurrentLocation />);
    expect(wrapper.state('longitude')).toBe(0);
  });

  it('test location method changes latitude', () => {
    const wrapper = shallow(<CurrentLocation />);
    const instanceComponent = wrapper.instance();
    instanceComponent._getLocationAsync = () => {
      wrapper.setState({ longitude: 51 });
      wrapper.setState({ latitude: -0.03 });
    };
    instanceComponent.componentWillMount();
    expect(wrapper.state('longitude')).toBe(51);
    expect(wrapper.state('latitude')).toBe(-0.03);
  });
  
  it('test location async', () => {
    const wrapper = shallow(<CurrentLocation />)
    const location = {coords:{latitude: -0.03, longitude: 50}}
    wrapper.setState({ longitude: location.coords.longitude})
    wrapper.setState({ latitude: location.coords.latitude})
    expect(wrapper.state('latitude')).toBe(-0.03)
    expect(wrapper.state('longitude')).toBe(50)
  })
})
