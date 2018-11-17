import React from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Directions extends React.Component {
 
  constructor(props) {
      super(props);
      this.state = { address: '', latitude: '', longitude: '' };
    this.savingLocation = this.savingLocation.bind(this)
  }

  savingLocation(address, latitude, longitude) {
    this.setState(
      {
        address: address,
        latitude: latitude,
        longitude: longitude,
      },
    );
  }

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
          onPress={(data, details = null) => {
            this.savingLocation(data.description, details.geometry.location.lat, details.geometry.location.lng ) 
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
