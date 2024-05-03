import dbConnect from '@/app/libs/dbConnect'
import Reservation from '@/app/models/Reservation'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect()
	if (req.method === 'GET') {
		await dbConnect()
		try {
			const { userId } = req.query
			const id = userId?.toString()
			console.log(id)

			const reservations = await Reservation.find({
				userId: id,
			})
			return res.status(200).json(reservations)
		} catch (error) {
			console.error('Failed to fetch reservations:', error)
			return res.status(500).json({ error: 'Failed to fetch reservations' })
		}
	} else {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}
}
