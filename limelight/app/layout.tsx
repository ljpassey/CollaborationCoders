import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Limelight Prep",
  description: "Limelight Preparation Services",
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
          <div className=" w-full fixed  sm:-top-40 top-10  sm:-right-40 opacity-25  -z-30">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M382.06 249c-4.73-14.2-12-26.54-24.26-41.27l-.12-.14a134.1 134.1 0 0 0-62.95-40.34 40 40 0 0 0-16.57-27.2 70 70 0 0 0 55.08-77.35l-.68-5.39-5.39-.68a70 70 0 0 0-78.43 76.63 40 40 0 0 0-33.15 34.21c-49.91 15.14-87.84 61.15-93 113.55-2 18.65.5 38.48 7.33 58.95 4.73 14.19 12 26.54 24.26 41.27l.12.14a134.25 134.25 0 0 0 61.28 39.83 39.93 39.93 0 0 0 79 .78c50.78-14.58 89.54-61 94.74-114 2.03-18.68-.43-38.51-7.26-58.99zM278.76 86.49a55.5 55.5 0 0 1 41-16.38 56 56 0 0 1-57.4 57.4 55.57 55.57 0 0 1 16.4-41.02zm96.7 220.06c-4.72 48.07-40.2 90.07-86.45 102.5a6.84 6.84 0 0 0-.91-.06 7 7 0 0 0-7 7 25.93 25.93 0 0 1-50.26 8.95q5.94 1.08 12 1.63h.62a7 7 0 0 0 .61-14 119.28 119.28 0 0 1-79.18-40.4c-11-13.27-17.53-24.24-21.67-36.66-6.19-18.55-8.44-36.4-6.68-53.1 4.75-48.4 40.68-90.66 87.39-102.77a7 7 0 0 0 4.93-4.73 7.13 7.13 0 0 0 .39-2.28 25.93 25.93 0 0 1 50.28-8.9c-3.43-.58-6.88-1-10.37-1.34a7 7 0 1 0-1.23 13.94 119.33 119.33 0 0 1 79.18 40.41c11.05 13.27 17.53 24.24 21.67 36.65 6.22 18.61 8.44 36.46 6.68 53.16z" />
            </svg>
          </div>

          <div className="flex min-h-screen">{children}</div>

          <Footer />
        </main>
      </body>
    </html>
  );
}
