import dbConnect from '@/app/libs/dbConnect'

import Reservation from '@/app/models/Reservation'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect()
	if (req.method === 'GET') {
		try {
			const reservations = await Reservation.findOne({})
			return res.status(200).json(reservations)
		} catch (error) {
			console.error('Failed to fetch reservations:', error)
			return res.status(500).json({ error: 'Failed to fetch reservations' })
		}
	} else {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}
}
