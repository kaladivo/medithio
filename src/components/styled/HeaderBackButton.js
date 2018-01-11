//@flow 

import React from 'react'
import {HeaderBackButton} from 'react-navigation'

import {COLORS} from '../../styles/styles'

export default class StyledHeaderBackButton extends React.Component<any> { //TODO better typing
	render() {
		const props = this.props
		return <HeaderBackButton tintColor={COLORS.TEXT_COLOR} {...props}/>
	}
}