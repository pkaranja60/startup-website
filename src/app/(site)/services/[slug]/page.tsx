// app/services/[slug]/page.tsx
import NotFound from "@/app/not-found";
import CybersecurityLayout from "@/components/services/layouts/CybersecurityLayout";
import CloudLayout from "@/components/services/layouts/CloudLayout";
import DatabaseLayout from "@/components/services/layouts/DatabaseLayout";
import MobileDevLayout from "@/components/services/layouts/MobileDevLayout";
import AILayout from "@/components/services/layouts/AILayout";
import WebDevLayout from "@/components/services/layouts/WebDevLayout";
import { services } from "@/data/otherData";
import DefaultServiceLayout from "@/components/services/layouts/DefaultServiceLayout";

interface ServiceProps {
  params: { slug: string };
}

export default async function ServicePage({ params }: ServiceProps) {
  const { slug } = await params;

  // Find service by slug
  const service = services.find(s => s.slug === slug);

  if (!service) return <NotFound/>;

  switch (service.slug) {
    case "web-development":
      return <WebDevLayout />;
    case "mobile-development":
      return <MobileDevLayout />;
    case "cybersecurity":
      return <CybersecurityLayout />;
    case "cloud":
      return <CloudLayout />;
    case "database":
      return <DatabaseLayout />;
    case "ai":
      return <AILayout />;
    default:
      return <DefaultServiceLayout />;
  }
}

// Pre-generate all service pages (SSG)
export async function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServiceProps) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);

  return {
    title: service?.title || "Service",
  };
}
