// app/api/bookings/[id]/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// PATCH - Update booking status
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const body = await request.json();
		const { status, admin_notes, cancellation_reason } = body;

		const updateData: any = {
			updated_at: new Date().toISOString(),
		};

		if (status) {
			updateData.status = status;

			if (status === "cancelled") {
				updateData.cancelled_at = new Date().toISOString();
				if (cancellation_reason) {
					updateData.cancellation_reason = cancellation_reason;
				}
			}
		}

		if (admin_notes !== undefined) {
			updateData.admin_notes = admin_notes;
		}

		if (body.google_meet_link !== undefined) {
			updateData.google_meet_link = body.google_meet_link;
		}

		// Perform the update
		const { data, error } = await supabase
			.from("discovery_bookings")
			.update(updateData)
			.eq("id", id)
			.select()
			.single();

		if (error) {
			console.error("Update error:", error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		// Sync to Calendar if confirmed and has a link
		if (data.status === "confirmed" && data.google_meet_link) {
			const { syncCalendarEvent } = await import("@/lib/email");
			await syncCalendarEvent(data);
		}

		return NextResponse.json({ success: true, booking: data });
	} catch (error: any) {
		console.error("PATCH error:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to update booking" },
			{ status: 500 },
		);
	}
}

// GET - Get single booking
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;

		const { data, error } = await supabase
			.from("discovery_bookings")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 404 });
		}

		return NextResponse.json({ booking: data });
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Failed to fetch booking" },
			{ status: 500 },
		);
	}
}

// DELETE - Delete booking (admin only)
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;

		const { error } = await supabase
			.from("discovery_bookings")
			.delete()
			.eq("id", id);

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ success: true, message: "Booking deleted" });
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Failed to delete booking" },
			{ status: 500 },
		);
	}
}
