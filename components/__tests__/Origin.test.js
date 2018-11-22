import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Origin from '../Origin';

Enzyme.configure({ adapter: new Adapter() });

test('Renders Origin component', () => {
  const snapshot = renderer.create(<Origin />).toJSON()
  expect(snapshot).toMatchSnapshot();
})


it('Should test for setState changes for origin location', () => {
  const wrapper = shallow(<Origin />);
  const instance = wrapper.instance()
  instance.savingLocation(-0.09, 51, "Makers London")
  expect(instance.state.latitude).toBe(-0.09)
  expect(instance.state.longitude).toBe(51)
  expect(instance.state.address).toBe("Makers London")
})

// it('test onPress', () => {
//   const geometry = jest.fn()
//   const details = {latitude: 0.3, longitude: 42, address: 'Makers'}
//
//   const wrapper = shallow(<Origin  details={details} geometry={geometry} />)
//   const instance = wrapper.instance();
//   wrapper.find('#origin').simulate('change', { target: { value: details }})
//   wrapper.find('#origin').simulate('press')
//   expect(savingLocation).toHaveBeenCalledWith(0.3, 42, 'Makers')
//   expect(handleState).toHaveBeenCalled()
// })
