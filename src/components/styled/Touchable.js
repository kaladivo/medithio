//@flow 

import React from 'react'
import {
	Platform,
	TouchableNativeFeedback,
	TouchableOpacity,
	View,
	Text,
} from 'react-native'


const ANDROID_VERSION_LOLLIPOP = 21

type Props = {
	onPress: () => void,
	pressColor?: string,
	delayPress?: number
} & any  // TODO better types

export default class Touchable extends React.Component <Props> {
	static defaultProps = {
		pressColor: 'rgba(0, 0, 0, .32)',
		borderless: false,
		delayPress: 50,
	}

	onPress = () => {
		setTimeout(this.props.onPress, this.props.delayPress)
	}

	render() {
		if (
			Platform.OS === 'android' &&
			Platform.Version >= ANDROID_VERSION_LOLLIPOP
		) {
			const {style, children, pressColor, borderless, ...rest} = this.props
			return <TouchableNativeFeedback
				{...rest}
				onPress={this.onPress}
				style={null}
				background={TouchableNativeFeedback.Ripple(
					pressColor,
					borderless,
				)}
			>
				<View style={style}>{React.Children.only(children)}</View>
			</TouchableNativeFeedback>
		}

		return <TouchableOpacity {...this.props} onPress={this.props.onPress}>{this.props.children}</TouchableOpacity>
	}
}