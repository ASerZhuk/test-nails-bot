import dbConnect from '@/app/libs/dbConnect'
import Masters from '@/app/models/Master'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect()
	if (req.method === 'GET') {
		try {
			const master = await Masters.findOne({})
			return res.status(200).json(master)
		} catch (error) {
			console.error('Failed to fetch master:', error)
			return res.status(500).json({ error: 'Failed to fetch master' })
		}
	} else {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}
}
