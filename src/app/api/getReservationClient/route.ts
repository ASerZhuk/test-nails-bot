import Reservation from '@/app/models/Reservation'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const userId = request.url.split('?')[1]?.split('=')[1]

	if (!userId) {
		return NextResponse.error()
	}

	const reservations = await Reservation.find({
		userId: userId.toString(),
	})

	return NextResponse.json(reservations)
}
