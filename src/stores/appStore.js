// @flow

import {observable, action, computed} from 'mobx'

import MeditationsStore from './MeditationsStore'

export class AppStore {
	@observable realm: any

	@observable meditationsStore: MeditationsStore

	constructor() {
		this.meditationsStore = new MeditationsStore()
	}

	init = (realm: any) => {
		this._setRealm(realm)

		this.meditationsStore.init(realm)
	}

	close = () => {
		this.meditationsStore.close()
	}

	@action _setRealm = (realm: any) => {
		this.realm = realm
	}

	//$FlowFixMe
	@computed get loading() {
		return !this.realm
			&& !this.meditationsStore.loaded
	}
}

export default new AppStore