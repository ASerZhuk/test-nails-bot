import Container from '@/app/components/Container'
import FormClient from './FormClient'

import Masters from '@/app/models/Master'
import dbConnect from '../libs/dbConnect'
import { cache } from 'react'
import axios from 'axios'

const page = async () => {
	const getMaster = async () => {
		try {
			const response = await axios.post('api/master', { isMaster: true })
			const reservationsData = response.data
			return reservationsData
		} catch (error) {
			console.error('Failed to fetch master:', error)
		}
	}

	const data = await getMaster()

	return (
		<Container>
			<FormClient currentMaster={data} />
		</Container>
	)
}

export default page
