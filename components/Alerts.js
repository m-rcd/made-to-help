import * as firebase from 'firebase';
import React from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { Location } from 'expo';

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  icon: {
    margin: 30,
    height: 80,
    width: 70,
  },
  iconText: {
    textAlign: 'center',
  },
  submitForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#228ac4',
    width: 100,
    height: 30,
    borderRadius: 10,
  },
  submitButtonText: {
    textAlign: 'center',
    paddingTop: 6,
    color: '#fff',
  },
});

const IMAGES = [
  'https://i.imgur.com/0HBhlFV.png',
  'https://i.imgur.com/sGMHChF.png',
  'https://i.imgur.com/03ciaHj.png',
  'https://i.imgur.com/r3QzsYf.png',
  'https://i.imgur.com/0j9t7R4.png',
  'https://i.imgur.com/6aeFpmo.png',
];

export default class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: null,
      latitude: null,
      text: '',
      typeOfReport: '',
      icon: '',
      showFormModal: false,
    };
  }


  componentWillMount = async () => {
    const location = await Location.getCurrentPositionAsync({});
    this.setState({ longitude: location.coords.longitude, latitude: location.coords.latitude });
  };

  setModalVisible = (visible) => {
    this.setState({ showFormModal: visible });
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

  sendOtherReportData = async () => {
    await this.writeAlertData(
      this.state.text,
      {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      },
      this.state.typeOfReport,
      this.state.icon,
    );
  };

  onHandleChange = (event) => {
    this.setState({ text: event, icon: IMAGES[0], typeOfReport: 'Other' });
  };

  render() {
    return (
      <View>
        <Text>Inaccessibility Report</Text>
        <TouchableOpacity
          accessibilityLabel="Broken lift"
          onPress={this.sendBrokenLiftData}
        >
          <Image
            source={require('../assets/images/broken-lift.png')}
          />
          <Text>Broken Lift</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Blocked path"
          onPress={this.sendBlockedPathData}
        >
          <Image
            source={require('../assets/images/blockedPath.png')}
          />
          <Text>Blocked Path</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Stairs"
          onPress={this.sendStairsData}
        >
          <Image
            source={require('../assets/images/stairs.png')}
          />
          <Text>Stairs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Narrow path"
          onPress={this.sendNarrowPathData}
        >
          <Image
            source={require('../assets/images/narrow-road-ahead.png')}
          />
          <Text>Narrow Path</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="No ramp"
          onPress={this.sendNoRampData}
        >
          <Image
            source={require('../assets/images/no-ramp.png')}
          />
          <Text>No Ramp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Other"
          id="show-form"
          onPress={this.showForm}
        >
          <Image
            source={require('../assets/images/alert.png')}
          />
        </TouchableOpacity>
        <Text>Other</Text>
        {this.state.visibleForm
        && (
        <View>
          <TextInput
            placeholder="Add Issue"
            accessibilityLabel="Report an Issue"
            accessibilityHint="Report an accessibility issue"
            onChangeText={this.onHandleChange}
          />
          <Button
            title="Submit"
            accessibilityLabel="Submit"
            onPress={this.sendData}
          />
        </View>
        )
        }
      </View>
    );
  }
}
