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
//   const component = shallow(<Origin/>);
//   const instance = component.instance()
//   const details = { latitude: -0.09, longitude: 51 }
//   component.find('GooglePlacesAutocomplete').simulate('press', {
//         target: { details.geometry.location }
//       });
//
//     expect(instance.savingLocation).toBeCalledWith(details);
// });
