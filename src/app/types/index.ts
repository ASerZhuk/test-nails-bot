import { User, Master } from '@prisma/client'

export type SafeMaster = Omit<Master, 'createdAt' | 'updatedAt'> & {
	createdAt: Date
	updatedAt: Date
}

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt'> & {
	createdAt: string
	updatedAt: string
}
