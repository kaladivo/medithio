//@flow 

import React from 'react'
import {Text, View, Button, StyleSheet} from 'react-native'

type Props = {
	target: Date,
	onFinish: () => any
}

type State = {
	secLeft: number,
}

export default class Countdown extends React.Component<Props, State> {
	intervalId: ?number = null

	constructor(props: Props) {
		super(props)

		const {target} = this.props
		this.state = {secLeft: Math.round((target.getTime() - Date.now()) / 1000)}
	}

	componentDidMount() {
		this.intervalId = setInterval(this.tick, 1000)
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
		const {secLeft} = this.state
		const minutes = Math.floor(secLeft / 60)
		const seconds = this.addZeroIfOneDigit(secLeft % 60)
		return <Text style={styles.time}>{minutes}:{seconds}</Text>
	}
}

const styles = StyleSheet.create({
	time: {
		fontSize: 50,
	},
})

