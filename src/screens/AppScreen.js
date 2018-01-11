//@flow 

import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {StackNavigator} from 'react-navigation'

import HomeScreen from './HomeScreen'
import MeditationScreen from './MeditationScreen'

type Props = {}

const AppStack = StackNavigator({
	Home: {
		screen: HomeScreen,
	},
	Meditation: {
		screen: MeditationScreen,
	},
})

export default class AppScreen extends React.Component<Props> {
	render() {
		return <AppStack/>
	}
}