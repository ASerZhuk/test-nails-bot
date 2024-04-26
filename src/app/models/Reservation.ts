import mongoose, { Schema } from 'mongoose'

export interface Reservation extends mongoose.Document {
	firstName?: string
	lastName?: string
	masterId?: string
	userId?: string
	date: string
	time: string
	price: string
	phone?: string
}

const ReservationSchema: Schema<Reservation> = new Schema(
	{
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		masterId: {
			type: String,
		},
		userId: {
			type: String,
		},
		date: {
			type: String,
		},
		time: {
			type: String,
		},
		price: {
			type: String,
		},
		phone: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.models.Reservation ||
	mongoose.model<Reservation>('Reservation', ReservationSchema)
