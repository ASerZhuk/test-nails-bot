import Container from '@/app/components/Container'

import getMaster from '../actions/getMaster'
import ReservationForm from './ReservationForm'

const page = async () => {
	const currentMaster = await getMaster()
	return (
		<Container>
			<ReservationForm currentMaster={currentMaster} />
		</Container>
	)
}

export default page
