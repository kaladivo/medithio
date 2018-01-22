//@flow 

import React from 'react'

import Touchable from './Touchable'
import Text from './Text'
import {COLORS} from '../../styles/styles'

type Props = {
	onPress: () => void,
	title: string,
	uppercase?: boolean,
	textStyle: any //TODO better typing
} & any; //TODO better typing

export default class Button extends React.Component<Props> {
	render() {
		const {title, style, textStyle, ...props} = this.props

		const defaultStyle = {
			paddingVertical: 15,
			paddingHorizontal: 50,
			backgroundColor: COLORS.BLUE,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}
		const defaultTextStyle = {textAlign: 'center', fontSize: 13, fontWeight: 'bold'}

		return <Touchable {...props} style={[defaultStyle, style]}>
			<Text style={[defaultTextStyle, textStyle]}>
				{title.toUpperCase()}
			</Text>
		</Touchable>
	}
}