import type { Metadata } from "next";

export const rootMetadata: Metadata = {
  title: {
    default: "DrD Solutions | Digital Solutions Built for Growth",
    template: "%s | DrD Solutions"
  },
  description:
    "DrD Solutions builds high-performance websites, mobile applications, and digital brands designed to scale. Modern technology, clean design, and reliable support.",
  keywords: [
    "web development",
    "mobile app development",
    "branding",
    "digital solutions",
    "digital transformation",
    "startup solutions",
    "Next.js development",
    "enterprise solutions",
    "SEO optimization",
    "cloud hosting"
  ],
  authors: [{ name: "DrD Solutions" }],
  creator: "DrD Solutions",
  publisher: "DrD Solutions",
  metadataBase: new URL("https://drdsolutions.com"), // update if needed
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drdsolutions.com",
    title: "DrD Solutions | Digital Solutions Built for Growth",
    description:
      "High-performance web development, mobile apps, and branding solutions built to help your business grow.",
    siteName: "DrD Solutions",
    images: [
      {
        url: "/drdsolutions.png",
        width: 1200,
        height: 720,
        alt: "DrD Solutions - Digital Solutions Built for Growth"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DrD Solutions | Digital Solutions Built for Growth",
    description:
      "High-performance web development, mobile apps, and branding solutions built to scale.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code",
    yandex: 'yoour-andex-verification-code'
  }
};

export const pricingMetadata: Metadata = {
  title: "Pricing Plans",
  description:
    "Clear, transparent pricing for web development, mobile apps, and branding services. No hidden fees, just reliable results.",
  openGraph: {
    title: "Pricing Plans | DrD Solutions",
    description:
      "Transparent pricing for professional digital solutions."
  }
};

export const bookCallMetadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Book a free discovery call with DrD Solutions to discuss your project, goals, and technical requirements.",
  openGraph: {
    title: "Book a Discovery Call | DrD Solutions",
    description:
      "Book a free discovery call and explore how DrD Solutions can help bring your project to life."
  }
};

export const blogMetadata: Metadata = {
  title: "Blog",
  description:
    "Insights, tips, and articles about web development, mobile apps, and digital branding from the experts at DrD Solutions.",
  openGraph: {
    title: "Blog | DrD Solutions",
    description:
      "Expert insights on digital solutions, development, and branding."
  }
};

export const caseStudyMetadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore our portfolio of successful projects, from high-performance websites to innovative mobile applications.",
  openGraph: {
    title: "Case Studies | DrD Solutions",
    description:
      "Real-world examples of how we've helped businesses scale through modern technology."
  }
};

