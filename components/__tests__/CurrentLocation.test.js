import React from 'react';
import CurrentLocation from '../CurrentLocation';
import renderer from 'react-test-renderer';

test('Renders CurrentLocation component', () => {
  const snapshot = renderer.create(<CurrentLocation />).toJSON();
  expect(snapshot).toMatchSnapshot();
})
