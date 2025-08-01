import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})


export const metadata: Metadata = {
  title: "SH Beauty",
  description: "Beleza e Estilo para Sobrancelhas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br " className={`${cormorant.className} `}>
      <body
        className='font-serif'
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
