import { IMaster } from '../models/Master'
import { User } from '../models/User'

export type SafeMaster = Omit<IMaster, 'createdAt' | 'updatedAt'> & {
	createdAt: Date
	updatedAt: Date
}

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt'> & {
	createdAt: string
	updatedAt: string
}
