export const pricingTiers = [
	{
		name: "Starter",
		price: "KES 15,000",
		priceUSD: "$119",
		period: "project",
		description:
			"Perfect for small businesses and personal brands launching their online presence.",
		features: [
			"Professional Web Development (up to 5 pages)",
			"Mobile-First Responsive Design",
			"Basic SEO & Meta Tag Setup",
			"Contact & WhatsApp Lead Forms",
			"Basic Shared Hosting Config",
			"Free SSL Certificate Integration",
			"7 Days Post-Launch Support",
		],
		cta: "Start Web Project",
		popular: false,
		gradient: "from-gray-500/10 to-gray-600/10",
	},
	{
		name: "Growth",
		price: "KES 60,000",
		priceUSD: "$459",
		period: "project",
		description:
			"Scaling businesses needing professional Web & App solutions with basic Cloud support.",
		features: [
			"Advanced Web App (up to 12 pages)",
			"Basic Mobile App Development (MVP)",
			"Content Management System (CMS)",
			"Advanced On-page SEO Optimization",
			"Cloud Migration & Basic Deployment",
			"Security Hardening & Backups",
			"14 Days Dedicated Support",
		],
		cta: "Scale Your Business",
		popular: true,
		gradient: "from-primary/20 to-accent/20",
	},
	{
		name: "Pro",
		price: "Custom",
		priceUSD: "Custom",
		period: "quote",
		description:
			"Full-scale enterprise solutions including AI, Advanced Cybersecurity, and Cloud Architecture.",
		features: [
			"AI & Machine Learning Integration",
			"Advanced Cybersecurity (Pen-Testing)",
			"Enterprise Cloud & DevOps (AWS/Azure)",
			"Custom Database Architecture Build-out",
			"High-Performance Hybrid Applications",
			"24/7 Security & Performance Monitoring",
			"Dedicated Architect & Priority Support",
		],
		cta: "Get Enterprise Quote",
		popular: false,
		gradient: "from-purple-500/10 to-pink-500/10",
	},
];

export const comparisonFeatures = [
	{
		category: "Development Scope",
		features: [
			{
				name: "Web Development",
				launch: "Standard Site",
				scale: "Web Application",
				enterprise: "Enterprise System",
			},
			{
				name: "Mobile App Development",
				launch: false,
				scale: "Basic App",
				enterprise: "Native & Hybrid Apps",
			},
			{
				name: "CMS Integration",
				launch: "Optional",
				scale: true,
				enterprise: "Enterprise CMS",
			},
			{
				name: "Custom Database Design",
				launch: "Basic",
				scale: "Optimized",
				enterprise: "Scalable Architecture",
			},
		],
	},
	{
		category: "Cloud & Infrastructure",
		features: [
			{
				name: "Cloud Hosting Support",
				launch: "Shared/Basic",
				scale: "VPC / Initial Cloud",
				enterprise: "Multi-Cloud / High Availability",
			},
			{
				name: "DevOps & CI/CD",
				launch: false,
				scale: "Basic Pipeline",
				enterprise: "Full Automation",
			},
			{
				name: "Server Monitoring",
				launch: "Manual",
				scale: "Automated 24/7",
				enterprise: "Predictive Management",
			},
		],
	},
	{
		category: "Security & Compliance",
		features: [
			{
				name: "Standard Security (SSL/WAF)",
				launch: true,
				scale: true,
				enterprise: true,
			},
			{
				name: "Security Audits",
				launch: false,
				scale: "Quarterly",
				enterprise: "Continuous Monitoring",
			},
			{
				name: "Compliance (GDPR/Data)",
				launch: "Basic",
				scale: "Standard",
				enterprise: "Deep Compliance",
			},
			{
				name: "Penetration Testing",
				launch: false,
				scale: false,
				enterprise: "Full External Audit",
			},
		],
	},
	{
		category: "Intelligence & Automation",
		features: [
			{
				name: "AI/ML Capabilities",
				launch: false,
				scale: "Basic Integration",
				enterprise: "Custom Models",
			},
			{
				name: "Process Automation",
				launch: "Form-based",
				scale: "Webhook-driven",
				enterprise: "Full Workflow Automation",
			},
			{
				name: "Data Analytics",
				launch: "Google Analytics",
				scale: "Custom Dashboards",
				enterprise: "Predictive Analytics",
			},
		],
	},
	{
		category: "Support & SLAs",
		features: [
			{
				name: "Post-Launch Support",
				launch: "7 Days",
				scale: "30 Days",
				enterprise: "Custom Service Agreement",
			},
			{
				name: "Response SLA",
				launch: "48 Hours",
				scale: "12 Hours",
				enterprise: "Under 1 Hour",
			},
			{
				name: "Account Management",
				launch: "Support Portal",
				scale: "Shared Account Manager",
				enterprise: "Dedicated Engineering Lead",
			},
		],
	},
];
