import * as firebase from 'firebase';
import React from 'react';
import {
  View, TextInput, Text, Button, Alert,
} from 'react-native';
import { Location } from 'expo';

export default class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: null,
      latitude: null,
      text: '',
      typeOfReport: '',
    };
  }

  componentWillMount = async () => {
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ longitude: location.coords.longitude, latitude: location.coords.latitude });
  };

  writeAlertData = (body, location, typeOfReport) => {
    firebase
      .database()
      .ref('alerts/')
      .push({
        body,
        location,
        typeOfReport,
      })
      .then((data) => {
        console.log('data ', data);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
    Alert.alert('Thanks, your report has been submitted. 🙃');
  };

  sendData = () => {
    this.writeAlertData(this.state.text, {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    },
    this.state.typeOfReport
  );
    this.setState({ text: '', typeOfReport: '' });
    this.navigateHome();
  };

  navigateHome = () => {
    this.props.navigation.navigate('Home');
  }

  onHandleChange = (event) => {
    this.setState({ text: event });
  }

  render() {
    return (
      <View>
        <Text>Inaccessibility Report </Text>
        <Button title="Broken Lift" onPress={ () => this.setState({typeOfReport: 'Broken Lift'})}
          />
        <TextInput placeholder="Extra Info" onChangeText={this.onHandleChange}>
          {this.state.text}
        </TextInput>
        {this.state.text !== '' || this.state.typeOfReport !== '' && <Button title="Submit" onPress={this.sendData} />}
      </View>
    );
  }
}
