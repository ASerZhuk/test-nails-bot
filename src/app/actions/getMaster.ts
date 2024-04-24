import Master from '../../app/models/Master'

export default async function getMaster() {
	try {
		const currentMaster = await Master.findOne()
		return currentMaster
	} catch (error) {
		console.error('Ошибка при получении мастера:', error)
		return null //
	}
}
