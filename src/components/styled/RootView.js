//@flow 

import React from 'react'
import {View} from 'react-native'
import {COLORS, SPACES} from '../../styles/styles'

type Props = {} & any //TODO better types

export default class RootView extends React.Component<Props> {
	render() {
		const {style, children, ...props} = this.props
		const defaultStyles = {
			paddingVertical: SPACES.ROOT_PADDING_VERTICAL,
			paddingHorizontal: SPACES.ROOT_PADDING_HORIZONTAL,
			backgroundColor: COLORS.DARK_BLACK,
		}

		return <View {...props} style={[defaultStyles, style]}>
			{children}
		</View>
	}
} 
