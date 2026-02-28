import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Aurevon Realty — Premium Real Estate in Pune | 25+ Years Experience",
  description: "Aurevon Realty Pvt. Ltd. — Pune's most trusted real estate partner since 2001. Premium homes, office spaces, retail shops & investments. NRI advisory. RERA registered. 1,000+ deals closed.",
  keywords: "real estate Pune, luxury homes Pune, commercial property Pune, office space Pune, retail shop Pune, NRI investment India, RERA registered broker",
  openGraph: {
    title: "Aurevon Realty — Where Vision Meets Reality",
    description: "25 years of curating exceptional properties across India.",
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
