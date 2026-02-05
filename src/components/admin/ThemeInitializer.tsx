"use client";

import { useEffect } from "react";
import { applyTheme, getSavedThemeId } from "@/lib/admin-theme";

export default function ThemeInitializer() {
	useEffect(() => {
		const savedTheme = getSavedThemeId();
		applyTheme(savedTheme);
	}, []);

	return null;
}
