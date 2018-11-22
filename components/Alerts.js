import * as firebase from 'firebase';
import React from 'react';
import {
  View, TextInput, Text, Button, Alert, TouchableOpacity, Image,
} from 'react-native';
import { Location } from 'expo';

const IMAGES = ['https://i.imgur.com/Pr7KWEL.png', 'https://i.imgur.com/ZEGDS72.png',
  'https://i.imgur.com/rxKLzCF.png', 'https://i.imgur.com/RZ5g8QB.png',
  'https://i.imgur.com/Pn1xPAR.png', 'https://i.imgur.com/ep1Fedt.png'];

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

  navigateHome = () => {
    this.setState({ text: '' });
    this.props.navigation.navigate('Home');
  };

  sendBrokenLiftData = async () => {
    await this.setState({ typeOfReport: 'Broken Lift', icon: IMAGES[1] });
    this.sendData();
  };

  sendBlockedPathData = async () => {
    await this.setState({ typeOfReport: 'Blocked Path', icon: IMAGES[2] });
    this.sendData();
  };

  sendStairsData = async () => {
    await this.setState({ typeOfReport: 'Stairs', icon: IMAGES[3] });
    this.sendData();
  };

  sendNarrowPathData = async () => {
    await this.setState({ typeOfReport: 'Narrow Path', icon: IMAGES[4] });
    this.sendData();
  };

  sendNoRampData = async () => {
    await this.setState({ typeOfReport: 'No Ramp', icon: IMAGES[5] });
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

        <TouchableOpacity
          id='brokenLift'
          onPress={this.sendBrokenLiftData}
        >
          <Image
            source={require('../assets/images/broken-lift.png')}
          />
          <Text>Broken Lift</Text>
        </TouchableOpacity>
        <TouchableOpacity
          id='blockedPath'
          onPress={this.sendBlockedPathData}
          >
          <Image
            source={require('../assets/images/blockedPath.png')}
          />
          <Text>Blocked Path</Text>
        </TouchableOpacity>
        <TouchableOpacity
          id='stairs'
          onPress={this.sendStairsData}
          >
          <Image
            source={require('../assets/images/stairs.png')}
          />
          <Text>Stairs</Text>
        </TouchableOpacity>
        <TouchableOpacity id='narrowPath' onPress={this.sendNarrowPathData}>
          <Image
            source={require('../assets/images/narrow-road-ahead.png')}
          />
          <Text>Narrow Path</Text>
        </TouchableOpacity>
        <TouchableOpacity id='noRamp' onPress={this.sendNoRampData}>
          <Image
            source={require('../assets/images/no-ramp.png')}
          />
          <Text>No Ramp</Text>
        </TouchableOpacity>
        <TouchableOpacity id="show-form" onPress={this.showForm}>
          <Image
            source={require('../assets/images/alert.png')}
          />
        </TouchableOpacity>
        <Text>Other</Text>
        {this.state.visibleForm
        && (
        <View>
          <TextInput placeholder="Add Issue" onChangeText={this.onHandleChange} />
          <Button title="Submit" onPress={this.sendData} />
        </View>
        )
        }
      </View>
    );
  }
}
