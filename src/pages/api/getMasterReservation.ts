import dbConnect from '@/app/libs/dbConnect'
import Reservation from '@/app/models/Reservation'
import { NextResponse } from 'next/server'

export default async function handler(request: Request) {
	await dbConnect()
	const masterId = request.url.split('?')[1]?.split('=')[1]

	if (!masterId) {
		return NextResponse.error()
	}

	const reservations = await Reservation.find({
		masterId: masterId.toString(),
	})

	return NextResponse.json(reservations)
}
