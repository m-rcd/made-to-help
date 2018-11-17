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

it('Should test for setState changes', () => {
  const snapshot = renderer.create(<Directions />);
  const instance = snapshot.getInstance()
  expect(instance.state).toMatchSnapshot('something');
})

it('Should test for setState changes to longitude and latitude', () => {
  const wrap = shallow(<Directions />);
  expect(wrap).toMatchSnapshot();
})