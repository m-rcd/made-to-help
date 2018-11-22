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

test('Sending report data for broken lift', () => {
  const snapshot = shallow(<Alerts />);
  snapshot.find('#brokenLift').simulate('press')
  expect(snapshot.state().typeOfReport).toEqual('Broken Lift')
});

test('Sending report data for blocked path', () => {
  const snapshot = shallow(<Alerts />);
  snapshot.find('#blockedPath').simulate('press')
  expect(snapshot.state().typeOfReport).toEqual('Blocked Path')
});

test('Sending report data for stairs', () => {
  const snapshot = shallow(<Alerts />);
  snapshot.find('#stairs').simulate('press')
  expect(snapshot.state().typeOfReport).toEqual('Stairs')
});

test('Sending report data for narrow path', () => {
  const snapshot = shallow(<Alerts />);
  snapshot.find('#narrowPath').simulate('press')
  expect(snapshot.state().typeOfReport).toEqual('Narrow Path')
});

test('Sending report data for No Ramp', () => {
  const snapshot = shallow(<Alerts />);
  snapshot.find('#noRamp').simulate('press')
  expect(snapshot.state().typeOfReport).toEqual('No Ramp')
});
