import React from 'react';
import CurrentLocation from '../CurrentLocation';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

test('Renders CurrentLocation component', () => {
  const snapshot = renderer.create(<CurrentLocation />).toJSON();
  expect(snapshot).toMatchSnapshot();
})

describe('Current Location', () => {
  it('shallow renders', () => {
    const wrapper = shallow(<CurrentLocation />)
    expect(wrapper.state('longitude')).toBe(0)
  })

  it('test location async', () => {
    const wrapper = shallow(<CurrentLocation />)
    const location = {coords:{latitude: -0.03, longitude: 50}}
    wrapper.setState({ longitude: location.coords.longitude})
    wrapper.setState({ latitude: location.coords.latitude})
    expect(wrapper.state('latitude')).toBe(-0.03)
    expect(wrapper.state('longitude')).toBe(50)
  })
})