import React from 'react';
// import {
//   Text, TouchableOpacity, TextInput, View, Image, StyleSheet,
//
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapScreen from './MapScreen';

// eslint-disable-next-line
const App = createStackNavigator({
  Home: MapScreen,
});

export default class Directions extends React.Component {
  static navigationOptions = {
    title: 'Directions',
  };
  // constructor(props) {
  //   super(props);
  //   // this.state = { text: 'Destination' };
  // }

  render() {
    return (
      <View>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          autoFocus={false}
          returnKeyType="search"
          listViewDisplayed="auto"
          fetchDetails
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            console.log(data, details);
          }}

          getDefaultValue={() => ''}

          query={{
            key: 'AIzaSyB2rfzTA_qJznxhWxxxpuU4e2e6WvLPklk',
            language: 'en',
          }}

          styles={{
            textInputContainer: {
              width: '100%',
            },
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: {
              color: 'black',
              zIndex: 16,
              position: 'absolute',
            },
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          GoogleReverseGeocodingQuery={{
          }}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}

          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          debounce={200}
          currentLocation
        />
      </View>
    );
  }
}
