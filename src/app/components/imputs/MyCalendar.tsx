'use calendar'

import { Calendar } from 'react-date-range'
import { ru } from 'date-fns/locale'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './MyCalendar.css'

interface CalendarProps {
	value: Date | undefined
	onChange: (value: Date | null) => void
	disabledDates?: Date[]
}

const MyCalendar: React.FC<CalendarProps> = ({
	value,
	onChange,
	disabledDates,
}) => {
	return (
		<Calendar
			locale={ru}
			color={'#0088cc'}
			date={value}
			onChange={onChange}
			direction='vertical'
			showDateDisplay={false}
			minDate={new Date()}
			disabledDates={disabledDates}
			className='calendar'
		/>
	)
}

export default MyCalendar
