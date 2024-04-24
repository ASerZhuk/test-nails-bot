import getMaster from '@/app/actions/getMaster'
import Container from '@/app/components/Container'
import Master from './components/Master'

const Home = async () => {
	const currentMaster = await getMaster()

	return (
		<>
			<Container>
				<Master currentMaster={currentMaster} />
			</Container>
		</>
	)
}

export default Home
