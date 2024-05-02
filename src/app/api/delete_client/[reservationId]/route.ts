import Reservation from '@/app/models/Reservation'
import { NextResponse } from 'next/server'

interface IParams {
	reservationId?: string
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const { reservationId } = params
	if (!reservationId || typeof reservationId !== 'string') {
		throw new Error('Неверный ID резервации')
	}
	console.log(reservationId)

	try {
		// Удаляем резервацию по идентификатору
		const deletedReservation = await Reservation.deleteOne({
			_id: reservationId,
		})

		// Возвращаем успешный статус и удаленную резервацию
		return NextResponse.json(deletedReservation)
	} catch (error) {
		console.error('Ошибка при удалении резервации:', error)
		// Возвращаем статус ошибки
		return NextResponse.error()
	}
}
