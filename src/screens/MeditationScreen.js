//@flow 

import React from 'react'
import {View, Button, StyleSheet} from 'react-native'
import {observer} from 'mobx-react'
import {autorun} from 'mobx'

import Countdown from '../components/Countdown'
import appStore from '../stores/appStore'
import MeditationRecord from '../models/MeditationRecord'
import meditationService from '../nativeModules/meditationService'

import type {MeditationType} from '../nativeModules/meditationService'

type Props = {}

//$FlowFixMe
@observer
export default class MeditationScreen extends React.Component<Props> {
	//$FlowFixMe
	navigation = this.props.navigation
	disposeAutorun = () => null


	componentDidMount() {
		this.disposeAutorun = autorun(() => {
			//$FlowFixMe
			if (!meditationService.meditationRunning) this.onEnd(meditationService.currentMeditation)
		})
	}

	componentWillUnmount() {
		this.disposeAutorun()
	}

	stop = () => {
		meditationService.stopMeditation()
	}

	onEnd = (meditation: MeditationType) => {

		if (meditation.completed) {
			appStore.meditationsStore.addMeditation(new MeditationRecord({
				startedAt: meditation.startedAt,
				durationSec: meditation.durationSec,
			}))
		}

		this.navigation.goBack()
	}

	render() {
		const currentMeditation = meditationService.currentMeditation
		if (!currentMeditation) return // Should not happen
		
		return <View style={styles.container}>
			<Countdown
				target={new Date(currentMeditation.startedAt.getTime() + currentMeditation.durationSec * 1000)}
				onFinish={() => null}/>
			<Button
				title={'Zastavit'}
				onPress={this.stop}/>
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