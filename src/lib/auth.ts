// lib/auth.ts

import { toast } from "sonner";

export type AdminUser = {
	name: string;
	email: string;
};

type AuthResponse = {
	error?: string;
};

async function postJSON<T>(
	url: string,
	body: Record<string, unknown>,
): Promise<T> {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	const data = (await response.json()) as T & AuthResponse;

	if (!response.ok) {
		throw new Error(data.error || "Request failed");
	}

	return data;
}

export function sendOTP(email: string) {
	return postJSON<AuthResponse>("/api/auth/send-otp", { email });
}

export const AUTH_ROUTES = {
	LOGIN: "/admin/login",
	DASHBOARD: "/admin",
	LOGOUT_API: "/api/auth/logout",
};

export function normalizeEmail(email: string): string {
	return email.toLowerCase().trim();
}

export function verifyOTP(email: string, otp: string) {
	return postJSON<AuthResponse>("/api/auth/verify-otp", { email, otp });
}

export function getAdminUser(): AdminUser | null {
	if (typeof document === "undefined") return null;

	const cookies = document.cookie.split("; ");
	const adminCookie = cookies.find((row) => row.startsWith("admin_user="));

	if (adminCookie) {
		try {
			return JSON.parse(
				decodeURIComponent(adminCookie.split("=")[1]),
			) as AdminUser;
		} catch (e) {
			console.error("Failed to parse admin user cookie", e);
			return null;
		}
	}
	return null;
}

export function isAuthenticated(): boolean {
	return !!getAdminUser();
}

export async function handleLogout() {
	try {
		const response = await fetch(AUTH_ROUTES.LOGOUT_API, { method: "POST" });
		if (response.ok) {
			toast.success("Logged out successfully");
			window.location.href = AUTH_ROUTES.LOGIN;
		} else {
			toast.error("Logout failed");
		}
	} catch (error: unknown) {
		console.error("Logout error:", error);
		toast.error("An error occurred during logout");
	}
}
