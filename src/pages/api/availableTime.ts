import Masters from '@/app/models/Master'
import Reservation from '@/app/models/Reservation'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { date, userId } = req.body

		if (!date || !userId) {
			return res.status(400).json({ error: 'Date and userId are required' })
		}

		try {
			const master = await Masters.find({ userId: userId })
			const timings = master.map((timing: { slotTime: any }) => timing.slotTime)
			const resultTimings = timings.flat()

			const reservation = await Reservation.find({
				masterId: userId,
				date: date,
			})
			const bookedTimes = reservation.map(
				(reservation: { time: any }) => reservation.time
			)
			const resultbookedTimes = bookedTimes.flat()

			const availableTimes = resultTimings.filter(
				(time: any) => !resultbookedTimes.includes(time)
			)

			return res.status(200).json(availableTimes)
		} catch (error) {
			console.error('Error fetching available times:', error)
			return res.status(500).json({ error: 'Failed to fetch available times' })
		}
	} else {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}
}
