//@flow 

import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {StackNavigator} from 'react-navigation'

import HomeScreen from './HomeScreen'
import MeditationScreen from './MeditationScreen'
import {COLORS} from '../styles/styles'

type Props = {}

const AppStack = StackNavigator({
	Home: {
		screen: HomeScreen,
	},
	Meditation: {
		screen: MeditationScreen,
	},
}, {
	headerMode: 'screen',
	navigationOptions: {
		title: 'Medithio',
		headerStyle: {backgroundColor: COLORS.BLUE},
		headerTitleStyle: {color: COLORS.TEXT_COLOR, alignSelf: 'center'},
		headerLeft: <View/>,
		headerRight: <View/>,
	},
})

export default class AppScreen extends React.Component<Props> {
	render() {
		return <AppStack/>
	}
}