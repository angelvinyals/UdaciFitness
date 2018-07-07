import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>App.js to start working on your app!</Text>
        <Text>Changes make will automatically reload.</Text>
        <Icon  name='rowing' />
        <Icon
          name='g-translate'
          color='#00aced' />
        <Icon
          name='sc-telegram'
          type='evilicon'
          color='#517fa4'
        />
        <Icon
          reverse
          name='ios-american-football'
          type='ionicon'
          color='#517fa4'
        />
        <Icon
          raised
          name='heartbeat'
          type='font-awesome'
          color='#f50'
          onPress={() => console.log('hello')} />
        <Ionicons 
          name="md-pizza"
          color="black" 
          size= {50}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
