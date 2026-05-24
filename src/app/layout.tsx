import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Grain, ScrollProgress, CursorDot } from "@/components/ui";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saikannan-portfolio.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Saikannan Sathish Portfolio",
    template: "%s | Saikannan Sathish",
  },
  description:
    "MS Computer Science student specializing in AI at Binghamton University. Building AI-powered products and scalable systems - from multi-agent LLM pipelines to full-stack applications.",
  keywords: [
    "Saikannan Sathish",
    "software engineer",
    "AI engineer",
    "machine learning engineer",
    "RAG",
    "LangGraph",
    "LangChain",
    "full-stack",
    "portfolio",
    "Binghamton University",
  ],
  authors:  [{ name: "Saikannan Sathish", url: siteUrl }],
  creator:  "Saikannan Sathish",

  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         siteUrl,
    siteName:    "Saikannan Sathish",
    title:       "Saikannan Sathish — Software Engineer",
    description:
      "MS Computer Science (AI) at Binghamton University. Building AI-powered products and scalable systems.",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Saikannan Sathish — Software Engineer",
    description:
      "MS Computer Science (AI) at Binghamton University. Building AI-powered products and scalable systems.",
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:                true,
      follow:               true,
      "max-video-preview":  -1,
      "max-image-preview":  "large",
      "max-snippet":        -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor:  "#080808",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type":    "Person",
  name:       "Saikannan Sathish",
  url:        siteUrl,
  jobTitle:   "Software Engineer",
  description:
    "MS Computer Science student specializing in AI at Binghamton University.",
  sameAs: [
    "https://github.com/Saikannan1805",
    "https://www.linkedin.com/in/saikannansathish/",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name:    "Binghamton University, State University of New York",
    },
    {
      "@type": "CollegeOrUniversity",
      name:    "Sri Ramachandra University",
    },
  ],
  knowsAbout: [
    "Machine Learning",
    "Artificial Intelligence",
    "Retrieval-Augmented Generation",
    "LangGraph",
    "Software Engineering",
    "FastAPI",
    "React",
    "Next.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-text-primary font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Grain />
        <ScrollProgress />
        <CursorDot />
        {children}
      </body>
    </html>
  );
}
