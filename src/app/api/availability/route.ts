import Masters from '@/app/models/Masters'
import Reservation from '@/app/models/Reservation'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const body = await request.json()
	const { date, userId } = body

	if (!date || !userId) {
		return NextResponse.error()
	}

	const master = await Masters.find({
		userId: userId,
	})

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

	const times = resultTimings.filter(
		(item: any) => !resultbookedTimes.includes(item)
	)

	if (times.length === 0) {
		return NextResponse.json(resultTimings)
	} else {
		return NextResponse.json(times)
	}
}
