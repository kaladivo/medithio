// @flow

import {NativeModules} from 'react-native'

const {NumberPickerDialogModule} = NativeModules

export default {
	/**
	 *
	 * @param beforeSelected
	 * @param afterSelected
	 * @param title
	 * @param submitText
	 * @param cancelText
	 * @param max
	 * @param defaultValue
	 * @returns {Promise<*>} selected number or null if user canceled dialog
	 */
	async show({
				   beforeSelected,
				   afterSelected,
				   title,
				   submitText,
				   cancelText,
				   max,
				   min = 0,
				   defaultValue,
			   }: {
		beforeSelected: string,
		afterSelected: string,
		title: string,
		submitText: string,
		cancelText: string,
		max: number,
		min?: number,
		defaultValue: number
	}): Promise<?Number> {
		return await NumberPickerDialogModule.show(
			beforeSelected,
			afterSelected,
			title,
			submitText,
			cancelText,
			max,
			min,
			defaultValue)
	},
}
