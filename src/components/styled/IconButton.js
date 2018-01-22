//@flow 

import React from 'react'
import {StyleSheet} from 'react-native'

import SvgIcon from '../SvgIcon'
import Touchable from './Touchable'
import {COLORS} from '../../styles/styles'

type Props = {
	onPress: () => void,
	iconName: string
} & any //TODO better types

export default class IconButton extends React.Component<Props> {
	render() {
		const {style, iconStyle, iconWidth, iconHeight, iconName, onPress, ...props} = this.props

		const defaultStyle = {
			backgroundColor: COLORS.BLUE,
			padding: 10,
			justifyContent: 'center',
			alignItems: 'center',
		}
		const defaultIconStyle = {}

		// SvgIcon does not support style array
		return <Touchable style={[defaultStyle, style]} onPress={onPress} {...props}>
			<SvgIcon
				width={iconWidth}
				height={iconHeight}
				style={{...defaultIconStyle, ...iconStyle}}
				iconName={iconName}/>
		</Touchable>
	}
}