import * as firebase from 'firebase';
import React from 'react';
import {
  View, TextInput, Text, Button, Alert,
} from 'react-native';
import { Location } from 'expo';

const IMAGES = ['https://i.imgur.com/Pr7KWEL.png', 'https://i.imgur.com/ZEGDS72.png'];

export default class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: null,
      latitude: null,
      text: '',
      typeOfReport: '',
      icon: IMAGES[0],
    };
  }

  componentWillMount = async () => {
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ longitude: location.coords.longitude, latitude: location.coords.latitude });
  };

  writeAlertData = (body, location, typeOfReport, icon) => {
    firebase
      .database()
      .ref('alerts/')
      .push({
        body,
        location,
        typeOfReport,
        icon,
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
    this.writeAlertData(
      this.state.text,
      {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      },
      this.state.typeOfReport,
      this.state.icon,
    );
    this.setState({ text: '', typeOfReport: '', icon: '' });
    this.navigateHome();
  };

  sendTypeOfReportData = () => {
    this.setState({ typeOfReport: 'Broken Lift', icon: IMAGES[1] });
    this.writeAlertData(
      this.state.text,
      {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      },
      this.state.typeOfReport,
      this.state.icon,
    );
    this.navigateHome();
  };

  navigateHome = () => {
    this.props.navigation.navigate('Home');
  };

  onHandleChange = (event) => {
    this.setState({ text: event, icon: IMAGES[0], typeOfReport: 'Other' });
  };

  render() {
    return (
      <View>
        <Text>Inaccessibility Report</Text>
        <Button id="brokenLift" title="Broken Lift" onPress={this.sendTypeOfReportData} />
        <TextInput placeholder="Extra Info" onChangeText={this.onHandleChange}>
          {this.state.text}
        </TextInput>
        <Button title="Submit" onPress={this.sendData} />
      </View>
    );
  }
}
