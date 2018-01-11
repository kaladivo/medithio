import React from 'react'
import Realm from 'realm'
import {observer} from 'mobx-react'
import {View} from 'react-native'

import realmModels from './models/realm'
import appStore from './stores/appStore'
import LoadingScreen from './screens/LoadingScreen'
import AppScreen from './screens/AppScreen'
import {COLORS} from './styles/styles'
import StatusBar from './components/styled/StatusBar'

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

class App extends React.Component<{}> {
	async componentDidMount() {
		Realm.open({schema: realmModels}).then((realm) => {
			appStore.init(realm)
		})	//TODO handle errors
	}

	componentWillUnmount() {
		appStore.close()
	}

	render() {
		return <View style={{flex: 1}}>
			<StatusBar/>
			{appStore.loading ? <LoadingScreen/> : <AppScreen/>}
		</View>
	}
}

export default observer(App)