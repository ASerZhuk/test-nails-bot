import mongoose, { Schema } from 'mongoose'

export interface User extends mongoose.Document {
	firstName?: string
	lastName?: string
	chatId?: string
	userId?: string
	username?: string
	isMaster: boolean
}

const UserSchema: Schema<User> = new Schema(
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
		},
		username: {
			type: String,
			unique: true,
		},
		isMaster: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.models.User || mongoose.model<User>('User', UserSchema)
