import type { Metadata } from "next";
import { Mali } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./Provinders";

const mali = Mali({
  variable: "--font-mali",
  subsets: ["latin", "thai"],
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "LearnLabs",
  description: "SC Technical Learning Platform",
  icons: {
    icon: '/SCLogo'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mali.variable} bg-SC1 antialiased`}
      > 
        <AuthProvider>
          <Navbar/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
