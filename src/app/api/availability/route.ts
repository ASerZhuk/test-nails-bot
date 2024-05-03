import Masters from '@/app/models/Master'
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

	const availableTimes = resultTimings.filter(
		(time: any) => !resultbookedTimes.includes(time)
	)

	return NextResponse.json(availableTimes)
}
