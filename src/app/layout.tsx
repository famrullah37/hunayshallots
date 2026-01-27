import type { Metadata } from "next";
import { Quicksand, Nunito } from "next/font/google";
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
      <body className={`${quicksand.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
