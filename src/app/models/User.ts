import mongoose, { Schema } from 'mongoose'

export interface IUser extends mongoose.Document {
	firstName?: string
	lastName?: string
	chatId?: string
	userId?: string
	username?: string
	isMaster: boolean
}

const UserSchema: Schema<IUser> = new Schema(
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

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
