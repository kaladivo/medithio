//@flow 

import React from 'react'
import Text from './Text'
import {COLORS, SPACES} from '../../styles/styles'


export default class Label extends React.Component<any> { // TODO better typing
	render() {
		const {text, style, ...props} = this.props
		const defaultStyle = {
			fontWeight: 'bold',
			marginBottom: SPACES.SPACE_A,
			fontSize: 11,
			color: COLORS.TEXT_GRAY,
		}

		return <Text {...props} style={[defaultStyle, style]}>
			{text.toUpperCase()}
		</Text>
	}
}