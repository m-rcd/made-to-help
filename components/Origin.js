import React from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import KEY from '../env.config';


export default class Origin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { latitude: '', longitude: '' };
    this.savingLocation = this.savingLocation.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  savingLocation(latitude, longitude) {
    this.setState(
      {
        latitude,
        longitude,
      },
    );
  }

  handleState = () => {
    this.props.updateOrigin(this.state);
  }

  render() {
    return (
      <View style={{ flex: 0.5 }}>
        <Text style={{ flex: 0.10 }}>
          {`${this.state.longitude} - ${this.state.latitude}`}
        </Text>
        <GooglePlacesAutocomplete
          placeholder="Start"
          minLength={2}
          autoFocus={false}
          returnKeyType="search"
          listViewDisplayed="auto"
          fetchDetails
          onPress={(data, details = null) => {
            this.savingLocation(details.geometry.location.lat, details.geometry.location.lng);
            this.handleState();
          }}

          getDefaultValue={() => ''}

          query={{
            key: KEY,
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
