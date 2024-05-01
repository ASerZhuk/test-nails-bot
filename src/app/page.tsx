import Container from '@/app/components/Container'
import Main from './components/Main'
import dbConnect from './libs/dbConnect'
import Masters from '@/app/models/Master'
import axios from 'axios'

const Home = async () => {
	try {
		const response = await axios.post('api/master', { isMaster: true })
		const data = response.data
		return (
			<>
				<Container>
					<Main currentMaster={data} />
				</Container>
			</>
		)
	} catch (error) {
		console.error('Failed to fetch master:', error)
	}
}

export default Home
