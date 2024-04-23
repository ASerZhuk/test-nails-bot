import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import bot from '@/pages/api/bot'

export async function POST(request: Request) {
	const body = await request.json()
	const { masterId, date, times, price, firstName, lastName, phone, userId } =
		body

	const reservation = await prisma.reservation.create({
		data: {
			firstName,
			lastName,
			masterId,
			date,
			time: times,
			price,
			phone,
			userId,
		},
	})

	const master = await prisma.master.findUnique({
		where: {
			userId: masterId,
		},
	})

	const master_chat = parseInt(masterId)
	const user_chat = parseInt(userId)

	try {
		await bot.sendMessage(
			master_chat,

			`🎉 У Вас новая запись 🎉\n\n 😀 ${firstName} ${lastName} \n 📆 Дата: ${date} \n ⌚ Время: ${times} \n  📞 Телефон: ${phone} \n 💰 К оплате: ${price} руб.`
		)
	} catch (error) {
		console.error('Ошибка при отправке сообщения в чат с мастером:', error)
	}

	try {
		await bot.sendMessage(
			user_chat,

			`🎉 Вы записались 🎉\n\n 😀 Мастер: ${master?.firstName} ${master?.lastName} \n 📞 Телефон: ${master?.phone} \n 📆 Дата: ${date} \n ⌚ Время: ${times} \n 💰 К оплате: ${master?.price} руб.`
		)
	} catch (error) {
		console.error('Ошибка при отправке сообщения в чат с мастером:', error)
	}

	return NextResponse.json(reservation)
}
