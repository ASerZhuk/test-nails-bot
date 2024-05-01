import Container from '@/app/components/Container'
import Main from './components/Main'
import dbConnect from './libs/dbConnect'
import Masters from '@/app/models/Master'

const Home = async () => {
	await dbConnect()
	const data = await Masters.findOne({})
	return (
		<>
			<Container>
				<Main currentMaster={data} />
			</Container>
		</>
	)
}

export default Home
