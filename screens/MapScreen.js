import React from "react";
import { MapView } from "expo";

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
      />
    );
  }
}
