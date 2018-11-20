import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Directions from '../Directions';

Enzyme.configure({ adapter: new Adapter() });

test('Renders directions component', () => {
  const snapshot = renderer.create(<Directions />).toJSON()
  expect(snapshot).toMatchSnapshot();
})

it('State should start empty', () => {
  const wrapper = shallow(<Directions />);
  expect(wrapper.instance().state.latitude).toBe('');
  expect(wrapper.instance().state.longitude).toBe('');
  expect(wrapper.instance().state.address).toBe('');
})

it('Should test for setState changes', () => {
  const wrapper = shallow(<Directions />);
  const instance = wrapper.instance()
  instance.savingLocation('Makers', -0.09, 51)
  expect(instance.state.address).toBe('Makers')
  expect(instance.state.latitude).toBe(-0.09)
  expect(instance.state.longitude).toBe(51)
})

// it('setStates onPress', () => {
//   const data = 'test'
//   const details = 'hi'
//   const onPress = jest.fn();
//   const component = shallow(<Directions onPress={onPress}/>);
//   component.find('GooglePlacesAutocomplete').simulate('press', {
//         target: {  details, data},
//       });
//
//     expect(onPress).toBeCalledWith(details, data);
// });

it('Should test for setState changes to longitude and latitude', () => {
  const wrap = shallow(<Directions />);
  expect(wrap).toMatchSnapshot();
})
