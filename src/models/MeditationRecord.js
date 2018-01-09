// @flow

export default class MeditationRecord {
	startedAt: Date
	durationSec: number

	constructor({startedAt, durationSec}: { startedAt: Date, durationSec: number }) {
		this.startedAt = startedAt
		this.durationSec = durationSec
	}

	static fromRaw = (rawObject) => {
		const {startedAt, durationSec} = rawObject

		return new MeditationRecord({startedAt, durationSec})
	}
}

export const RealmSchema = {
	name: 'MeditationRecord',
	properties: {
		startedAt: 'date',
		durationSec: 'int',
	},
}