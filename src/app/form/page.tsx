import Container from '@/app/components/Container'
import FormClient from './FormClient'
import getMaster from '../actions/getMaster'

const page = async () => {
	const currentMaster = await getMaster()

	return (
		<Container>
			<FormClient currentMaster={currentMaster} />
		</Container>
	)
}

export default page
