import * as firebase from 'firebase';
import React from 'react';
import {
  View, TextInput, Text, Button, Alert, TouchableOpacity, Image,
} from 'react-native';
import { Location } from 'expo';

const IMAGES = ['https://i.imgur.com/Pr7KWEL.png', 'https://i.imgur.com/ZEGDS72.png', 'https://i.imgur.com/rxKLzCF.png'];

export default class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: null,
      latitude: null,
      text: '',
      typeOfReport: '',
      icon: '',
      visibleForm: false,
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
    this.navigateHome();
  };

  sendBrokenLiftData = async () => {
    await this.setState({ typeOfReport: 'Broken Lift', icon: IMAGES[1] });
    this.sendData();
  };

  navigateHome = () => {
    this.setState({ text: '' });
    this.props.navigation.navigate('Home');
  };
  sendBlockedPathData = async () => {
    await this.setState({ typeOfReport: 'Blocked Path', icon: IMAGES[2] });
    this.sendData();
  };

  onHandleChange = (event) => {
    this.setState({ text: event, icon: IMAGES[0], typeOfReport: 'Other' });
  };

  showForm = () => {
    if (this.state.visibleForm === true) {
      this.setState({ visibleForm: false });
    } else {
      this.setState({ visibleForm: true });
    }
  }

  render() {
    return (
      <View>
        <Text>Inaccessibility Report</Text>

        <TouchableOpacity onPress={this.sendBrokenLiftData}>
          <Image
            source={require('../assets/images/broken-lift.png')}
          />
          <Text>Broken Lift</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.sendBlockedPathData}>
          <Image
            source={require('../assets/images/blockedPath.png')}
          />
          <Text>Blocked Path</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showForm}>
          <Image
            source={require('../assets/images/alert.png')}
          />
        </TouchableOpacity>
        {this.state.visibleForm
          && (
          <View>
            <TextInput placeholder="Extra Info" onChangeText={this.onHandleChange} />
            <Button title="Submit" onPress={this.sendData} />
          </View>
          )
        }
      </View>
    );
  }
}
