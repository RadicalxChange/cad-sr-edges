import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";
import Header from "@/components/header";
import MobileNav from "@/components/mobileNav";
import { BalanceProvider } from "@/context/balanceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ɖears",
  description: "A ledger for ɖears holders",
  metadataBase: new URL(process.env.AUTH0_BASE_URL || "http://localhost:3000"),
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    images: '/opengraph-image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <BalanceProvider>
          <body className={inter.className}>
            <Header />
            <MobileNav />
            {children}
          </body>
        </BalanceProvider>
      </UserProvider>
    </html>
  );
}
