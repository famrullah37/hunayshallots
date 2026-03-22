import type { Metadata } from "next";
import { Quicksand, Nunito } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Script from "next/script";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hunay - Camilan Bawang Renyah, Teman Setia Makan Nasi",
  description:
    "Hunay - Bawang goreng berkualitas, renyah, gurih, dan cocok untuk semua hidangan. Halal, higienis, dan tanpa pengawet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <Script
          src="https://analytics.hunayshallots.com/script.js"
          data-website-id="4b355a33-ad7e-4000-84ed-954c780a48f6"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${quicksand.variable} ${nunito.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
