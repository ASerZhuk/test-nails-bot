'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { SafeMaster, SafeUser } from '../types'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import {
	BackButton,
	MainButton,
	useWebApp,
} from '@vkruglikov/react-telegram-web-app'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import MyCalendar from '../components/imputs/MyCalendar'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { BsWatch } from 'react-icons/bs'
import { GrMoney } from 'react-icons/gr'
import { AiOutlineUser } from 'react-icons/ai'
import { MdPhoneAndroid } from 'react-icons/md'
import Input from '../components/imputs/inputs'
import { IMasters } from '../models/Master'

enum STEPS {
	DATE = 0,
	INFO = 1,
	CONF = 2,
}

const ReservationForm = () => {
	const router = useRouter()
	const [step, setStep] = useState(STEPS.DATE)
	const [isLoading, setIsLoading] = useState(false)
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
	const [time, setTime] = useState<string[]>([])
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | string[]>(
		[]
	)
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
	})
	const [isFormFilled, setIsFormFilled] = useState(false)

	const [userId, setUserId] = useState()
	const WebApp = useWebApp()

	const [currentMaster, setCurrentMaster] = useState<SafeMaster | null>(null)

	useEffect(() => {
		const getMaster = async () => {
			try {
				const response = await axios.get('/api/master')
				const masterData = response.data
				setCurrentMaster(masterData)
			} catch (error) {
				console.error('Failed to fetch master:', error)
			}
		}

		getMaster()
	}, [])

	useEffect(() => {
		const tg = window.Telegram?.WebApp
		const userId = tg?.initDataUnsafe.user?.id
		setUserId(userId.toString())
	}, [])

	useEffect(() => {
		const { firstName, lastName, phone } = formData
		const allFieldsFilled = !!(firstName && lastName && phone)
		setIsFormFilled(allFieldsFilled)
	}, [formData])

	const ddays = currentMaster?.disDays
	const masterId = currentMaster?.userId
	const price = currentMaster?.price
	const date = selectedDate?.toLocaleDateString()
	const times = selectedTimeSlot

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			date: '',
			time: '',
		},
	})

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		})
	}

	const handleSave: SubmitHandler<FieldValues> = async () => {
		setIsLoading(true)
		const { firstName, lastName, phone } = formData
		axios
			.post('/api/reservation', {
				firstName,
				lastName,
				phone,
				masterId,
				date,
				times,
				price,
				userId,
			})
			.then(() => {
				WebApp.showAlert('Запись прошла успешно', [router.push('/')])
				reset()
			})
	}

	const handleDateChange = async (date: Date | null) => {
		setSelectedDate(date ? date : undefined)

		if (date) {
			try {
				const response = await axios.post('/api/availableTime', {
					date: date?.toLocaleDateString('ru-RU'),

					userId: currentMaster?.userId,
				})
				const availableTimes = response.data
				setTime(availableTimes)
				setSelectedTimeSlot([])
			} catch (error) {
				console.error('Failed to check availability:', error)
			}
		}
	}

	const handleTimeSlotSelect = (timeSlot: string) => {
		setSelectedTimeSlot(timeSlot)
	}

	const handleTimeSlotClick = (timeSlot: string) => {
		handleTimeSlotSelect(timeSlot)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value,
		}))
	}

	const generateDisabledDates = (): Date[] => {
		const disabledDates: Date[] = []
		const currentDate = new Date()
		currentDate.setDate(currentDate.getDate() - 1) // Начнем с предыдущего дня
		for (let i = 0; i < 365; i++) {
			currentDate.setDate(currentDate.getDate() + 1)
			const dayOfWeek = currentDate.getDay()
			if (ddays && ddays.includes(dayOfWeek)) {
				// Добавим проверку на undefined
				disabledDates.push(new Date(currentDate))
			}
		}
		return disabledDates
	}

	let bodyContent

	const onBack = () => {
		router.back()
	}
	const onNext = () => {
		setStep(value => value + 1)
	}
	const onBackStep = () => {
		setStep(value => value - 1)
	}

	if (step === STEPS.DATE) {
		bodyContent = (
			<>
				<BackButton onClick={onBack} />
				<MainButton text='Далее' onClick={onNext}></MainButton>
				<div className='flex flex-col mt-2'>
					<div
						className='mt-2 text-xl '
						style={{ color: 'var(--tg-theme-text-color)' }}
					>
						Выберите дату и время
					</div>

					<hr
						className='mt-8'
						style={{ borderColor: 'var(--tg-theme-secondary-bg-color)' }}
					/>

					<div className='mt-8 flex justify-center'>
						<MyCalendar
							value={selectedDate}
							onChange={date => handleDateChange(date)}
							disabledDates={generateDisabledDates()}
						/>
					</div>
					<div className='mt-8 grid grid-cols-4 gap-4 place-items-center text-sm'>
						{time.map(timeSlot => (
							<button
								key={timeSlot}
								onClick={() => handleTimeSlotClick(timeSlot)}
								className={`px-4 py-2 rounded-full ${
									selectedTimeSlot === timeSlot
										? 'bg-blue-400 text-white'
										: 'bg-neutral-200 text-neutral-600'
								}`}
							>
								{timeSlot}
							</button>
						))}
					</div>
				</div>
			</>
		)
	} else if (step === STEPS.INFO) {
		bodyContent = (
			<>
				<BackButton onClick={onBackStep} />

				{isFormFilled && <MainButton text='Далее' onClick={onNext} />}

				<div className='flex flex-col mt-2'>
					<div
						className='mt-2 text-xl'
						style={{ color: 'var(--tg-theme-text-color)' }}
					>
						Введите свои данные
					</div>
					<hr
						className='mt-8'
						style={{ borderColor: 'var(--tg-theme-secondary-bg-color)' }}
					/>
					<div className='flex flex-col gap-8 mt-8'>
						<Input
							type='text'
							id='firstName'
							name='firstName'
							label='Имя'
							value={formData.firstName}
							onChange={handleInputChange}
							disabled={isLoading}
							required
						/>
						<Input
							type='text'
							id='lastName'
							name='lastName'
							label='Фамилия'
							value={formData.lastName}
							onChange={handleInputChange}
							disabled={isLoading}
							required
						/>
						<Input
							type='tel'
							id='phone'
							name='phone'
							label='Телефон'
							value={formData.phone}
							onChange={handleInputChange}
							disabled={isLoading}
							required
						/>
					</div>
				</div>
			</>
		)
	} else if (step === STEPS.CONF) {
		bodyContent = (
			<>
				<BackButton onClick={onBackStep} />
				<MainButton
					text='Записаться'
					onClick={() => handleSubmit(handleSave)()}
				></MainButton>
				<div className='flex flex-col mt-2'>
					<div
						className='mt-2 text-xl'
						style={{ color: 'var(--tg-theme-text-color)' }}
					>
						Проверьте свои данные
					</div>
					<hr
						className='mt-8'
						style={{ borderColor: 'var(--tg-theme-secondary-bg-color)' }}
					/>
					<div>
						<div
							className='mt-8 text-sm'
							style={{ color: 'var(--tg-theme-hint-color)' }}
						>
							Личная информация
						</div>
						<div
							className='flex items-center mt-4 text-md ml-4'
							style={{ color: 'var(--tg-theme-text-color)' }}
						>
							<AiOutlineUser size={27} className='pr-2' />
							{formData.firstName} {formData.lastName}
						</div>
						<div
							className='flex items-center mt-4 text-md ml-4'
							style={{ color: 'var(--tg-theme-text-color)' }}
						>
							<MdPhoneAndroid size={28} className='pr-2' />
							{formData.phone}
						</div>
						<hr
							className='mt-8'
							style={{ borderColor: 'var(--tg-theme-secondary-bg-color)' }}
						/>
						<div
							className='mt-8 text-sm'
							style={{ color: 'var(--tg-theme-hint-color)' }}
						>
							Дата и время записи
						</div>
						<div
							className='mt-4 flex items-center text-md ml-4'
							style={{ color: 'var(--tg-theme-text-color)' }}
						>
							<HiOutlineCalendarDays size={28} className='pr-2' />
							{date}
						</div>
						<div
							className='mt-4 flex items-center text-md ml-4'
							style={{ color: 'var(--tg-theme-text-color)' }}
						>
							<BsWatch size={28} className='pr-2' />
							{times}
						</div>
						<hr
							className='mt-8'
							style={{ borderColor: 'var(--tg-theme-secondary-bg-color)' }}
						/>
						<div
							className='mt-8 text-sm'
							style={{ color: 'var(--tg-theme-hint-color)' }}
						>
							Стоимость услуги
						</div>
						<div
							className='mt-4 flex items-center text-md ml-4'
							style={{ color: 'var(--tg-theme-text-color)' }}
						>
							<GrMoney size={28} className='pr-2' />
							{price} руб.
						</div>
					</div>

					<div></div>
				</div>
			</>
		)
	}

	return <div>{bodyContent}</div>
}

export default ReservationForm
