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
  'https://i.imgur.com/Pr7KWEL.png',
  'https://i.imgur.com/ZEGDS72.png',
  'https://i.imgur.com/rxKLzCF.png',
  'https://i.imgur.com/RZ5g8QB.png',
  'https://i.imgur.com/Pn1xPAR.png',
  'https://i.imgur.com/ep1Fedt.png',
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
      <View style={styles.icons}>
        <TouchableOpacity id="brokenLift" style={styles.icon} onPress={this.sendBrokenLiftData}>
          <Image source={require('../assets/images/broken-lift.png')} />
          <Text style={styles.iconText}>Broken Lift</Text>
        </TouchableOpacity>
        <TouchableOpacity id="blockedPath" style={styles.icon} onPress={this.sendBlockedPathData}>
          <Image source={require('../assets/images/blockedPath.png')} />
          <Text style={styles.iconText}>Blocked Path</Text>
        </TouchableOpacity>
        <TouchableOpacity id="stairs" style={styles.icon} onPress={this.sendStairsData}>
          <Image source={require('../assets/images/stairs.png')} />
          <Text style={styles.iconText}>Stairs</Text>
        </TouchableOpacity>
        <TouchableOpacity id="narrowPath" style={styles.icon} onPress={this.sendNarrowPathData}>
          <Image source={require('../assets/images/narrow-road-ahead.png')} />
          <Text style={styles.iconText}>Narrow Path</Text>
        </TouchableOpacity>
        <TouchableOpacity id="noRamp" style={styles.icon} onPress={this.sendNoRampData}>
          <Image source={require('../assets/images/no-ramp.png')} />
          <Text style={styles.iconText}>No Ramp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          id="show-form"
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Image source={require('../assets/images/alert.png')} />
          <Text style={styles.iconText}>Other</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showFormModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.submitForm}>
            <TextInput
              style={{ fontSize: 25, marginBottom: 10 }}
              placeholder="Enter Your Report"
              onChangeText={this.onHandleChange}
            />
            <TouchableHighlight onPress={this.sendOtherReportData} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.showFormModal);
              }}
            >
              <Text style={{ fontSize: 20 }}>Close Report</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}
