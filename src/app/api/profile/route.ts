import { NextResponse } from 'next/server'
import getCurrentMaster from '@/app/actions/getMaster'
import Masters from '../../models/Masters'

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

		startTime,
		endTime,
		interval,
		price,
		image,
		selectedDays,
		phone,
	} = body

	const requiredFields = [
		firstName,
		lastName,

		startTime,
		endTime,
		interval,
		price,
		image,
		selectedDays,
		phone,
	]
	if (requiredFields.some(field => !field)) {
		return NextResponse.error()
	}

	const slotTime = generateTimeSlots(startTime, endTime, interval)

	try {
		const updatedMaster = await Masters.findByIdAndUpdate(
			currentMaster._id,
			{
				firstName: firstName,
				lastName: lastName,

				startTime: startTime,
				endTime: endTime,
				interval: interval,
				price: price,
				slotTime: slotTime,
				image: image,
				disDays: selectedDays,
				phone: phone,
			},
			{ new: true }
		)

		return NextResponse.json(updatedMaster)
	} catch (error) {
		console.error('Ошибка при обновлении мастера:', error)
		return NextResponse.error()
	}
}
