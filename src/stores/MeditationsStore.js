// @flow

import {AsyncStorage} from 'react-native'
import {action, computed, observable} from 'mobx'
import MeditationRecord from '../models/MeditationRecord'

export default class MeditationsStore {
	_rawMeditations: any
	_realm: any
	@observable meditations: Array<MeditationRecord> = []
	@observable loaded: boolean

	init = (realm: any) => {
		this._realm = realm
		this._rawMeditations = realm.objects('MeditationRecord').sorted('startedAt', true)
		this._updateMeditations(this._rawMeditations)

		this._rawMeditations.addListener(this._updateMeditations)
	}

	close = () => {
		this._rawMeditations.removeListener(this._updateMeditations)
	}

	_updateMeditations = (rawMeditations: Array<any>) => {
		this._setMeditations(rawMeditations.map((one) => MeditationRecord.fromRaw(one)))
	}

	@action _setMeditations = (meditations: Array<MeditationRecord>) => {
		this.meditations = meditations
	}

	@action addMeditation = (meditation: MeditationRecord) => {
		this._realm.write(() => {
			this._realm.create('MeditationRecord', meditation)
		})
	}

	//$FlowFixMe
	@computed get allStreaks() {
		const streaks = []

		let currentStreak = 0
		let lastDate = new Date

		for (const meditation of this.meditations) {
			if (lastDate.getTime() - meditation.startedAt.getTime() < 24 * 60 * 1000) currentStreak++
			else {
				streaks.push(currentStreak)
				currentStreak = 1
			}
			lastDate = meditation.startedAt
		}

		streaks.push(currentStreak)

		return streaks
	}

	//$FlowFixMe
	@computed get currentStreak() {
		return this.allStreaks.length ? this.allStreaks[0] : 0
	}

	//$FlowFixMe
	@computed get longestStreak() {
		return this.allStreaks.reduce((biggest, current) => current > biggest ? current : biggest, 0)
	}

	//$FlowFixMe
	@computed get totalMeditations() {
		return this.meditations.length
	}

	//$FlowFixMe
	@computed get totalMeditatedSec() {
		return this.meditations.reduce((sum, meditation) => sum + meditation.durationSec, 0)
	}
}