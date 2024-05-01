import Container from '@/app/components/Container'
import FormClient from './FormClient'

import Masters from '@/app/models/Master'
import dbConnect from '../libs/dbConnect'

const page = async () => {
	await dbConnect()
	const data = await Masters.findOne({})

	return (
		<Container>
			<FormClient currentMaster={data} />
		</Container>
	)
}

export default page
