import mongoose, { Schema } from 'mongoose'

export interface IReservation extends mongoose.Document {
	firstName?: string
	lastName?: string
	masterId?: string
	userId?: string
	date: string
	time: string
	price: string
	phone?: string
}

const ReservationSchema: Schema<IReservation> = new Schema(
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
	mongoose.model<IReservation>('Reservation', ReservationSchema)
