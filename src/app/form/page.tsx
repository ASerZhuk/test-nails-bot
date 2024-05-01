import Container from '@/app/components/Container'
import FormClient from './FormClient'

import Masters from '@/app/models/Master'
import dbConnect from '../libs/dbConnect'
import { cache } from 'react'
import axios from 'axios'

const page = async () => {
	try {
		const response = await axios.post('api/master', { isMaster: true })
		const data = response.data
		return (
			<Container>
				<FormClient currentMaster={data} />
			</Container>
		)
	} catch (error) {
		console.error('Failed to fetch master:', error)
	}
}

export default page
