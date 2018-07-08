import React from 'react'
import { View, Text, TouchableOpacity, Button} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function UdaciSteppers ({value, unit, onIncrement, onDecrement}) {
	return(
		<View>			
			<TouchableOpacity onPress={onDecrement}>
		      	<FontAwesome name="minus" size={30} color={'black'} />
		    </TouchableOpacity>
		    <TouchableOpacity onPress={onIncrement}>
		      	<FontAwesome name="plus" size={30} color={'black'} />
		    </TouchableOpacity>
		    <View>
				<Text>{value}</Text>
				<Text>{unit}</Text>
			</View>
		</View>
	)
}