import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dunerise",
  description: "Dunerise Development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <main>
          <Nav />
         
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
