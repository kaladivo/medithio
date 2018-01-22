//@flow 

import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {observer} from 'mobx-react'


import appStore from '../stores/appStore'
import {Label} from './StyledComponents'
import {COLORS, SPACES} from '../styles/styles'

import longestStreakIcon from '../assets/icons/longest_streak.png'
import streakIcon from '../assets/icons/streak.png'
import timeMeditatedIcon from '../assets/icons/time_meditated.png'

type Props = {
	style?: any
} //TODO better typing


//$FlowFixMe
@observer
export default class MeditationsStats extends React.Component<Props> {
	meditationsStore = appStore.meditationsStore

	render() {
		const {style, ...props} = this.props

		const {totalMeditatedSec, currentStreak, longestStreak, totalMeditations} = this.meditationsStore
		const totalMeditatedText = `${Math.floor(totalMeditatedSec / 60)} min`
		const currentStreakText = String(currentStreak)
		const longestStreakText = String(longestStreak)
		const totalMeditationsText = String(totalMeditations) //TODO add to stats

		return <View {...props} style={[style, styles.container]}>
			<View style={styles.itemContainer}>
				<Label style={styles.valueLabel} text={totalMeditatedText}/>
				<Image style={styles.icon} source={timeMeditatedIcon}/>
				<Label style={styles.descriptiveLabel} text={'Time meditated'}/>
			</View>
			<View style={styles.itemContainer}>
				<Label style={styles.valueLabel} text={currentStreakText}/>
				<Image style={styles.icon} source={streakIcon}/>
				<Label style={styles.descriptiveLabel} text={'Streak'}/>
			</View>
			<View style={styles.itemContainer}>
				<Label style={styles.valueLabel} text={longestStreakText}/>
				<Image style={styles.icon} source={longestStreakIcon}/>
				<Label style={styles.descriptiveLabel} text={'Longest streak'}/>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
	},
	valueLabel: {
		color: COLORS.TEXT_COLOR,
		fontSize: 13,
	},
	icon: {
		marginVertical: SPACES.SPACE_B,
		height: 50,
		resizeMode: Image.resizeMode.contain,
	},
	centerText: {
		textAlign: 'center',
	},
	itemContainer: {
		display: 'flex',
		alignItems: 'center',
		flexGrow: 1,
	},
	descriptiveLabel: {},
})