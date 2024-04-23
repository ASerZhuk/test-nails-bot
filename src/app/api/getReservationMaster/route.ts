import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const masterId = request.url.split('?')[1]?.split('=')[1]

	if (!masterId) {
		return NextResponse.error()
	}

	const reservations = await prisma.reservation.findMany({
		where: {
			masterId: masterId.toString(),
		},
	})

	return NextResponse.json(reservations)
}
