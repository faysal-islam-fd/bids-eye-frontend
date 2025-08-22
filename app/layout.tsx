import ReduxProvider from "@/redux/app/ReduxProvider"; // Import ReduxProvider
import "./globals.css"; // Your global styles
import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import ParantLayout from "@/components/layout/ParantLayout";
import NProgressHandler from "@/lib/nProgressHandler"; // Custom progress handler

// Premium typography setup
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ["400","500","600","700","800"],
});

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Birds Eye Fashion - Premium Fashion Collection",
  description: "Discover premium fashion collections at Birds Eye Fashion. Shop the latest trends in clothing, accessories, and more with fast delivery and excellent customer service.",
  keywords: "fashion, clothing, premium fashion, online shopping, birds eye fashion",
  authors: [{ name: "Birds Eye Fashion" }],
  creator: "Birds Eye Fashion",
  publisher: "Birds Eye Fashion",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://birdseyefashion.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://birdseyefashion.com",
    siteName: "Birds Eye Fashion",
    title: "Birds Eye Fashion - Premium Fashion Collection",
    description: "Discover premium fashion collections at Birds Eye Fashion. Shop the latest trends in clothing, accessories, and more.",
    images: [
      {
        url: "/logo-big.png",
        width: 1200,
        height: 630,
        alt: "Birds Eye Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Birds Eye Fashion - Premium Fashion Collection",
    description: "Discover premium fashion collections at Birds Eye Fashion.",
    images: ["/logo-big.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfairDisplay.variable}`}>
      <body className="font-montserrat antialiased">
        {/* NProgressHandler is responsible for route change progress bar */}
        <NProgressHandler />
        <ReduxProvider>
          <ParantLayout>{children}</ParantLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
