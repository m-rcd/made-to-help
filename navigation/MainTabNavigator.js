import React from 'react';
import Platform from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
import AlertsScreen from '../screens/AlertsScreen';
import DirectionsScreen from '../screens/DirectionsScreen';
import MapScreen from '../screens/MapScreen';

const HomeStack = createStackNavigator({
  Home: MapScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <Feather
      focused={focused}
      size={30}
      name={
        Platform.OS === 'ios'
          ? `map${focused ? '' : '-outline'}`
          : 'map'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Report: AlertsScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Report',
  tabBarIcon: ({ focused }) => (
    <Feather focused={focused} size={30} name="alert-circle" />
  ),
};

const DirectionsStack = createStackNavigator({
  Directions: DirectionsScreen,
});

DirectionsStack.navigationOptions = {
  tabBarLabel: 'Directions',
  tabBarIcon: ({ focused }) => (
    <Feather
      testId="Directions"
      focused={focused}
      size={30}
      name="send"
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  DirectionsStack,
});
