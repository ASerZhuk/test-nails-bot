import Reservation from '@/app/models/Reservation'
import { NextResponse } from 'next/server'
import { NextApiRequest } from 'next'

export default async function handler(request: NextApiRequest) {
	if (request.method !== 'GET') {
		return NextResponse.error()
	}

	const url = new URL(request.url || '', process.env.NEXT_PUBLIC_API_BASE_URL)
	const masterId = url.searchParams.get('masterId')

	if (!masterId) {
		return NextResponse.error()
	}

	try {
		const id = masterId.toString()
		const reservations = await Reservation.findOne({})
		return NextResponse.json(reservations)
	} catch (error) {
		console.error('Failed to fetch reservations:', error)
		return NextResponse.error()
	}
}
