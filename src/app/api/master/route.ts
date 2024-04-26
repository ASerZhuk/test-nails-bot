import Masters from '@/app/models/Master'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const user = await Masters.findOne({})
	return NextResponse.json(user)
}
