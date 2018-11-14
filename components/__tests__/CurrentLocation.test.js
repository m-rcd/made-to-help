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

  it('test location async', () =>{
    const wrapper = shallow(<CurrentLocation />)
    wrapper.setState({ latitude: -0.03 });
    expect(wrapper.state('latitude')).toBe(-0.03)
  })
})
