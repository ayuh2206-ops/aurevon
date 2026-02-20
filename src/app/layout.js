import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Aurevon Realty — Premium Commercial Real Estate in Pune | 25+ Years Experience",
  description: "Aurevon Realty Pvt. Ltd. — Pune's most trusted commercial real estate partner since 2001. Office spaces, retail shops, co-working & pre-leased investments. NRI advisory. RERA registered. 1,000+ deals closed.",
  keywords: "commercial property Pune, office space Pune, retail shop Pune, IT park investment, co-working space, NRI commercial investment India, RERA registered broker, Baner commercial, Kharadi office, Hinjewadi IT park",
  openGraph: {
    title: "Aurevon Realty — Where Vision Meets Commerce",
    description: "25 years of curating exceptional commercial properties across India. 8%+ average yields.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
