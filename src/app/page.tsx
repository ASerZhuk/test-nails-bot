import getMaster from '@/app/actions/getMaster'
import Container from '@/app/components/Container'
import Master from './components/Master'
import { Spin } from 'antd'

const Home = async () => {
	const currentMaster = await getMaster()

	if (!currentMaster) {
		return <Spin />
	}
	return (
		<>
			<Container>
				<Master currentMaster={currentMaster} />
			</Container>
		</>
	)
}

export default Home
