// app/api/bookings/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import {
	generateGoogleMeetLink,
	sendAdminNotificationEmail,
	sendBookingReceiptEmail,
} from "@/lib/email";

// Initialize Supabase client
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role for server-side
);

// Main POST handler
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Validate required fields
		const requiredFields = [
			"client_name",
			"client_email",
			"booking_date",
			"booking_time",
		];
		for (const field of requiredFields) {
			if (!body[field]) {
				return NextResponse.json(
					{ error: `Missing required field: ${field}` },
					{ status: 400 },
				);
			}
		}

		// Check for double booking
		const { data: existingBookings } = await supabase
			.from("discovery_bookings")
			.select("id")
			.eq("booking_date", body.booking_date)
			.eq("booking_time", body.booking_time)
			.in("status", ["pending", "confirmed"]);

		if (existingBookings && existingBookings.length > 0) {
			return NextResponse.json(
				{
					error:
						"This time slot is already booked. Please choose another time.",
				},
				{ status: 409 },
			);
		}

		// Generate Google Meet link
		const meetLink = await generateGoogleMeetLink(body);

		// Insert booking into database
		const { data: booking, error: dbError } = await supabase
			.from("discovery_bookings")
			.insert({
				client_name: body.client_name,
				client_email: body.client_email,
				client_phone: body.client_phone,
				client_company: body.client_company,
				booking_date: body.booking_date,
				booking_time: body.booking_time,
				project_type: body.project_type,
				project_budget: body.project_budget,
				notes: body.notes,
				google_meet_link: meetLink,
				status: "pending",
				timezone: "Africa/Nairobi",
			})
			.select()
			.single();

		if (dbError) {
			console.error("Database error:", dbError);
			return NextResponse.json(
				{ error: "Failed to save booking" },
				{ status: 500 },
			);
		}

		// Send emails asynchronously
		try {
			await Promise.all([
				sendBookingReceiptEmail(
					{ ...booking, google_meet_link: meetLink },
					meetLink,
				),
				sendAdminNotificationEmail(booking),
			]);

			// Update confirmation sent timestamp
			await supabase
				.from("discovery_bookings")
				.update({ confirmation_sent_at: new Date().toISOString() })
				.eq("id", booking.id);
		} catch (emailError) {
			console.error("Email error:", emailError);
			// Don't fail the booking if email fails
		}

		return NextResponse.json(
			{
				success: true,
				booking: {
					id: booking.id,
					client_name: booking.client_name,
					booking_date: booking.booking_date,
					booking_time: booking.booking_time,
					google_meet_link: meetLink,
				},
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Booking error:", error);
		return NextResponse.json(
			{ error: "An unexpected error occurred" },
			{ status: 500 },
		);
	}
}

// GET handler - fetch bookings (for admin)
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const status = searchParams.get("status");
	const date = searchParams.get("date");

	let query = supabase
		.from("discovery_bookings")
		.select("*")
		.order("booking_date", { ascending: true })
		.order("booking_time", { ascending: true });

	if (status) {
		query = query.eq("status", status);
	}

	if (date) {
		query = query.eq("booking_date", date);
	}

	const { data, error } = await query;

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ bookings: data });
}
