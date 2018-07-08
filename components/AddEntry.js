import React, {Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo , timeToString } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { Ionicons } from '@expo/vector-icons'


export default class AddEntry extends Component {

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

		// update Redux

		this.setState(() =>({
			run:0,
			bike: 0,
			swim:0,
			sleep:0,
			eat:0,
		}))

		//Navigate to home

		// Clear local notification
	}

	reset = () => {
		const key = timeToString()

		// update Redux

		// route to Home

		// update 'DB'



	}

	render () {
		const metaInfo = getMetricMetaInfo()

		if(this.props.alreadyLogged){
			return (
				<View>
					<Ionicons
						name='ios-happy-outline'
						size={100}
					/>
					<Text>You already logged your infomation for today</Text>

				<TextButton onPress={this.reset}>
					Reset
				</TextButton>

				</View>
			)
		}

		return (			
			<View>
				<DateHeader
					date= {(new Date()).toLocaleDateString()}
				/>
				<Text>{JSON.stringify(this.state)}</Text>
				{Object.keys(metaInfo).map((key)=>{	
					const { getIcon, type, ...rest} = metaInfo[key]
					const value = this.state[key]

					return (
						<View key={key}>
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
				<TextButton onPress={this.submit}>
					Submit
				</TextButton>
				
			</View>
		)
	}
}