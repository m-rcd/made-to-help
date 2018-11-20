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


it('Should test for setState changes', () => {
  const wrapper = shallow(<Origin />);
  const instance = wrapper.instance()
  instance.savingLocation(-0.09, 51)
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
