'use client'

import { BackButton, useWebApp } from '@vkruglikov/react-telegram-web-app'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { BsWatch } from 'react-icons/bs'
import { GrMoney } from 'react-icons/gr'
import { AiOutlineUser } from 'react-icons/ai'
import { MdPhoneAndroid } from 'react-icons/md'

const AppointmentMaster = () => {
	const router = useRouter()
	const [masterId, setMasterId] = useState<string>()
	const [reservations, setReservations] = useState<any[]>([])
	const [deletingId, setDeletingId] = useState('')
	const WebApp = useWebApp()

	const onCancel = async (_id: string) => {
		await axios
			.delete(`/api/deleteReservation/${_id}`)
			.then(() => {
				WebApp.showAlert('Запись успешно отменена', [router.push('/')])
			})
			.finally(() => {
				setDeletingId('')
			})
	}

	useEffect(() => {
		const tg = window.Telegram?.WebApp
		const id = tg?.initDataUnsafe.user?.id
		setMasterId(id.toString())
	}, [])

	useEffect(() => {
		const getReservationClient = async () => {
			try {
				const response = await axios.get('/api/getMR')
				const reservationsData = response.data
				setReservations(reservationsData)
			} catch (error) {
				console.error('Failed to fetch reservations:', error)
			}
		}
		if (masterId) {
			getReservationClient()
		}
	}, [masterId])

	return (
		<>
			<BackButton onClick={() => router.push('/')} />
			<div className='flex flex-col mt-2'>
				<div
					className='mt-2 text-xl'
					style={{ color: 'var(--tg-theme-text-color)' }}
				>
					Запись ко мне
				</div>
			</div>
			<hr
				className='mt-8'
				style={{ borderColor: 'var(--tg-theme-secondary-bg-color)' }}
			/>
			<div>
				{reservations.map((reservation, index) => (
					<>
						<div
							key={index}
							className='mt-8 text-md flex flex-col gap-2 w-full'
							style={{ color: 'var(--tg-theme-text-color)' }}
						>
							<div
								className='mt-4 flex items-center text-md ml-4'
								style={{ color: 'var(--tg-theme-text-color)' }}
							>
								<AiOutlineUser size={28} className='pr-2' />
								Клиент: {reservation.firstName} {reservation.lastName}
							</div>
							<div
								className='mt-4 flex items-center text-md ml-4'
								style={{ color: 'var(--tg-theme-text-color)' }}
							>
								<MdPhoneAndroid size={28} className='pr-2' />
								Телефон: {reservation.phone}
							</div>
							<div
								className='mt-4 flex items-center text-md ml-4'
								style={{ color: 'var(--tg-theme-text-color)' }}
							>
								<HiOutlineCalendarDays size={28} className='pr-2' />
								Дата: {reservation.date}
							</div>
							<div
								className='mt-4 flex items-center text-md ml-4'
								style={{ color: 'var(--tg-theme-text-color)' }}
							>
								<BsWatch size={28} className='pr-2' />
								Время: {reservation.time}
							</div>
							<div
								className='mt-4 flex items-center text-md ml-4'
								style={{ color: 'var(--tg-theme-text-color)' }}
							>
								<GrMoney size={28} className='pr-2' />К оплате:{' '}
								{reservation.price} руб.
							</div>
							<button
								style={{
									backgroundColor: 'var(--tg-theme-button-color)',
									color: 'var(--tg-theme-button-text-color)',
								}}
								className='cursor-pointer p-2 pl-4 pr-4 rounded-full text-xs mt-2'
								onClick={() => {
									onCancel(reservation._id)
								}}
							>
								Отменить запись
							</button>
						</div>
						<hr
							className='mt-8'
							style={{ borderColor: 'var(--tg-theme-secondary-bg-color)' }}
						/>
					</>
				))}
			</div>
		</>
	)
}

export default AppointmentMaster
