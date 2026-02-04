// app/api/bookings/[id]/email/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import {
	sendApprovalEmail,
	sendCompletionEmail,
	sendCancellationEmail,
} from "@/lib/email";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const { type } = await request.json();

		// Fetch booking details
		const { data: booking, error } = await supabase
			.from("discovery_bookings")
			.select("*")
			.eq("id", id)
			.single();

		if (error || !booking) {
			return NextResponse.json({ error: "Booking not found" }, { status: 404 });
		}

		// Send appropriate email
		if (type === "approval") {
			await sendApprovalEmail(booking);
		} else if (type === "completion") {
			await sendCompletionEmail(booking);
		} else if (type === "cancelled") {
			await sendCancellationEmail(booking);
		} else {
			return NextResponse.json(
				{ error: "Invalid email type" },
				{ status: 400 },
			);
		}

		return NextResponse.json({
			success: true,
			message: `${type} email sent successfully`,
		});
	} catch (error: any) {
		console.error("Email error:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to send email" },
			{ status: 500 },
		);
	}
}
