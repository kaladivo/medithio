//@flow 

import React from 'react'
import {View} from 'react-native'
import {COLORS, SHADOW_STYLE} from '../../styles/styles'

type Props = {} & any //TODO better types

export default class SectionContainer extends React.Component<Props> {
	render() {
		const {children, style, ...rest} = this.props
		const defaultStyle = {
			backgroundColor: COLORS.LIGHTER_DARK_BLACK,
			paddingVertical: 10,
			paddingHorizontal: 20,
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			...SHADOW_STYLE,
		}

		return <View {...rest} style={[defaultStyle, style]}>
			{children}
		</View>
	}
} 
