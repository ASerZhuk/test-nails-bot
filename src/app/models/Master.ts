import mongoose, { Schema } from 'mongoose'

export interface IMasters extends mongoose.Document {
	firstName?: string
	lastName?: string
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
}

const MastersSchema: Schema<IMasters> = new Schema(
	{
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
	},
	{
		timestamps: true,
	}
)

export default mongoose.models.Masters ||
	mongoose.model<IMasters>('Masters', MastersSchema)
