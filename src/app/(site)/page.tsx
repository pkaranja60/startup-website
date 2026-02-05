import CTAWrapper from "@/components/common/CTAWrapper";
import CaseStudiesSection from "@/components/landing/CaseStudiesSection";
import HeroSection from "@/components/landing/HeroSection";
import ProcessSection from "@/components/landing/ProcessSection";
import ServicesSection from "@/components/landing/ServiceSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import { client } from "@/sanity/lib/client";
import { LATEST_PROJECTS_QUERY } from "@/sanity/lib/queries";
import { Project } from "@/sanity/lib/types";

export const revalidate = 60;

export default async function Home() {
	const projects: Project[] = await client.fetch(LATEST_PROJECTS_QUERY);

	return (
		<>
			<main className="min-h-screen overflow-hidden">
				<HeroSection />
				<ServicesSection />
				<WhyChooseUs />
				<ProcessSection />
				<CaseStudiesSection projects={projects} />
				<TestimonialsSection />
				<CTAWrapper />
			</main>
		</>
	);
}
