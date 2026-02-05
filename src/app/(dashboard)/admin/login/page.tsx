"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader2, Lock, Mail, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AUTH_ROUTES, normalizeEmail, sendOTP, verifyOTP } from "@/lib/auth";

export default function AdminLoginPage() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [step, setStep] = useState<"email" | "otp">("email");
	const [loading, setLoading] = useState(false);

	const handleSendOTP = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await sendOTP(normalizeEmail(email));

			toast.success("Code sent!", {
				description: "Check your email for the 6-digit verification code.",
			});

			setStep("otp");
		} catch (error: unknown) {
			toast.error(
				error instanceof Error ? error.message : "Something went wrong",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyOTP = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await verifyOTP(normalizeEmail(email), otp.trim());

			toast.success("Access granted!", {
				description: "Redirecting to admin dashboard...",
			});

			router.push(AUTH_ROUTES.DASHBOARD);
			router.refresh();
		} catch (error: unknown) {
			toast.error(
				error instanceof Error ? error.message : "Verification failed",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleResendOTP = async () => {
		setLoading(true);

		try {
			await sendOTP(normalizeEmail(email));

			toast.success("Code resent!", {
				description: "A new code has been sent to your email.",
			});
		} catch (error: unknown) {
			toast.error(
				error instanceof Error ? error.message : "Failed to resend code",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-background">
			<div className="w-full max-w-md">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-8"
				>
					<div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
						<Shield size={32} className="text-primary" />
					</div>
					<h1 className="text-3xl font-display font-bold mb-2">Admin Access</h1>
					<p className="text-muted-foreground">
						{step === "email"
							? "Enter your email to receive a verification code"
							: "Enter the 6-digit code sent to your email"}
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="bg-card border border-border rounded-2xl p-8 shadow-lg"
				>
					{step === "email" ? (
						<form onSubmit={handleSendOTP} className="space-y-6">
							<div>
								<label className="text-sm font-medium mb-2 block">
									Email Address
								</label>
								<div className="relative">
									<Mail
										size={18}
										className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
									/>
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="admin@drdsolutions.com"
										required
										className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
									/>
								</div>
							</div>

							<button
								type="submit"
								disabled={loading || !email}
								className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{loading ? (
									<>
										<Loader2 size={20} className="animate-spin" />
										Sending Code...
									</>
								) : (
									<>
										Send Verification Code
										<ArrowRight size={20} />
									</>
								)}
							</button>
						</form>
					) : (
						<form onSubmit={handleVerifyOTP} className="space-y-6">
							<div className="p-4 rounded-xl bg-muted/50 border border-border">
								<div className="flex items-center gap-3">
									<Mail size={18} className="text-primary" />
									<div>
										<p className="text-xs text-muted-foreground">
											Verification code sent to
										</p>
										<p className="text-sm font-medium">{email}</p>
									</div>
								</div>
							</div>

							<div>
								<label className="text-sm font-medium mb-2 block">
									8-Digit Code
								</label>
								<div className="relative">
									<Lock
										size={18}
										className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
									/>
									<input
										type="text"
										// VISUAL: If otp is 12345678, this displays "1234-5678"
										value={
											otp.length > 4
												? `${otp.slice(0, 4)}-${otp.slice(4)}`
												: otp
										}
										onChange={(e) => {
											// 1. Remove the hyphen and any non-digits to get raw state
											const rawValue = e.target.value
												.replace(/\D/g, "")
												.slice(0, 8);

											// 2. Save only the numbers to your 'otp' state
											setOtp(rawValue);
										}}
										placeholder="0000-0000"
										required
										// 3. Set to 9 to accommodate 8 digits + 1 hyphen
										maxLength={9}
										className="w-full py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-center text-2xl font-mono tracking-widest"
									/>
								</div>
								<p className="text-xs text-muted-foreground mt-2 text-center">
									Code expires in 10 minutes
								</p>
							</div>

							<button
								type="submit"
								disabled={loading || otp.length !== 6}
								className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{loading ? (
									<>
										<Loader2 size={20} className="animate-spin" />
										Verifying...
									</>
								) : (
									<>
										Verify & Login
										<ArrowRight size={20} />
									</>
								)}
							</button>

							<div className="flex items-center justify-between pt-4 border-t border-border">
								<button
									type="button"
									onClick={() => {
										setStep("email");
										setOtp("");
									}}
									className="text-sm text-muted-foreground hover:text-foreground transition-colors"
								>
									← Change Email
								</button>
								<button
									type="button"
									onClick={handleResendOTP}
									disabled={loading}
									className="text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
								>
									Resend Code
								</button>
							</div>
						</form>
					)}
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="mt-6 text-center"
				>
					<p className="text-xs text-muted-foreground">
						Protected by DrD Solutions Security
					</p>
				</motion.div>
			</div>
		</div>
	);
}
