import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import KEY from '../env.config';

export default class Origin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { latitude: '', longitude: '', address: '' };
  }

  savingLocation = (latitude, longitude, address) => {
    this.setState({
      latitude,
      longitude,
      address,
    });
  };

  handleState = () => {
    this.props.updateOrigin(this.state);
  };

  render() {
    return (
      <View style={{ flex: 0.7 }}>
        <GooglePlacesAutocomplete
          placeholder="Start"
          minLength={2}
          autoFocus={false}
          returnKeyType="search"
          listViewDisplayed={false}
          fetchDetails
          onPress={(data, details = null) => {
            this.savingLocation(
              details.geometry.location.lat,
              details.geometry.location.lng,
              data.description,
            );
            this.handleState();
          }}
          getDefaultValue={() => ''}
          query={{
            key: KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              height: 50,
              marginTop: 15,
              borderColor: 'grey',
              backgroundColor: '#fff',
              borderWidth: 0.5,
              textAlign: 'center',
              borderRadius: 10,
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
          GoogleReverseGeocodingQuery={{}}
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
