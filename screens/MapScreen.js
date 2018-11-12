import React from "react";
import { MapView, Marker } from "expo";

const home = {
  latlng: {
    latitude: 51.517292,
    longitude: -0.07327
  },
  title: "Makers Academy",
  description: "Home is where the heart is."
};
export default class MapScreen extends React.Component {
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 51.5142,
          longitude: -0.0931,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <MapView.Marker
          coordinate={home.latlng}
          title={home.title}
          description={home.desc}
          image={require("../assets/images/location.png")}
        />
      </MapView>
    );
  }
}
