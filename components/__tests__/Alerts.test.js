import React from 'react';
import renderer from 'react-test-renderer';
import { TextInput, Button } from "react-native";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Alerts from '../Alerts';

Enzyme.configure({ adapter: new Adapter() });

test('Renders CurrentLocation component', () => {
  const snapshot = shallow(<Alerts />);
  expect(snapshot).toMatchSnapshot();
});

test('Input changes', () => {
  const snapshot = shallow(<Alerts />);
  snapshot.find('#show-form').simulate('press')
  userInput = snapshot.find(TextInput)
  userInput.simulate('changeText', 'Lift broken')
  expect(snapshot.state().text).toEqual('Lift broken')
});

// test('Sending report data', () => {
//   const snapshot = shallow(<Alerts />);
//   const button = snapshot.find('#brokenLift')
//   button.simulate('press')
//   expect(snapshot.state().typeOfReport).toEqual('Broken Lift')
// });
