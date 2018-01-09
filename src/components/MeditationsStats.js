//@flow 

import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {observer} from 'mobx-react'

import appStore from '../stores/appStore'

type Props = {}


//$FlowFixMe
@observer
export default class MeditationsStats extends React.Component<Props> {
	meditationsStore = appStore.meditationsStore

	render() {
		const {totalMeditatedSec, currentStreak, longestStreak, totalMeditations} = this.meditationsStore
		return <View style={styles.container}>
			<Text style={styles.centerText}>Celkem nameditováno: {Math.floor(totalMeditatedSec / 60)}min</Text>
			<Text style={styles.centerText}>Aktuální steak: {String(currentStreak)}</Text>
			<Text style={styles.centerText}>Nejdelší steak: {String(longestStreak)}</Text>
			<Text style={styles.centerText}>Celkem meditací: {String(totalMeditations)}</Text>
			{/*<Text>{JSON.stringify(this.meditationsStore.meditations, null, 2)}</Text>*/}
		</View>
	}
}

const styles = StyleSheet.create({
	container: {},
	centerText: {
		textAlign: 'center',
	},
})