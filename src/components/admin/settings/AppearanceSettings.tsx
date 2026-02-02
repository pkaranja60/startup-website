"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ADMIN_THEMES, applyTheme, getSavedThemeId } from "@/lib/admin-theme";

export default function AppearanceSettings() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [accentColor, setAccentColor] = useState("blue");
	const [pendingTheme, setPendingTheme] = useState<string | undefined>(
		undefined,
	);

	useEffect(() => {
		setMounted(true);
		setAccentColor(getSavedThemeId());
		setPendingTheme(theme);
	}, [theme]);

	// Keep pendingTheme in sync if external theme changes,
	// but only if we haven't touched it?
	// Actually simpler: Initialize it once on mount or when theme loads
	useEffect(() => {
		if (theme && !pendingTheme) {
			setPendingTheme(theme);
		}
	}, [theme, pendingTheme]);

	const handleSave = () => {
		if (pendingTheme) setTheme(pendingTheme);
		applyTheme(accentColor);
		toast.success("Appearance settings saved");
	};

	const handleCancel = () => {
		setPendingTheme(theme);
		setAccentColor(getSavedThemeId());
		toast.info("Changes discarded");
	};

	if (!mounted) return null;

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl font-bold mb-2">Appearance</h1>
				<p className="text-muted-foreground text-sm">
					Customize how NexusTech looks for you
				</p>
			</div>

			<div className="space-y-6">
				<div>
					<label className="text-sm font-medium mb-3 block">Theme Mode</label>
					<div className="grid grid-cols-3 gap-3">
						{[
							{ value: "light", icon: Sun, label: "Light" },
							{ value: "dark", icon: Moon, label: "Dark" },
							{ value: "system", icon: Monitor, label: "System" },
						].map((option) => (
							<button
								key={option.value}
								onClick={() => setPendingTheme(option.value)}
								className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
									(pendingTheme || theme) === option.value
										? "border-primary bg-primary/5"
										: "border-border hover:border-border-hover bg-card"
								}`}
							>
								<option.icon size={24} />
								<span className="text-sm font-medium">{option.label}</span>
							</button>
						))}
					</div>
				</div>

				<div>
					<label className="text-sm font-medium mb-3 block">Accent Color</label>
					<div className="flex gap-3">
						{ADMIN_THEMES.map((themeOption) => (
							<button
								key={themeOption.id}
								onClick={() => setAccentColor(themeOption.id)}
								className={`w-12 h-12 rounded-lg transition-all border-2 ${
									accentColor === themeOption.id
										? "border-foreground scale-110"
										: "border-transparent hover:scale-105"
								}`}
								style={{
									backgroundColor: themeOption.colors.light.primary,
								}}
								title={themeOption.name}
							/>
						))}
					</div>
				</div>

				<div className="flex gap-3 pt-4">
					<button
						onClick={handleCancel}
						className="px-6 py-2.5 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors"
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
}
