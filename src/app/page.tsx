import getMaster from '@/app/actions/getMaster'
import Container from '@/app/components/Container'
import Master from './components/Master'

const Home = async () => {
	const currentMaster = await getMaster()
	const currentMasterPlain = currentMaster.toObject()

	return (
		<>
			<Container>
				<Master currentMaster={currentMasterPlain} />
			</Container>
		</>
	)
}

export default Home
