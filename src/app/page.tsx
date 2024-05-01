import Container from '@/app/components/Container'
import Main from './components/Main'
import dbConnect from './libs/dbConnect'
import Masters from '@/app/models/Master'
import axios from 'axios'

const Home = async () => {
	const getMaster = async () => {
		await dbConnect()
		try {
			const response = await axios.post('api/master')
			const reservationsData = response.data
			return reservationsData
		} catch (error) {
			console.error('Failed to fetch master:', error)
		}
	}

	const data = await getMaster()

	return (
		<>
			<Container>
				<Main currentMaster={data} />
			</Container>
		</>
	)
}

export default Home
