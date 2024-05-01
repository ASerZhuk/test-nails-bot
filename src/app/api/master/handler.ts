import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/app/libs/dbConnect'
import Masters, { IMasters } from '@/app/models/Master'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await dbConnect()
	try {
		const master: IMasters | null = await Masters.findOne({})
		res.status(200).json(master)
	} catch (error) {
		console.error('Failed to fetch master:', error)
		res.status(500).json({ error: 'Failed to fetch master' })
	}
}
