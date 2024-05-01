import Container from '@/app/components/Container'
import FormClient from './FormClient'

const page = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/master`,
		{
			cache: 'no-store',
		}
	)
	const data = await res.json()
	return (
		<Container>
			<FormClient currentMaster={data} />
		</Container>
	)
}

export default page
