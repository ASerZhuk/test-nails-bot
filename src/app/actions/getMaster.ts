import dbConnect from '../libs/dbConnect'
import Masters from '../models/Master'

export default async function getMaster() {
	try {
		await dbConnect()
		const currentMaster = await Masters.findOne({})
		const plaincurrentMaster = JSON.parse(JSON.stringify(currentMaster))
		return plaincurrentMaster
	} catch (error) {
		console.error('Ошибка при получении мастера:', error)
		return null
	}
}
