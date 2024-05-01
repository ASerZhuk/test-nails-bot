import dbConnect from '@/app/libs/dbConnect'
import Masters from '@/app/models/Master'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const master = await Masters.findOne({})
	return NextResponse.json(master)
}
