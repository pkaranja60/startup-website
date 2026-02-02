export interface ThemeColor {
	primary: string;
	hover: string;
	ring: string;
}

export interface AdminTheme {
	id: string;
	name: string;
	colors: {
		light: ThemeColor;
		dark: ThemeColor;
	};
}

export const ADMIN_THEMES: AdminTheme[] = [
	{
		id: "blue",
		name: "Blue",
		colors: {
			light: {
				primary: "#007aff",
				hover: "#0066d6",
				ring: "#007aff",
			},
			dark: {
				primary: "#3b82f6",
				hover: "#60a5fa",
				ring: "#3b82f6",
			},
		},
	},
	{
		id: "green",
		name: "Green",
		colors: {
			light: {
				primary: "#16a34a",
				hover: "#15803d",
				ring: "#16a34a",
			},
			dark: {
				primary: "#00ff9d",
				hover: "#00e68d",
				ring: "#00ff9d",
			},
		},
	},
	{
		id: "purple",
		name: "Purple",
		colors: {
			light: {
				primary: "#9333ea",
				hover: "#7e22ce",
				ring: "#9333ea",
			},
			dark: {
				primary: "#a855f7",
				hover: "#c084fc",
				ring: "#a855f7",
			},
		},
	},
	{
		id: "orange",
		name: "Orange",
		colors: {
			light: {
				primary: "#ea580c",
				hover: "#c2410c",
				ring: "#ea580c",
			},
			dark: {
				primary: "#f97316",
				hover: "#fb923c",
				ring: "#f97316",
			},
		},
	},
	{
		id: "pink",
		name: "Pink",
		colors: {
			light: {
				primary: "#db2777",
				hover: "#be185d",
				ring: "#db2777",
			},
			dark: {
				primary: "#ec4899",
				hover: "#f472b6",
				ring: "#ec4899",
			},
		},
	},
];

export const STORAGE_KEY = "admin-accent-color";

export function applyTheme(themeId: string) {
	if (typeof window === "undefined") return;

	const theme = ADMIN_THEMES.find((t) => t.id === themeId) || ADMIN_THEMES[0];
	const css = `
    :root {
      --color-primary: ${theme.colors.light.primary};
      --color-primary-hover: ${theme.colors.light.hover};
      --color-ring: ${theme.colors.light.ring};
    }
    .dark {
      --color-primary: ${theme.colors.dark.primary};
      --color-primary-hover: ${theme.colors.dark.hover};
      --color-ring: ${theme.colors.dark.ring};
    }
  `;

	let styleTag = document.getElementById("admin-theme-styles");
	if (!styleTag) {
		styleTag = document.createElement("style");
		styleTag.id = "admin-theme-styles";
		document.head.appendChild(styleTag);
	}
	styleTag.innerHTML = css;

	localStorage.setItem(STORAGE_KEY, themeId);
}

export function getSavedThemeId(): string {
	if (typeof window === "undefined") return "blue";
	return localStorage.getItem(STORAGE_KEY) || "blue";
}
