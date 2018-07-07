import React from 'react'
import { Text, View } from 'react-native'
import AddEntry from './components/AddEntry'
import { Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'


export default class App extends React.Component {
  render() {
    return (
      <View >
        <AddEntry/>     
      </View>
    )
  }
}
