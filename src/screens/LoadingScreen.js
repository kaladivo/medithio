//@flow 

import React from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'

type Props = {}

export default class LoadingScreen extends React.Component<Props> {
	render() {
		return <View style={styles.container}>
			<ActivityIndicator size={'large'} color={"#0000FF"}/>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})