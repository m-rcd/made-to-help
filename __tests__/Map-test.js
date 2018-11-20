import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MapScreen from '../screens/MapScreen';

// Mocks the react-native-maps element which has our maps:
jest.mock('react-native-maps', () => {
  const React = require('react');
  return class MockMapView extends React.Component {
    static Marker = props => React.createElement('Marker', props, props.children);

    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  };
});


  describe('Map snapshot', () => {
    let navigation;
    beforeEach(() => {
      navigation = jest.fn();
    })
    it('renders successfully', async () => {
      // const tree = renderer.create(<MapScreen/>).toJSON();
      // expect(tree).toMatchSnapshot();

  });
});
