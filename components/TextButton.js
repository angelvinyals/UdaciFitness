import React from 'react'
import { Text,  TouchableOpacity } from 'react-native';

export default function TextButton ({children, onPress, style, styleChild}) {
	return (
		<TouchableOpacity onPress={onPress} style={style} >
		      <Text style= {styleChild}>{children}</Text>	
		</TouchableOpacity>		    
	)
}