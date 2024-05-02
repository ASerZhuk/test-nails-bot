import Reservation from '@/app/models/Reservation'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const params = new URLSearchParams(request.url.split('?')[1])
	const masterId = params.get('masterId')

	if (!masterId) {
		return NextResponse.error()
	}

	const reservations = await Reservation.find({
		masterId: masterId.toString(),
	})

	return NextResponse.json(reservations)
}
