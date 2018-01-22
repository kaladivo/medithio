//@flow 

import React from 'react'
import {StyleSheet, Keyboard, View, ToastAndroid, AsyncStorage} from 'react-native'
import {autorun} from 'mobx'
import {observer} from 'mobx-react'

import MeditationsStats from '../components/MeditationsStats'
import meditationService from '../nativeModules/meditationService'
import {Section, Button, RootView, Label} from '../components/StyledComponents'
import DurationPicker from '../components/DurationPicker'
import {SPACES} from '../styles/styles'
import strings from '../localization/strings'

const KEY_DURATION = 'selectedMeditationDuration'

type Props = {
	navigation: any
}

type State = {
	selectedDurationMin: number
}

//$FlowFixMe
@observer
export default class HomeScreen extends React.Component<Props, State> {
	state = {selectedDurationMin: 20}
	navigation = this.props.navigation
	disposeAutorun: () => null

	async componentWillMount() {
		const selectedDurationMin = Number(await AsyncStorage.getItem(KEY_DURATION))
		this.setState({selectedDurationMin})
	}

	componentDidMount() {
		this.disposeAutorun = autorun(() => {
			if (meditationService.meditationRunning) this.navigation.navigate('Meditation')
		})
	}

	async componentWillUnmount() {
		this.disposeAutorun()

		const {selectedDurationMin} = this.state
		await AsyncStorage.setItem(KEY_DURATION, selectedDurationMin.toString())
	}

	startMeditation = () => {
		const {selectedDurationMin} = this.state

		Keyboard.dismiss()
		meditationService.startMeditation({
			startedAt: new Date(),
			durationSec: selectedDurationMin * 60,
		})
	}

	onPickDuration = (duration: number) => {
		this.setState({selectedDurationMin: duration})
	}

	render() {
		const {selectedDurationMin} = this.state
		return <RootView style={styles.container}>
			<View style={styles.top}>
				<Label style={styles.label} text={strings.durationPrompt}/>
				<DurationPicker valueMinutes={selectedDurationMin}
								onPicked={this.onPickDuration}/>
			</View>

			<View style={styles.bottom}>
				<MeditationsStats style={styles.stats}/>
				<Button style={styles.button} title={strings.beginMeditation} onPress={this.startMeditation}/>
			</View>
		</RootView>
	}
}

const
	styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column',
		},
		top: {
			flexGrow: 1,
			width: '100%',
		},
		bottom: {
			width: '100%',
			flexGrow: 0,
		},
		label: {
			textAlign: 'center',
		},
		stats: {
			marginBottom: SPACES.SPACE_C,
		},
		button: {
			width: '100%',
		},
	})