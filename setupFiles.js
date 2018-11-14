jest.mock("react-native-maps", () => {
  const React = require("react");
  return class MockMapView extends React.Component {
    static Marker = props =>
      React.createElement("Marker", props, props.children);

    render() {
      return React.createElement("MapView", this.props, this.props.children);
    }
  };
});
