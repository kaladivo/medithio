//@flow 

import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'

import Countdown from '../components/Countdown'
import appStore from '../stores/appStore'
import MeditationRecord from '../models/MeditationRecord'

type Props = {}

export default class MeditationScreen extends React.Component<Props> {
	startedAt = new Date()

	cancel = () => {
		//$FlowFixMe
		const {navigation} = this.props
		navigation.goBack()
	}

	onFinish = () => {
		//$FlowFixMe
		const {selectedDurationMin} = this.props.navigation.state.params
		appStore.meditationsStore.addMeditation(new MeditationRecord({
			startedAt: this.startedAt,
			durationSec: selectedDurationMin * 60,
		}))

		//$FlowFixMe
		const {navigation} = this.props
		navigation.goBack()
	}

	render() {
		//$FlowFixMe
		const {selectedDurationMin} = this.props.navigation.state.params

		return <View style={styles.container}>
			<Countdown
				target={new Date(this.startedAt.getTime() + selectedDurationMin * 60 * 1000)}
				onFinish={this.onFinish}/>
			<Button title={'Cancel'} onPress={this.cancel}/>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})