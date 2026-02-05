"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react"; // Add Moon and Sun icons
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes"; // Import useTheme
import { useEffect, useState } from "react";
import { services } from "@/data/otherData";

const navLinks = [
	{ label: "Home", href: "/" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "Case Studies", href: "/case-studies" },
	{ label: "Blog", href: "/blog" },
];

interface NavLinkProps {
	href: string;
	label: string;
	isActive?: boolean;
}

const NavLink = ({ href, label, isActive }: NavLinkProps) => (
	<Link
		href={href}
		className={`text-sm font-medium transition-colors relative group ${
			isActive ? "text-primary" : "text-text-secondary hover:text-foreground"
		}`}
	>
		{label}
		<span
			className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
				isActive ? "w-full" : "w-0 group-hover:w-full"
			}`}
		/>
	</Link>
);

interface MobileNavLinkProps extends NavLinkProps {
	onClick: () => void;
}

const MobileNavLink = ({
	href,
	label,
	onClick,
	isActive,
}: MobileNavLinkProps) => (
	<Link
		href={href}
		className={`text-base font-medium py-3 px-4 rounded-xl transition-all ${
			isActive
				? "text-primary bg-primary/5"
				: "hover:text-primary hover:bg-white/5"
		}`}
		onClick={onClick}
	>
		{label}
	</Link>
);

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [servicesOpen, setServicesOpen] = useState(false);

	const pathname = usePathname();

	// Theme management using next-themes
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	// Toggle theme function
	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	const ThemeToggle = () => (
		<button
			onClick={toggleTheme}
			className="relative p-2 rounded-full glass-card hover:bg-white/10 transition-all duration-300 group overflow-hidden"
			aria-label="Toggle theme"
		>
			<div className="relative w-6 h-6">
				<AnimatePresence mode="wait" initial={false}>
					{theme === "dark" ? (
						<motion.div
							key="sun"
							initial={{ y: 20, opacity: 0, rotate: 45 }}
							animate={{ y: 0, opacity: 1, rotate: 0 }}
							exit={{ y: -20, opacity: 0, rotate: -45 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="absolute inset-0"
						>
							<Sun className="w-6 h-6 text-yellow-500" />
						</motion.div>
					) : (
						<motion.div
							key="moon"
							initial={{ y: 20, opacity: 0, rotate: 45 }}
							animate={{ y: 0, opacity: 1, rotate: 0 }}
							exit={{ y: -20, opacity: 0, rotate: -45 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="absolute inset-0"
						>
							<Moon className="w-6 h-6 text-slate-700" />
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Subtle background glow effect on hover */}
			<motion.div
				className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				aria-hidden="true"
			/>
		</button>
	);

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 md:px-6">
				<motion.nav
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className={`glass max-w-6xl mx-auto rounded-full px-6 md:px-8 py-4 flex items-center justify-between transition-all duration-300 ${
						scrolled ? "shadow-lg shadow-black/20" : ""
					}`}
					aria-label="Main navigation"
				>
					{/* Logo */}
					<Link
						href="/"
						className="text-xl md:text-2xl font-display font-bold tracking-tight"
					>
						DrD <span className="text-primary">Solutions</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-10">
						{navLinks.map((link) => (
							<NavLink
								key={link.href}
								{...link}
								isActive={pathname === link.href}
							/>
						))}

						{/* Services Dropdown */}
						<div className="relative">
							<button
								onMouseEnter={() => setServicesOpen(true)}
								onMouseLeave={() => setServicesOpen(false)}
								className="text-sm font-medium text-text-secondary hover:text-foreground flex items-center gap-1 transition-colors relative group"
							>
								Services <ChevronDown size={16} />
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
							</button>

							<AnimatePresence>
								{servicesOpen && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2 }}
										onMouseEnter={() => setServicesOpen(true)}
										onMouseLeave={() => setServicesOpen(false)}
										className="absolute top-full pt-4 left-0 w-64 z-50"
									>
										<div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 border border-white/10 overflow-hidden">
											{services.map((service) => (
												<Link
													key={service.slug}
													href={`/services/${service.slug}`}
													className="block px-4 py-3 text-text-primary hover:text-primary hover:bg-white/5 transition-all text-sm"
												>
													{service.title}
												</Link>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* Conditional Book Link */}
						{pathname === "/case-studies" || pathname === "/blog" ? (
							<Link
								href="/book"
								className="bg-primary hover:bg-primary-hover text-background px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 shadow-lg shadow-primary/30 hover:shadow-primary/50"
							>
								Book a Discovery Call
							</Link>
						) : null}
					</div>

					<div className="flex items-center gap-2">
						{/* Theme Toggle Button */}
						<ThemeToggle />

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="md:hidden text-text-secondary hover:text-foreground transition-colors p-2"
							aria-label="Toggle menu"
							aria-expanded={isOpen}
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</motion.nav>
			</header>

			{/* Mobile Navigation Overlay */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
							onClick={() => setIsOpen(false)}
						/>

						{/* Mobile Menu */}
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
							className="fixed top-30 left-4 right-4 z-50 md:hidden"
						>
							<div className="bg-card/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-black/40 border border-white/10 max-h-[80vh] overflow-y-auto">
								<div className="flex flex-col gap-2">
									{navLinks.map((link) => (
										<MobileNavLink
											key={link.href}
											{...link}
											isActive={pathname === link.href}
											onClick={() => setIsOpen(false)}
										/>
									))}

									<div className="h-px bg-border-subtle my-2" />

									<div className="flex flex-col gap-1 mb-4">
										<p className="px-4 text-xs font-bold text-text-tertiary uppercase tracking-wider mb-1">
											Our Services
										</p>
										{services.map((service) => (
											<Link
												key={service.slug}
												href={`/services/${service.slug}`}
												className="text-base font-medium py-3 px-4 hover:text-primary hover:bg-white/5 rounded-xl transition-all"
												onClick={() => setIsOpen(false)}
											>
												{service.title}
											</Link>
										))}
									</div>

									<Link
										href="/book"
										className="bg-primary hover:bg-primary-hover text-background px-6 py-3.5 rounded-full font-bold text-center shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95"
										onClick={() => setIsOpen(false)}
									>
										Book a Discovery Call
									</Link>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
