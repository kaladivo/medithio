//@flow 

import React from 'react'
import {Text} from 'react-native'
import {COLORS} from '../../styles/styles'

export default class StyledText extends React.Component<any> { //TODO better typing
	render() {
		const {style, children, ...props} = this.props;
		const defaultStyle = {color: COLORS.TEXT_COLOR}

		return <Text {...props} style={[defaultStyle, style]}>
			{children}
		</Text>
	}
}