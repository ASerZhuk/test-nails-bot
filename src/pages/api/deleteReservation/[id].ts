import dbConnect from '@/app/libs/dbConnect'
import Reservation from '@/app/models/Reservation'
import { NextApiResponse, NextApiRequest } from 'next'
import bot from '../bot'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'DELETE') {
		await dbConnect()
		try {
			const { id } = req.query

			console.log(id)

			const reservationId = id

			if (!reservationId || typeof reservationId !== 'string') {
				throw new Error('Invalid reservation ID')
			}

			const reservation = await Reservation.findOne({
				_id: reservationId,
			})

			const user_chat = parseInt(reservation.userId)
			const master_chat = parseInt(reservation.masterId)

			const deletedReservation = await Reservation.deleteOne({
				_id: reservationId,
			})

			if (!deletedReservation) {
				return res.status(404).json({ error: 'Reservation not found' })
			}

			await bot.sendMessage(
				user_chat,
				`❌ Запись отменена ❌\n\n📆 Дата: ${reservation.date} \n⌚ Время: ${reservation.time}`
			)

			await bot.sendMessage(
				master_chat,
				`❌ Запись отменена ❌\n\n😀 Клиент: ${reservation.firstName} ${reservation.lastName}\n📆 Дата: ${reservation.date}\n⌚ Время: ${reservation.time}`
			)

			return res.status(200).json(deletedReservation)
		} catch (error) {
			console.error('Error deleting reservation:', error)

			return res.status(500).json({ error: 'Failed to delete reservation' })
		}
	} else {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}
}
