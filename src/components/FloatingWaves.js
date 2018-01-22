//@flow 

import React from 'react'
import {View, StyleSheet} from 'react-native'

import bigWaveSource from '../assets/images/big_wave.png'
import mediumWaveSource from '../assets/images/medium_wave.png'
import smallWaveSource from '../assets/images/small_wave.png'
import Image from './LocalAutoResizeImage'

type Props = {
	maxHeight: number
} & any //TODO better types

type State = {
	timeElapsed: number
}

const UPDATE_INTERVAL_MILISEC = 1000 / 24

const LAYER_MOVEMENT = [
	{period: 2800, startAt: 1},
	{period: 2700, startAt: -.75},
	{period: 3000, startAt: .75},
]

export default class FloatingWaves extends React.Component<Props, State> {
	intervalId = null
	started = Date.now()
	state = {
		timeElapsed: 0,
	}

	componentDidMount() {
		this.intervalId = setInterval(() => {
			this.setState({timeElapsed: Date.now() - this.started})
		}, UPDATE_INTERVAL_MILISEC)
	}

	componentWillUnmount() {
		if (this.intervalId) clearInterval(this.intervalId)
	}

	calculateOffsetsPercent = (timeElapsed: number): Array<number> => {
		return LAYER_MOVEMENT.map(({period, startAt}) => Math.sin(((timeElapsed + (period / 2) * startAt) * Math.PI) / (period * 2)) * 50 - 75)
	}

	render() {
		const {style, maxHeight} = this.props
		const {layer1, layer2, layer3} = style

		const offsets = this.calculateOffsetsPercent(this.state.timeElapsed)

		return <View style={style} {...this.props}>
			<Image
				style={[styles.layer, {left: Math.round(offsets[0]) + '%'}]}
				height={maxHeight}
				source={bigWaveSource}/>
			<Image
				style={[styles.layer, {left: Math.round(offsets[1]) + '%'}]}
				height={maxHeight}
				source={mediumWaveSource}/>
			<Image
				style={[styles.layer, {left: Math.round(offsets[2]) + '%'}]}
				height={maxHeight}
				source={smallWaveSource}/>
		</View>
	}
}

const
	styles = StyleSheet.create({
		layer: {
			left: '0%',
			top: '-10%',
			position: 'absolute',
		},
	})