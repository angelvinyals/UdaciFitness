import React, {Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { getMetricMetaInfo , timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { Ionicons } from '@expo/vector-icons'
import { submitEntry, removeEntry } from '../utils/api'
import {addEntry, receiveEntries } from  '../actions'
import { white, purple, yellow, red } from '../utils/colors'

class AddEntry extends Component {

	state ={
		run:0,
		bike: 10,
		swim:0,
		sleep:0,
		eat:5,
	}

	increment = (metric) =>{
		const { max, step } = getMetricMetaInfo(metric)

		this.setState((state)=>{
			const count= state[metric] + step

			return {
				...state,
				[metric]: count > max ? max : count
			}

		})
	}

	decrement = (metric) =>{
		const { step } = getMetricMetaInfo(metric)

		this.setState((state)=>{
			const count= state[metric] - step

			return {
				...state,
				[metric]: count < 0 ? 0 : count
			}

		})
	}

	slide = (metric, value) =>{
		this.setState(()=> ({
			[metric]: value, 
		}))
	}

	submit = () => {
		const key = timeToString()
		const entry = this.state

		this.props.addEntryProp({
			[key]: entry
		})

		this.setState(() =>({
			run:0,
			bike: 0,
			swim:0,
			sleep:0,
			eat:0,
		}))

		//Navigate to home

		submitEntry( {key, entry} )

		// Clear local notification
	}

	reset = () => {
		const key = timeToString()

		this.props.addEntryProp({
			[key]: getDailyReminderValue()
		})

		// route to Home

		removeEntry(key)



	}

	render () {
		const metaInfo = getMetricMetaInfo()

		if(this.props.alreadyLogged){
			return (
				<View style={styles.center}>
					<Ionicons
						name={Platform.OS === 'ios' 
								?'ios-happy-outline'
								: 'md-happy'
							}
						size={100}
					/>
					<Text>You already logged your infomation for today</Text>

				<TextButton 
					onPress={this.reset} 
					style={Platform.OS === 'ios' 
							? styles.iosResetBtn
							: styles.androidResetBtn
					}
					styleChild={styles.BtnText}
				>
					Reset
				</TextButton>

				</View>
			)
		}

		return (			
			<View style={styles.container}>
				<DateHeader
					date= {(new Date()).toLocaleDateString()}
				/>
				<Text>{JSON.stringify(this.state)}</Text>
				{Object.keys(metaInfo).map((key)=>{	
					const { getIcon, type, ...rest} = metaInfo[key]
					const value = this.state[key]

					return (
						<View key={key} style={styles.row}>
							{getIcon()}
							{type === 'slider'
								? <UdaciSlider
									value= {value}
									onChange = {(value) => this.slide(key,value)}
									{...rest}
									/>
								: <UdaciSteppers
									value= {value}
									onIncrement = {() => this.increment(key)}
									onDecrement = {() => this.decrement(key)}
									{...rest}
									/>
							}
						</View>
					)
				})}	
				<TextButton 
					onPress={this.submit}
					style={Platform.OS === 'ios' 
							? styles.iosSubmitBtn
							: styles.androidSubmitBtn
					}
					styleChild={styles.BtnText}
				>
					Submit
				</TextButton>
				
			</View>
		)
	}
}


const mapStateToProps = state => {
  const key= timeToString()
  
  return {
  	alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addEntryProp: (entry) => dispatch(addEntry(entry))
  }
}

export default connect(  mapStateToProps,  mapDispatchToProps )(AddEntry)


const styles= StyleSheet.create({
	container:{
		flex: 1,
		padding: 20,
		backgroundColor: white,

	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
	 },
	androidSubmitBtn: {
		backgroundColor: red,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		borderRadius: 2,
		height: 45,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center'

	},
	BtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	row:{
		flexDirection:'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',

	},
	center:{
		flexDirection:'column',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 30,
		marginLeft: 30,

	},
	iosResetBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
	 },
	androidResetBtn: {
		backgroundColor: red,
		margin: 10,
		padding: 5,
		paddingLeft: 30,
		paddingRight: 30,
		borderRadius: 2,
		height: 45,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center'

	},
	

})