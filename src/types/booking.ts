export interface Booking {
	id: string;
	client_name: string;
	client_email: string;
	client_phone?: string;
	client_company?: string;
	booking_date: string;
	booking_time: string;
	project_type?: string;
	project_budget?: string;
	notes?: string;
	google_meet_link?: string;
	status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
	confirmation_sent_at?: string;
	created_at: string;
	admin_notes?: string;
}
