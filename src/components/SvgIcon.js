//@flow 

import React from 'react'
import {View} from 'react-native'
import Svg from 'react-native-svg-uri'

import pencilSource from '../assets/svgIcons/pencil'

const SOURCES = {
	pencil: pencilSource,
}

type Props = {
	iconName: string
} & any

export default class SvgIcon extends React.Component<Props> {
	render() {
		const {iconName, style, ...rest} = this.props
		const icon = SOURCES[iconName]
		return <View style={style}>
			<Svg {...rest} svgXmlData={icon}/>
		</View>
	}
}
