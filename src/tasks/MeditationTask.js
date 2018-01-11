export default async (taskData) => {
	let counter = 0

	const intervalId = setInterval(() => {
		console.log(`Timer je ${counter++}`)
		if (counter > 10) clearInterval(intervalId)
	}, 1000)
}