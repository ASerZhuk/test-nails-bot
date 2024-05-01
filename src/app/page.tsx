import Container from '@/app/components/Container'
import Main from './components/Main'

const Home = async () => {
	const data = await getData()
	return (
		<>
			<Container>
				<Main currentMaster={data} />
			</Container>
		</>
	)

	function getData() {
		return fetch('/api/master').then(res => res.json())
	}
}

export default Home
