import Masters from '../models/Master'

export default async function getMaster() {
	try {
		const currentMaster = await Masters.findOne().maxTimeMS(3000)
		return currentMaster
	} catch (error) {
		console.error('Ошибка при получении мастера:', error)
		return null
	}
}
