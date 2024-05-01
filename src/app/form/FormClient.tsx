'use client'

import { useEffect, useState } from 'react'
import Input from '../components/imputs/inputs'
import { SafeMaster } from '../types'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import TimeWork from '../components/imputs/timeWorks'
import Counter from '../components/imputs/counter'
import {
	BackButton,
	MainButton,
	useWebApp,
} from '@vkruglikov/react-telegram-web-app'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import AvatarUpload from '../components/UploadAvatar'

import { Checkbox } from 'antd'
import { IMasters } from '../models/Master'

const FormClient = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const [currentMaster, setCurrentMaster] = useState<SafeMaster | null>(null)

	useEffect(() => {
		const getMaster = async () => {
			try {
				const response = await axios.post(`/api/master`)
				const masterData = response.data
				setCurrentMaster(masterData)
			} catch (error) {
				console.error('Failed to fetch master:', error)
			}
		}

		getMaster()
	}, [])

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		price: '',
		phone: '',
	})
	const [isFormFilled, setIsFormFilled] = useState(false)
	const WebApp = useWebApp()

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>()

	useEffect(() => {
		if (currentMaster) {
			setFormData({
				firstName: currentMaster.firstName || '',
				lastName: currentMaster.lastName || '',
				price: currentMaster.price || '',
				phone: currentMaster.phone || '',
			})
			setValue('startTime', currentMaster.startTime)
			setValue('endTime', currentMaster.endTime)
			setValue('interval', currentMaster.interval)
			setValue('image', currentMaster.image)
			setValue('selectedDays', currentMaster.disDays || [])
		}
	}, [currentMaster])

	const startTime = watch('startTime')
	const endTime = watch('endTime')
	const interval = watch('interval')
	const image = watch('image')
	const selectedDays = watch('selectedDays')

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		})
	}

	const handleSave: SubmitHandler<FieldValues> = async data => {
		const { firstName, lastName, price, phone } = formData
		const newData = { ...data, firstName, lastName, price, phone }
		axios.post('/api/profile', newData).then(() => {
			WebApp.showAlert('Профиль успешно обновлен', [WebApp.close()])
		})
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value,
		}))
	}

	const options = [
		{ label: 'Понедельник', value: 1 },
		{ label: 'Вторник', value: 2 },
		{ label: 'Среда', value: 3 },
		{ label: 'Четверг', value: 4 },
		{ label: 'Пятница', value: 5 },
		{ label: 'Суббота', value: 6 },
		{ label: 'Воскресенье', value: 0 },
	]

	useEffect(() => {
		const { firstName, lastName, price, phone } = formData
		const allFieldsFilled = !!(firstName && lastName && price && phone)
		setIsFormFilled(allFieldsFilled)
	}, [formData])

	useEffect(() => {}, [])

	return (
		<>
			<BackButton onClick={() => router.back()} />

			<div className='flex flex-col gap-8 px-4'>
				<AvatarUpload
					value={image}
					onChange={(value: any) => setCustomValue('image', value)}
				/>
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

				<TimeWork
					onChange={value => setCustomValue('startTime', value)}
					title='Начало работы'
					subtitle=''
					value={startTime}
				/>

				<TimeWork
					onChange={value => setCustomValue('endTime', value)}
					title='Конец работы'
					subtitle=''
					value={endTime}
				/>

				<Counter
					onChange={value => setCustomValue('interval', value)}
					title='Время на клиента'
					subtitle=''
					value={interval}
				/>

				<Input
					type='tel'
					id='price'
					name='price'
					label='Стоимость'
					value={formData.price}
					onChange={handleInputChange}
					disabled={isLoading}
					required
				/>

				<Checkbox.Group
					options={options}
					value={selectedDays}
					onChange={checkedValues => setValue('selectedDays', checkedValues)}
				>
					{options.map(option => (
						<Checkbox key={option.value} value={option.value}>
							{option.label}
						</Checkbox>
					))}
				</Checkbox.Group>
			</div>
			{isFormFilled && (
				<MainButton
					text='Сохранить'
					onClick={() => handleSubmit(handleSave)()}
				/>
			)}
		</>
	)
}

export default FormClient
