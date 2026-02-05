import * as z from "zod";

export const bookingSchema = z.object({
	client_name: z.string().min(1, "Full name is required"),
	client_email: z.email("Invalid email address"),
	client_phone: z.string().optional(),
	client_company: z.string().optional(),
	project_type: z.string().min(1, "Please select a project type"),
	notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
