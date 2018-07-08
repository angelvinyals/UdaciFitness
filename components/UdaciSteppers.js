import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'

export default function UdaciSteppers ({max, unit, step, value, onIncrement, onDecrement}) {
	return(
		<View >			
			<TouchableOpacity onPress={onDecrement}>
		      	<FontAwesome name="minus" size={30} color={'black'} />
		    </TouchableOpacity>
		    <TouchableOpacity onPress={onIncrement}>
		      	<FontAwesome name="plus" size={30} color={'black'} />
		    </TouchableOpacity>
		    <View style={styles.container}>
				<Text>{`${value} `} </Text>
				<Text>{unit}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
   container: {
     flexDirection: 'row', 
     alignSelf: 'flex-start'
   }
});