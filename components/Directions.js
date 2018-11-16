import React from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Directions extends React.Component {
  state = {
    address: '',
    latitude: '',
    longitude: '',
  }
  // constructor(props) {
  //   super(props);
  //   this.state = { address: '', latitude: '', longitude: '' };
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ flex: 0.10 }}>
          {`${this.state.address} - ${this.state.longitude} - ${this.state.latitude}`}
        </Text>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2}
          autoFocus={false}
          returnKeyType="search"
          listViewDisplayed="auto"
          fetchDetails
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            this.setState(
              {
                address: data.description,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              },
            );
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

// AppRegistry.registerComponent('made-to-help', () => Directions);
