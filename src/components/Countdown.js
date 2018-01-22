//@flow 

import React from 'react'
import {View, StyleSheet} from 'react-native'

import FloatingWaves from './FloatingWaves'
import {Text} from './StyledComponents'
import {COLORS} from '../styles/styles'

type Props = {
	target: Date,
	start: Date,
	onFinish: () => any
}

type State = {
	secLeft: number,
}

export default class Countdown extends React.Component<Props, State> {
	intervalId: ?number = null
	totalSeconds: number

	constructor(props: Props) {
		super(props)

		const {target, start} = this.props
		this.state = {secLeft: Math.round((target.getTime() - Date.now()) / 1000)}

		this.totalSeconds = (target.getTime() - start.getTime()) / 1000
	}

	componentDidMount() {
		this.intervalId = setInterval(this.tick, 100)
	}

	componentWillUnmount() {
		if (this.intervalId) clearInterval(this.intervalId)
	}

	tick = () => {
		const now = Date.now()
		const {target, onFinish} = this.props

		if (now >= target.getTime()) {
			this.setState({secLeft: 0})
			onFinish()
			return
		}

		this.setState({secLeft: Math.round((target.getTime() - now) / 1000)})
	}

	addZeroIfOneDigit = (number: number) => {
		if (number <= 9 && number >= -9) return '0' + number
		return number
	}

	render() {
		const {totalSeconds} = this
		const {secLeft} = this.state

		const minutes = Math.floor(secLeft / 60)
		const seconds = this.addZeroIfOneDigit(secLeft % 60)

		const progress = Math.round((secLeft / totalSeconds) * 100)

		return <View style={styles.outer}>
			<View style={styles.inner}>
				<Text style={styles.time}>{minutes}:{seconds}</Text>
				<FloatingWaves style={[styles.fill, {top: progress + '%'}]} maxHeight={250}/>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	outer: {
		width: 250,
		height: 250,
		backgroundColor: COLORS.TIMER_BLACK,
		borderRadius: 125,
		padding: 15,
	},
	inner: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.TIMER_DARK_BLUE,
		borderRadius: 125, //make round. It does not matter if the value is bigger than height...
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	fill: {
		position: 'absolute',
		// backgroundColor: COLORS.BLUE,
		bottom: 0,
		left: 0,
		right: 0,
		top: '100%',
	},
	time: {
		zIndex: 2,
		fontSize: 40,
		fontWeight: 'bold',
	},
})

