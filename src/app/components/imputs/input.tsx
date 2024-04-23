'use client'

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
	id: string

	label: any
	type?: string
	disabled?: boolean
	formatPrice?: boolean
	required?: boolean
	register: UseFormRegister<FieldValues>
	errors: FieldErrors
	onChange: (value: any) => void
}

const Input: React.FC<InputProps> = ({
	id,
	label,

	type,
	disabled,
	formatPrice,
	required,
	register,
	errors,
	onChange,
}) => {
	return (
		<div className='w-full relative'>
			<input
				id={id}
				disabled={disabled}
				{...register(id, { required })}
				placeholder=''
				type={type}
				onChange={onChange}
				className={`
					peer
					w-full
					p-4
					pt-6
					font-light
					outline-none
					transition
					disabled:opacity-70
					disabled:cursor-not-allowed
					rounded-full
				`}
				style={{
					backgroundColor: 'var(--tg-theme-secondary-bg-color)',
					color: 'var(--tg-theme-text-color)',
				}}
			/>
			<label
				className={`absolute text-xs left-4 duration-150 transform -translate-y-3 top-5 z-10 origin-[0] scale-75
			`}
				style={{ color: 'var(--tg-theme-text-color)' }}
			>
				{label}
			</label>
		</div>
	)
}

export default Input
