import mongoose, { Schema } from 'mongoose'

export interface Master extends mongoose.Document {
	firstName?: string
	lastName?: string
	category?: string
	chatId?: string
	userId?: string
	username?: string
	image?: string
	startTime?: string
	endTime?: string
	interval: number
	slotTime: string[]
	price?: string
	phone?: string
	disDays?: number[]
	createdAt: Date
	updatedAt: Date
}

const MasterSchema: Schema<Master> = new Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	chatId: {
		type: String,
	},
	userId: {
		type: String,
		unique: true,
	},
	username: {
		type: String,
		unique: true,
	},
	image: {
		type: String,
	},
	startTime: {
		type: String,
	},
	endTime: {
		type: String,
	},
	interval: {
		type: Number,
	},
	slotTime: {
		type: [String],
	},
	price: {
		type: String,
	},
	phone: {
		type: String,
	},
	disDays: {
		type: [Number],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
})

export default mongoose.models.Master ||
	mongoose.model<Master>('Master', MasterSchema)
