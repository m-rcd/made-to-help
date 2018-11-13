import "react-native";
import React from "react";
import Map from "../MapScreen";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Map />).toJSON();
  expect(tree).toMatchSnapshot();
});
