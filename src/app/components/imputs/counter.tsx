'use client'

import { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface CounterProps {
	title: string
	subtitle: string
	value: number
	onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({
	title,
	subtitle,
	value,
	onChange,
}) => {
	const onAdd = useCallback(() => {
		onChange(value + 15)
	}, [onChange, value])

	const onReduce = useCallback(() => {
		if (value === 15) {
			return
		}

		onChange(value - 15)
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
						pl-4
						pr-4  
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

export default Counter
