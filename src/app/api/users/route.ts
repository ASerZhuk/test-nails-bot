import User from '@/app/models/User'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const body = await request.json()
	const { tg_id } = body

	const user = await User.findOne({
		userId: tg_id.toString(),
	})
	return NextResponse.json(user)
}
