import "./globals.css";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import Providers from "@/components/Providers";
import StructuredData from "@/components/StructuredData";
import { BUSINESS } from "@/lib/config";
import { getContentSettings } from "@/lib/firebaseUtils";
import { DEFAULT_CONTENT_SETTINGS } from "@/lib/realEstate";

export async function generateMetadata() {
  const settings = await getContentSettings().catch(() => DEFAULT_CONTENT_SETTINGS);
  const baseUrl = settings.websiteBaseUrl || BUSINESS.websiteBaseUrl;
  const title = settings.seoTitle || DEFAULT_CONTENT_SETTINGS.seoTitle;
  const description = settings.seoDesc || DEFAULT_CONTENT_SETTINGS.seoDesc;
  const image = settings.heroImage || DEFAULT_CONTENT_SETTINGS.heroImage;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: "%s | Aurevon Realty",
    },
    description,
    keywords: settings.seoKeywords || DEFAULT_CONTENT_SETTINGS.seoKeywords,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: BUSINESS.businessName,
      images: [image],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <Providers>
          {children}
        </Providers>
        <StructuredData />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
