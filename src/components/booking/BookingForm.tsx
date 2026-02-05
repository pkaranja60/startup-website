"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
	Briefcase,
	Building,
	FileText,
	Loader2,
	Mail,
	Phone,
	User,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { BookingFormValues, bookingSchema } from "@/lib/bookingSchema";
import InputField from "../common/InputField";
import { SelectField } from "../common/SelectField";

interface BookingFormProps {
	selectedDate: Date | null;
	selectedTime: string | null;
	onConfirm: (data: BookingFormValues) => Promise<void>;
	isSubmitting: boolean;
}

const PROJECT_TYPES = [
	"Web Development",
	"Mobile App Development",
	"Cybersecurity",
	"Cloud Infrastructure",
	"Database Solutions",
	"AI & Machine Learning",
	"Other",
];

export function BookingForm({
	selectedDate,
	selectedTime,
	onConfirm,
	isSubmitting,
}: BookingFormProps) {
	const form = useForm<BookingFormValues>({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			client_name: "",
			client_email: "",
			client_phone: "",
			client_company: "",
			project_type: "",
			notes: "",
		},
	});

	// const isSubmitting = form.formState.isSubmitting;

	function onSubmit(data: BookingFormValues) {
		if (!selectedDate || !selectedTime) return;
		onConfirm(data);
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="glass-card rounded-3xl p-4 lg:p-8"
			>
				<h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
						<User size={20} className="text-primary" />
					</div>
					Your Information
				</h2>

				<FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Full Name */}
					<Controller
						name="client_name"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel>Full Name *</FieldLabel>
								<InputField {...field} icon={User} placeholder="John Doe" />
								{fieldState.error && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>

					{/* Email */}
					<Controller
						name="client_email"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel>Email Address *</FieldLabel>
								<InputField
									{...field}
									type="email"
									icon={Mail}
									placeholder="john@example.com"
								/>
								{fieldState.error && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>

					{/* Phone */}
					<Controller
						name="client_phone"
						control={form.control}
						render={({ field }) => (
							<Field>
								<FieldLabel>Phone Number</FieldLabel>
								<InputField
									{...field}
									type="tel"
									icon={Phone}
									placeholder="+254 712 345 678"
								/>
							</Field>
						)}
					/>

					{/* Company */}
					<Controller
						name="client_company"
						control={form.control}
						render={({ field }) => (
							<Field>
								<FieldLabel>Company Name</FieldLabel>
								<InputField
									{...field}
									icon={Building}
									placeholder="Acme Corp"
								/>
							</Field>
						)}
					/>

					{/* Project Type */}
					<Controller
						name="project_type"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel>Project Type</FieldLabel>
								<div className="relative flex items-center">
									<Briefcase className="absolute left-3 text-text-tertiary z-10" />
									<div className="pl-10 py-2 w-full">
										<SelectField
											value={field.value}
											onChange={field.onChange}
											options={PROJECT_TYPES}
											placeholder="Select a project type"
										/>
									</div>
								</div>
								{fieldState.error && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>
				</FieldGroup>

				<div className="mb-5 space-y-3">
					{/* Notes */}
					<Controller
						name="notes"
						control={form.control}
						render={({ field }) => (
							<Field className="mt-6">
								<FieldLabel>Additional Notes</FieldLabel>
								<div className="relative">
									<FileText className="absolute left-4 top-4 text-text-tertiary" />
									<textarea
										{...field}
										rows={4}
										placeholder="Tell us about your project..."
										className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-border-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
									/>
								</div>
							</Field>
						)}
					/>

					<p className="text-xs text-text-tertiary">
						<span className="text-red-400">*</span> Required fields
					</p>
				</div>

				{/* Submit */}

				<div className="flex justify-center items-center md:justify-end">
					<button
						type="submit"
						disabled={
							isSubmitting ||
							!selectedDate ||
							!selectedTime ||
							!form.formState.isValid
						}
						className="inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/40 hover:scale-105 disabled:opacity-50"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="animate-spin" />
								Booking...
							</>
						) : (
							<>
								Confirm Booking
								<motion.span
									animate={{ x: [0, 5, 0] }}
									transition={{ repeat: Infinity, duration: 1.5 }}
								>
									→
								</motion.span>
							</>
						)}
					</button>
				</div>
			</motion.div>
		</form>
	);
}
