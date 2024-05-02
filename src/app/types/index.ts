import { IMasters } from '../models/Master'
import { IUser } from '../models/User'

export type SafeMaster = Omit<IMasters, 'createdAt' | 'updatedAt'> & {
	createdAt: Date
	updatedAt: Date
}

export type SafeUser = Omit<IUser, 'createdAt' | 'updatedAt'> & {
	createdAt: string
	updatedAt: string
}
