import prisma from '@/app/libs/prismadb'

export default async function getMaster() {
	try {
		const currentMaster = await prisma.master.findFirstOrThrow()
		return {
			...currentMaster,
		}
	} catch (error: any) {
		return null
	}
}
