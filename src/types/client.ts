import { Booking } from "./booking";

export interface Client {
	name: string;
	email: string;
	phone?: string;
	company?: string;
	totalBookings: number;
	lastBooking: string;
	bookings: Booking[];
}
