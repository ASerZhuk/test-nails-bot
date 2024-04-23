import React from 'react'
import { Checkbox } from 'antd'




const Select: React.FC<SelectProps> = ({ onChange, value }) => {
	const options = [
		{ label: 'Понедельник', value: 1 },
		{ label: 'Вторник', value: 2 },
		{ label: 'Среда', value: 3 },
		{ label: 'Четверг', value: 4 },
		{ label: 'Пятница', value: 5 },
		{ label: 'Суббота', value: 6 },
		{ label: 'Воскресенье', value: 0 },
	]
	const handleChange = (checkedValues: number[]) => {
		onChange(checkedValues) // Передача выбранных значений наверх через функцию обратного вызова
	}
	return (
		<>
			<div className='text-sm'>Выберите выходные дни</div>
			<Checkbox.Group
				options={options}
				value={value}
				defaultValue={value}
				onChange={handleChange}
			/>
		</>
	)
}

export default Select
