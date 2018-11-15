import React from 'react';
import { AppRegistry, TextInput, View } from 'react-native';
import { Button } from 'react-native';

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
      <View style={{width: window.width, margin: 10, padding:4, alignItems:'center', justifyContent:'center', borderWidth:4, borderColor:'#888', borderRadius:10, backgroundColor:'#fff'}}>
          <TextInput
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
          <Button
            onPress={() => this.props.navigation.navigate('Map')}
            title='Search'
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
    </View>
    );
  }
}
