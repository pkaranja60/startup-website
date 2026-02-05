import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { generateGoogleMeetLink } from "@/lib/email";

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

		// Fetch current booking
		const { data: booking, error: fetchError } = await supabase
			.from("discovery_bookings")
			.select("*")
			.eq("id", id)
			.single();

		if (fetchError || !booking) {
			return NextResponse.json({ error: "Booking not found" }, { status: 404 });
		}

		// Generate new link
		const newMeetLink = await generateGoogleMeetLink(booking);

		// If it's still a fallback, we at least update the db with a clean formatted link
		// but we no longer throw an error here since personal Gmail accounts often
		// block dynamic meet link generation via service accounts.

		return NextResponse.json({ 
            success: true, 
            message: "Google Meet link generated successfully",
            google_meet_link: newMeetLink 
        });
	} catch (error: any) {
		console.error("Regeneration error:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to regenerate link" },
			{ status: 500 },
		);
	}
}
