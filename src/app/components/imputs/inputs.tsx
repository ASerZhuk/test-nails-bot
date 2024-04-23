'use client'

interface InputProps {
	type: string
	name: string
	id: string
	label: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	disabled?: boolean
	required?: boolean
}

const Input: React.FC<InputProps> = ({
	type,
	name,
	id,
	label,
	value,
	onChange,
	disabled,
	required,
}) => {
	return (
		<div className='w-full relative'>
			<label
				className='absolute text-xs left-4 duration-150 transform -translate-y-3 top-5 z-10 origin-[0] scale-75'
				style={{ color: 'var(--tg-theme-text-color)' }}
				htmlFor={id}
			>
				{label}
			</label>
			<input
				className='
					peer
					w-full
					p-4
					pt-6
					font-light
					outline-none
					transition
					disabled:opacity-70
					disabled:cursor-not-allowed
					rounded-full'
				style={{
					backgroundColor: 'var(--tg-theme-secondary-bg-color)',
					color: 'var(--tg-theme-text-color)',
				}}
				type={type}
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				disabled={disabled}
				required={required}
			/>
		</div>
	)
}

export default Input
