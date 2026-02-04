// app/api/auth/send-otp/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
	console.log("--- Send OTP Start ---");
	try {
		const { email } = await request.json();
		console.log("Sending OTP to:", email);

		if (!email) {
			console.error("Validation Error: Email is required");
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		// Check if email exists in admin_users table
		const { data: adminUser, error: checkError } = await supabase
			.from("admin_users")
			.select("email, is_active")
			.eq("email", email.toLowerCase())
			.single();

		if (checkError || !adminUser) {
			console.warn("Unauthorized login attempt:", email);
			return NextResponse.json(
				{ error: "Unauthorized email address" },
				{ status: 403 },
			);
		}

		if (!adminUser.is_active) {
			return NextResponse.json(
				{ error: "Account is inactive. Contact administrator." },
				{ status: 403 },
			);
		}

		// Use Supabase Auth to send OTP
		const { error: otpError } = await supabase.auth.signInWithOtp({
			email: email.toLowerCase(),
			options: {
				shouldCreateUser: true, // Auto-create user record in auth.users if they don't exist
			},
		});

		if (otpError) {
			console.error("OTP send error:", otpError);
			return NextResponse.json(
				{ error: "Failed to send OTP. Please try again." },
				{ status: 500 },
			);
		}

		// Log the login attempt
		await supabase.from("admin_login_logs").insert({
			email: email.toLowerCase(),
			action: "otp_sent",
			ip_address: request.headers.get("x-forwarded-for") || "unknown",
			user_agent: request.headers.get("user-agent"),
			timestamp: new Date().toISOString(),
		});

		return NextResponse.json({
			success: true,
			message: "OTP sent successfully",
		});
	} catch (error: unknown) {
		console.error("Send OTP error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
