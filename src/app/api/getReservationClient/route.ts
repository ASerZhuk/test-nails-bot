import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const userId = request.url.split('?')[1]?.split('=')[1]

	if (!userId) {
		return NextResponse.error()
	}

	const reservations = await prisma.reservation.findMany({
		where: {
			userId: userId.toString(),
		},
	})

	return NextResponse.json(reservations)
}
