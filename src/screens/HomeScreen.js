//@flow 

import React from 'react'
import {View, StyleSheet, Text, Button, TextInput, Keyboard, ToastAndroid} from 'react-native'
import MeditationsStats from '../components/MeditationsStats'

type Props = {
	navigation: any
}

type State = {
	selectedDurationMin: number | ''
}

export default class HomeScreen extends React.Component<Props, State> {
	state = {selectedDurationMin: 20}

	startMeditation = () => {
		const {navigation} = this.props
		const {selectedDurationMin} = this.state

		if (selectedDurationMin === '') {
			ToastAndroid.show('Musíš vybrat čas maštáku.', ToastAndroid.SHORT)
			return
		}

		Keyboard.dismiss()
		navigation.navigate('Meditation', {selectedDurationMin})
	}

	onSelectTime = (text: string) => {
		if (text === '') return this.setState({selectedDurationMin: ''})

		try {
			const number = Math.floor(Number(text))
			this.setState({selectedDurationMin: number})
		} catch (err) {
			console.log(text + ' is not a number')
		}
	}

	render() {
		const {selectedDurationMin} = this.state
		return <View style={styles.container}>
			<Text>Kolik minut chceš meditovat G?</Text>
			<TextInput value={selectedDurationMin + ''} onChangeText={this.onSelectTime} keyboardType={'phone-pad'}/>
			<Button title={'Začít meditaci'} onPress={this.startMeditation}/>
			<MeditationsStats/>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})