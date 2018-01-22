//@flow 

import React from 'react'
import {View, StyleSheet} from 'react-native'

import {Section, Text, IconButton} from './StyledComponents'
import NumberPickerDialog from '../nativeModules/NumberPickerDialog'
import strings from '../localization/strings'

type Props = {
	valueMinutes: number,
	onPicked: (number: number) => void
} & any //TODO better types

export default class DurationPicker extends React.Component<Props> {

	displayPickerDialog = () => {
		NumberPickerDialog.show({
			beforeSelected: strings.picked + ' ',
			afterSelected: ' ' + strings.minutesShort,
			title: strings.pickDuration,
			submitText: strings.submit,
			cancelText: strings.cancel,
			max: 99,
			min: 1,
			defaultValue: this.props.valueMinutes,
		}).then(selected => {
			if (!selected) return //User canceled

			this.props.onPicked(selected)
		})
	}

	render() {
		const {valueMinutes} = this.props

		return <Section>
			<View style={styles.inner}>
				<Text style={styles.text}>{valueMinutes} min</Text>
				<View style={styles.buttonContainer}>
					<IconButton onPress={this.displayPickerDialog} style={styles.button} iconName={'pencil'}/>
				</View>
			</View>
		</Section>
	}
}

const styles = StyleSheet.create({
	inner: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		position: 'relative',
	},

	text: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	buttonContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		display: 'flex',
		justifyContent: 'center',
	},
	button: {
		width: 40,
		height: 40,
		borderRadius: 40 //Make it circle
	},
})
