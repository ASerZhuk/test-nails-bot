import Container from '@/app/components/Container'
import Main from './components/Main'
import getMaster from './actions/getMaster'

const Home = async () => {
	const currentMaster = await getMaster()
	return (
		<>
			<Container>
				<Main currentMaster={currentMaster} />
			</Container>
		</>
	)
}

export default Home
