import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'

import getCurrentMaster from '@/app/actions/getMaster'

function generateTimeSlots(
	startTime: string,
	endTime: string,
	interval: number
) {
	const timeSlots = []
	let currentTime = new Date()
	currentTime.setHours(parseInt(startTime.split(':')[0]))
	currentTime.setMinutes(parseInt(startTime.split(':')[1]))

	const end = new Date()
	end.setHours(parseInt(endTime.split(':')[0]))
	end.setMinutes(parseInt(endTime.split(':')[1]))

	while (currentTime <= end) {
		timeSlots.push(
			currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		)
		currentTime.setMinutes(currentTime.getMinutes() + interval)
	}

	return timeSlots
}

export async function POST(request: Request) {
	const currentMaster = await getCurrentMaster()

	if (!currentMaster) {
		return NextResponse.error()
	}

	const body = await request.json()
	const {
		firstName,
		lastName,
		category,
		startTime,
		endTime,
		interval,
		price,
		image,
		selectedDays,
		phone,
	} = body

	Object.keys(body).forEach((value: any) => {
		if (!body[value]) {
			NextResponse.error()
		}
	})

	const slotTime = generateTimeSlots(startTime, endTime, interval)

	const master = await prisma.master.update({
		where: {
			id: currentMaster.id,
		},
		data: {
			firstName: firstName,
			lastName: lastName,
			category: category,
			startTime: startTime,
			endTime: endTime,
			interval: interval,
			price: price,
			slotTime: slotTime,
			image: image,
			disDays: selectedDays,
			phone: phone,
		},
	})
	return NextResponse.json(master)
}
