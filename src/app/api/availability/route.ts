import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const body = await request.json()
	const { date, userId } = body

	if (!date || !userId) {
		return NextResponse.error()
	}

	const master = await prisma.master.findMany({
		where: {
			userId: userId,
		},
	})

	const timings = master.map(timing => timing.slotTime)
	const resultTimings = timings.flat()

	const reservation = await prisma.reservation.findMany({
		where: {
			masterId: userId,
			date: date,
		},
	})

	const bookedTimes = reservation.map(reservation => reservation.time)
	const resultbookedTimes = bookedTimes.flat()

	const times = resultTimings.filter(item => !resultbookedTimes.includes(item))

	if (times.length === 0) {
		return NextResponse.json(resultTimings)
	} else {
		return NextResponse.json(times)
	}
}
