//@flow 

import React from 'react'
import {StatusBar} from 'react-native'
import {COLORS} from '../../styles/styles'

type Props = {}

export default class StatusBarStyled extends React.Component<Props> {
	render() {
		return <StatusBar backgroundColor={COLORS.DARKER_BLUE} barStyle={'default'}/>
	}
}