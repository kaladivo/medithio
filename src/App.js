import React from 'react'
import Realm from 'realm'
import {observer} from 'mobx-react'

import realmModels from './models/realm'
import appStore from './stores/appStore'
import LoadingScreen from './screens/LoadingScreen'
import AppScreen from './screens/AppScreen'

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
		if (appStore.loading) return <LoadingScreen/>
		return <AppScreen/>
	}
}

export default observer(App)