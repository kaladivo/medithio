//@flow 

import React from 'react'
import {View, StyleSheet, Alert, BackHandler} from 'react-native'
import {observer} from 'mobx-react'
import {autorun} from 'mobx'
import Icon from 'react-native-vector-icons/Entypo'

import HeaderBackButton from '../components/styled/HeaderBackButton'
import Countdown from '../components/Countdown'
import appStore from '../stores/appStore'
import MeditationRecord from '../models/MeditationRecord'
import meditationService from '../nativeModules/meditationService'
import {RootView, Touchable} from '../components/StyledComponents'
import strings from '../localization/strings'
import {COLORS} from '../styles/styles'

import type {MeditationType} from '../nativeModules/meditationService'

type Props = {}

//$FlowFixMe
@observer
export default class MeditationScreen extends React.Component<Props> {
	static navigationOptions = {
		headerLeft: () => {
			return <HeaderBackButton onPress={showExitAlert}/>
		},
	}

	//$FlowFixMe
	navigation = this.props.navigation
	disposeAutorun = () => null


	componentDidMount() {
		this.disposeAutorun = autorun(() => {
			//$FlowFixMe
			if (!meditationService.meditationRunning) this.onEnd(meditationService.currentMeditation)
		})

		BackHandler.addEventListener('hardwareBackPress', this.onPressBack)
	}

	componentWillUnmount() {
		this.disposeAutorun()

		BackHandler.removeEventListener('hardwareBackPress', this.onPressBack)
	}

	onPressBack = () => {
		showExitAlert()
		return true
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

		return <RootView style={styles.container}>
			<View style={styles.timerContainer}>
				<Countdown
					start={currentMeditation.startedAt}
					target={new Date(currentMeditation.startedAt.getTime() + currentMeditation.durationSec * 1000)}
					onFinish={() => null}/>

			</View>

			<View style={styles.buttonContainer}>
				<Touchable
					style={styles.button}
					onPress={showExitAlert}>
					<Icon name={'cross'} color={COLORS.TEXT_COLOR} size={30}/>
				</Touchable>
			</View>
		</RootView>
	}
}

const showExitAlert = () => {
	Alert.alert(
		strings.areYouSure,
		strings.areYouSureDescription,
		[
			{text: strings.stay, onPress: () => null},
			{text: strings.leave, onPress: () => meditationService.stopMeditation()},
		],
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexGrow: 1,
	},
	timerContainer: {
		display: 'flex',
		flexGrow: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainer: {
		display: 'flex',
		flexGrow: 0,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		width: 50,
		height: 50,
		paddingVertical: 0,
		paddingHorizontal: 0,
		borderRadius: 1000,
		backgroundColor: COLORS.BLUE,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
})