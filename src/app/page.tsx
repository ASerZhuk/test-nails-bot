import Container from '@/app/components/Container'
import Main from './components/Main'
import dbConnect from './libs/dbConnect'
import Masters from '@/app/models/Master'
import axios from 'axios'

const Home = async () => {
	return (
		<>
			<Container>
				<Main />
			</Container>
		</>
	)
}

export default Home
