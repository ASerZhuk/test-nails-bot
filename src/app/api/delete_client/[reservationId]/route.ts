import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'

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

	try {
		// Удаляем резервацию по идентификатору
		const deletedReservation = await prisma.reservation.delete({
			where: {
				id: reservationId,
			},
		})

		// Возвращаем успешный статус и удаленную резервацию
		return NextResponse.json(deletedReservation)
	} catch (error) {
		console.error('Ошибка при удалении резервации:', error)
		// Возвращаем статус ошибки
		return NextResponse.error()
	}
}
