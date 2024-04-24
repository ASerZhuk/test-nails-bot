import { Masters } from '../models/Masters'
import { User } from '../models/User'

export type SafeMaster = Omit<Masters, 'createdAt' | 'updatedAt'> & {
	createdAt: Date
	updatedAt: Date
}

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt'> & {
	createdAt: string
	updatedAt: string
}
