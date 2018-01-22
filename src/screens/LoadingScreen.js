//@flow 

import React from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native'

import {RootView} from '../components/StyledComponents'

type Props = {}

export default class LoadingScreen extends React.Component<Props> {
	render() {
		return <RootView style={styles.container}>
			<ActivityIndicator size={'large'} color={'#0000FF'}/>
		</RootView>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
})