import React from 'react'
import { View, Text, StyleSheet, Slider } from 'react-native'

export default function UdaciSlider ({ max, step,  unit, value,  onChange}) {
	return(
		<View style= { styles.container}>
			<Slider
				step={step}
				value={value}
				maximumValue= {max}
				minimumValue= {0}
				onValueChange= {onChange}
			/>
			<View>
				<Text>{`${value} `}</Text>
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