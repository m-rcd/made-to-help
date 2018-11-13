import React from "react";
import { MapView } from "expo";
import { View } from "react-native";

const home = {
  latlng: {
    latitude: 51.517292,
    longitude: -0.07327
  },
  title: "Makers Academy",
  description: "Home is where the heart is."
};
export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: "Map"
  };

  render() {
    return (
      <View style={{ flex: 1 }} testID="map">
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 51.5142,
            longitude: -0.0931,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    );
  }
}
