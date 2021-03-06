import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { white, red, orange,  blue, lightPurp, pink ,  gold, yellow } from './colors'

export function getDailyReminderValue () {
	return{
		today: "Don't forget to log your data today!"
	}
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
})


export function isBetween (num, x, y) {
  if (num >= x && num <= y) {
    return true
  }

  return false
}

export function calculateDirection (heading) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}


export function getMetricMetaInfo (metric) {
	const info ={
		run:{
			displayname:'Run',
			max: 50,
			unit:'km',
			step:1,
			type: 'steppers',
			getIcon() {
				return (
					<View style={[styles.iconContainer, {backgroundColor: red}]}>
						<MaterialIcons
							name= 'directions-run'
							color= {gold}
							size={35}
						/>
					</View>
				)
			}
		},
		bike:{
			displayname:'Bike',
			max: 100,
			unit:'km',
			step:1,
			type: 'steppers',
			getIcon() {
				return (
					<View style={[styles.iconContainer, {backgroundColor: pink}]}>
						<MaterialCommunityIcons
							name= 'bike'
							color= {gold}
							size={35}
						/>
					</View>
				)
			}
		},
		swim:{
			displayname:'Swim',
			max: 9900,
			unit:'m',
			step:100,
			type: 'steppers',
			getIcon() {
				return (
					<View style={[styles.iconContainer, {backgroundColor: blue}]}>
						<MaterialCommunityIcons
							name= 'swim'
							color= {gold}
							size={35}
						/>
					</View>
				)
			}
		},
		sleep:{
			displayname:'Sleep',
			max: 24,
			unit:'hours',
			step:1,
			type: 'slider',
			getIcon() {
				return (
					<View style={[styles.iconContainer, {backgroundColor: lightPurp}]}>
						<FontAwesome
							name= 'bed'
							color= {gold}
							size={35}
						/>
					</View>
				)
			}
		},
		eat:{
			displayname:'Eat',
			max: 10,
			unit:'rating',
			step:1,
			type: 'slider',
			getIcon() {
				return (
					<View style={[styles.iconContainer, {backgroundColor: yellow }]}>
						<MaterialCommunityIcons
							name= 'food'
							color= {'black'}
							size={35}
						/>
					</View>
				)
			}
		},

	}

	return typeof metric === 'undefined'
		? info
		: info[metric]

}

