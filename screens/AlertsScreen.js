import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Alerts from '../components/Alerts';

export default class AlertsScreen extends React.Component {
  static navigationOptions = {
    title: 'Report',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Alerts navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
