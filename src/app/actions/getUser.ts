import prisma from '@/app/libs/prismadb'

export async function getUser(userId: string) {
	try {
		const user = await prisma.user.findUnique({
			where: { userId },
		})
		return user
	} catch (error) {
		console.error('Ошибка при загрузке пользователя:', error)
		return null
	}
}
