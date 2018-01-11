// @flow

import {NativeModules, DeviceEventEmitter} from 'react-native'
import {observable, action, computed} from 'mobx'

export type MeditationType = {
	startedAt: Date,
	durationSec: number,
	completed: boolean,
	ended: boolean
}

type RawMeditation = {
	startedAtMilisec: number,
	durationSec: number,
	completed: boolean,
	ended: boolean
}


const MedithioServiceModule = NativeModules.MeditationServiceModule

class MeditationService {
	@observable currentMeditation: ?MeditationType

	constructor() {
		MedithioServiceModule.getCurrentMeditation().then(rawMeditation =>
			this.currentMeditation = rawMeditation ? this._rawMeditationToMeditation(rawMeditation) : null,
		)

		DeviceEventEmitter.addListener(MedithioServiceModule.EVENT_STATE_CHANGED, e => {
			const {startedAtMilisec, durationSec, completed, ended} = e

			this._setCurrentMeditation(this._rawMeditationToMeditation({
				startedAtMilisec, durationSec, completed, ended,
			}))
		})
	}

	@action _setCurrentMeditation = (meditation: MeditationType) => {
		this.currentMeditation = meditation
	}

	//$FlowFixMe
	@computed get meditationEnded() {
		return this.currentMeditation && this.currentMeditation.ended
	}

	//$FlowFixMe
	@computed get meditationRunning() {
		return this.currentMeditation && !this.meditationEnded
	}

	@action startMeditation = ({startedAt, durationSec}: { startedAt: Date, durationSec: number }) => {
		//Put this here, until the promise is fulfilled.
		this.currentMeditation = {startedAt, durationSec, completed: false, ended: false}

		MedithioServiceModule.startMeditation(String(startedAt.getTime()), durationSec)
			.then((rawMeditation) => {
				const {startedAtMilisec, durationSec, completed, ended} = rawMeditation

				this._setCurrentMeditation(
					this._rawMeditationToMeditation({startedAtMilisec, durationSec, completed, ended}),
				)
			})
	}

	stopMeditation = () => {
		MedithioServiceModule.stopMeditation()
	}

	_rawMeditationToMeditation = ({startedAtMilisec, durationSec, completed, ended}: RawMeditation): MeditationType => {
		const startedAt = new Date()
		startedAt.setTime(startedAtMilisec)

		return {startedAt, durationSec, completed, ended}
	}
}

export default new MeditationService()