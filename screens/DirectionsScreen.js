import React from 'react';
import {
  Text, TouchableOpacity, TextInput, View, StyleSheet,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MapScreen from './MapScreen';

// eslint-disable-next-line
const App = createStackNavigator({
  Home: MapScreen,
});

export default class Directions extends React.Component {
  static navigationOptions = {
    title: 'Directions',
  };

  constructor(props) {
    super(props);
    this.state = { text: 'Destination' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underLineColorAndroid="transparent"
          placeholder="Start"
          placeholderTextColor="grey"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />

        <TextInput
          style={styles.input}
          underLineColorAndroid="transparent"
          placeholder="End"
          placeholderTextColor="grey"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.props.navigation.navigate('Home')}
        >
          <Text style={styles.submitButtonText}> Search </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    padding: 4,
    margin: 10,
    height: 40,
    borderWidth: 4,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#888',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: 'rgb(0, 122, 255)',
    padding: 4,
    margin: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
  },
});
