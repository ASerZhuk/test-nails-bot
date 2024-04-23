import { User, Master } from '@prisma/client'

export type SafeMaster = Omit<Master, 'createdAt' | 'updateAt'> & {
	createdAt: Date
	updatedAt: Date
}

export type SafeUser = Omit<User, 'createdAt' | 'updateAt'> & {
	createdAt: string
	updatedAt: string
}
