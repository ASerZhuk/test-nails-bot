import Container from '@/app/components/Container'
import Main from './components/Main'

const Home = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/master`,
			{
				cache: 'no-store',
			}
		)

		if (res.ok) {
			const data = await res.json()
			return (
				<>
					<Container>
						<Main currentMaster={data} />
					</Container>
				</>
			)
		} else {
			console.error('Failed to fetch master:', res.status)
			return null
		}
	} catch (error) {
		console.error('Failed to fetch master:', error)
		return null
	}
}

export default Home
