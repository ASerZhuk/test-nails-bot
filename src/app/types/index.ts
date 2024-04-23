import { User, Master } from '@prisma/client'

export type SafeMaster = Omit<Master, 'createdAt' | 'updateAt'> & {
	createdAt: string
	updateAt: string
}

export type SafeUser = Omit<User, 'createdAt' | 'updateAt'> & {
	createdAt: string
	updateAt: string
}
