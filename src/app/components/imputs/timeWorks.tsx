'use client'

import { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface TimeWorkProps {
	title: string
	subtitle: string
	value: string
	onChange: (value: string) => void
}

const TimeWork: React.FC<TimeWorkProps> = ({
	title,
	subtitle,
	value,
	onChange,
}) => {
	const onAdd = useCallback(() => {
		const time = new Date(`2000-01-01T${value}`)
		time.setMinutes(time.getMinutes() + 30)
		if (time.getHours() < 6 || time.getHours() > 23) {
			return
		}
		onChange(
			time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		)
	}, [onChange, value])

	const onReduce = useCallback(() => {
		const time = new Date(`2000-01-01T${value}`)
		if (time.getHours() === 6 && time.getMinutes() === 0) {
			return
		}
		time.setMinutes(time.getMinutes() - 30)
		onChange(
			time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		)
	}, [onChange, value])

	return (
		<div className='flex flex-row items-center justify-between'>
			<div className='flex flex-col'>
				<div
					className='text-sm'
					style={{ color: 'var(--tg-theme-text-color)' }}
				>
					{title}
				</div>
				<div className='font-light text-gray-600'>{subtitle}</div>
			</div>
			<div className='flex flex-row items-center gap-4'>
				<div
					onClick={onReduce}
					className='
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
					
          '
				>
					<AiOutlineMinus style={{ color: 'var(--tg-theme-text-color)' }} />
				</div>
				<div
					className='
            font-light 
            text-sm 
						pl-1
						pr-1
          
          '
					style={{ color: 'var(--tg-theme-text-color)' }}
				>
					{value}
				</div>
				<div
					onClick={onAdd}
					className='
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          '
				>
					<AiOutlinePlus style={{ color: 'var(--tg-theme-text-color)' }} />
				</div>
			</div>
		</div>
	)
}

export default TimeWork
