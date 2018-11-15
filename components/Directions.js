import React from 'react';
import { AppRegistry, TextInput } from 'react-native';

export default class Directions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Destination' };
  }

  render() {
    return (
      <TextInput
        style={{ height: 20, borderColour: 'gray', borderWidth: 1 }}
        inChangeText={text => this.setState({ text })}
        value={this.state.text}
      />
    );
  }
}

AppRegistry.registerComponent('made-to-help', () => Directions);
