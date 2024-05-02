import Reservation from '@/app/models/Reservation'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const masterId = url.searchParams.get('masterId')
	console.log(masterId)

	if (!masterId) {
		return NextResponse.error()
	}

	try {
		const reservations = await Reservation.find({
			masterId: masterId.toString(),
		})
		return NextResponse.json(reservations)
	} catch (error) {
		console.error('Failed to fetch reservations:', error)
		return NextResponse.error()
	}
}
