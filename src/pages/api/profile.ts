import { NextApiResponse, NextApiRequest } from 'next'
import getCurrentMaster from '@/app/actions/getMaster'

import { format } from 'date-fns'
import Masters from '@/app/models/Master'

function generateTimeSlots(
	startTime: string,
	endTime: string,
	interval: number
) {
	const timeSlots = []
	let currentTime = new Date()
	currentTime.setHours(parseInt(startTime.split(':')[0]))
	currentTime.setMinutes(parseInt(startTime.split(':')[1]))

	const end = new Date()
	end.setHours(parseInt(endTime.split(':')[0]))
	end.setMinutes(parseInt(endTime.split(':')[1]))

	while (currentTime <= end) {
		timeSlots.push(format(currentTime, 'HH:mm'))
		currentTime.setMinutes(currentTime.getMinutes() + interval)
	}

	return timeSlots
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const currentMaster = await getCurrentMaster()

	if (!currentMaster) {
		return res.status(500).json({ error: 'Failed to get current master' })
	}

	if (req.method === 'POST') {
		const body = req.body
		const {
			firstName,
			lastName,
			startTime,
			endTime,
			interval,
			price,
			image,
			selectedDays,
			phone,
		} = body

		const requiredFields = [
			firstName,
			lastName,
			startTime,
			endTime,
			interval,
			price,
			image,
			selectedDays,
			phone,
		]
		if (requiredFields.some(field => !field)) {
			return res.status(400).json({ error: 'Missing required fields' })
		}

		const slotTime = generateTimeSlots(startTime, endTime, interval)

		try {
			const updatedMaster = await Masters.findByIdAndUpdate(
				currentMaster._id,
				{
					firstName: firstName,
					lastName: lastName,
					startTime: startTime,
					endTime: endTime,
					interval: interval,
					price: price,
					slotTime: slotTime,
					image: image,
					disDays: selectedDays,
					phone: phone,
				},
				{ new: true }
			)

			return res.status(200).json(updatedMaster)
		} catch (error) {
			console.error('Error updating master:', error)
			return res.status(500).json({ error: 'Failed to update master' })
		}
	} else {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}
}
