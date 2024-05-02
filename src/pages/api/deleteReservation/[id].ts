import dbConnect from '@/app/libs/dbConnect'
import Reservation from '@/app/models/Reservation'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'DELETE') {
		await dbConnect()
		try {
			const { reservationId } = req.query
			console.log(reservationId)

			// Проверяем наличие идентификатора резервации
			if (!reservationId || typeof reservationId !== 'string') {
				throw new Error('Invalid reservation ID')
			}

			// Удаляем резервацию по идентификатору
			const deletedReservation = await Reservation.deleteOne({
				_id: reservationId,
			})

			// Проверяем, была ли успешно удалена резервация
			if (!deletedReservation) {
				return res.status(404).json({ error: 'Reservation not found' })
			}

			// Возвращаем успешный статус и удаленную резервацию
			return res.status(200).json(deletedReservation)
		} catch (error) {
			console.error('Error deleting reservation:', error)
			// Возвращаем статус ошибки
			return res.status(500).json({ error: 'Failed to delete reservation' })
		}
	} else {
		// Возвращаем ошибку метода, если запрос не является DELETE
		return res.status(405).json({ error: 'Method Not Allowed' })
	}
}
