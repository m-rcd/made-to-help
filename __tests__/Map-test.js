import "react-native";
import React from "react";
import MapScreen from "../screens/MapScreen";
import renderer from "react-test-renderer";

// Mocks the react-native-maps element which has our maps:
jest.mock("react-native-maps");

describe("Map snapshot", () => {
  it("renders successfully", async () => {
    const tree = renderer.create(<MapScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
