import { NextApiResponse, NextApiRequest } from 'next'
import bot from '@/pages/api/bot'
import Reservation from '@/app/models/Reservation'
import Masters from '@/app/models/Master'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const body = req.body
		const { masterId, date, times, price, firstName, lastName, phone, userId } =
			body

		try {
			const reservation = await Reservation.create({
				firstName,
				lastName,
				masterId,
				date,
				time: times,
				price,
				phone,
				userId,
			})

			const master = await Masters.findOne({ userId: masterId })
			const master_chat = parseInt(masterId)
			const user_chat = parseInt(userId)

			await bot.sendMessage(
				master_chat,
				`🔔 У Вас новая запись 🔔\n\n 😀 ${firstName} ${lastName} \n 📆 Дата: ${date} \n ⌚ Время: ${times} \n  📞 Телефон: ${phone} \n 💰 К оплате: ${price} руб.`
			)

			await bot.sendMessage(
				user_chat,
				`🔔 Вы записались 🔔\n\n 😀 Мастер: ${master?.firstName} ${master?.lastName} \n 📞 Телефон: ${master?.phone} \n 📆 Дата: ${date} \n ⌚ Время: ${times} \n 💰 К оплате: ${master?.price} руб.`
			)

			return res.status(200).json(reservation)
		} catch (error) {
			console.error('Error creating reservation:', error)
			return res.status(500).json({ error: 'Failed to create reservation' })
		}
	} else {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}
}
