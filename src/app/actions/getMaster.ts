import Masters from '../models/Master'

export default async function getMaster() {
	try {
		const currentMaster = await Masters.findOne()
		return currentMaster
	} catch (error) {
		console.error('Ошибка при получении мастера:', error)
		return null
	}
}
