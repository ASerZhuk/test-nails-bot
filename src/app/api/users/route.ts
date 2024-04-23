import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const body = await request.json()
	const { tg_id } = body

	const user = await prisma.user.findUnique({
		where: {
			userId: tg_id.toString(),
		},
	})
	return NextResponse.json(user)
}
