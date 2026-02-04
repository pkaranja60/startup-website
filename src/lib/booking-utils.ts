
export function isFallbackLink(link: string | undefined): boolean {
	if (!link) return true;
	return link.includes("fallback-") || link.includes("discovery-");
}
