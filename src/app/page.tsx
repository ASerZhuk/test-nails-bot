import Container from '@/app/components/Container'
import Main from './components/Main'

const Home = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/master`)
	const data = await res.json()
	return (
		<>
			<Container>
				<Main currentMaster={data} />
			</Container>
		</>
	)
}

export default Home
