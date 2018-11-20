import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Alerts from '../Alerts';

Enzyme.configure({ adapter: new Adapter() });

test('Renders CurrentLocation component', () => {
  const snapshot = shallow(<Alerts />);
  expect(snapshot).toMatchSnapshot();
});
