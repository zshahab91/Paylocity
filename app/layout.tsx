import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import "../public/scss/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Akkar Test",
  description: "Generated by Zahra Shahab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
