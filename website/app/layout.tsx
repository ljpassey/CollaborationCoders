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
          <div className=" w-full fixed -top-40 -right-52 opacity-25  -z-30">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g fill="none" fill-rule="evenodd">
                  {" "}
                  <circle cx="16" cy="16" fill="#db610f" r="16"></circle>{" "}
                  <path
                    d="M12.605 9.155c-.857 0-1.552-.706-1.552-1.577S11.748 6 12.605 6c.858 0 1.553.706 1.553 1.578s-.695 1.577-1.553 1.577zM19.447 26a1.565 1.565 0 01-1.552-1.578c0-.87.695-1.577 1.552-1.577.858 0 1.553.706 1.553 1.577 0 .872-.695 1.578-1.553 1.578zm-6.205-11.79a1.38 1.38 0 01-1.955-.265 1.432 1.432 0 01.26-1.986l7.158-5.562a1.38 1.38 0 011.955.265 1.432 1.432 0 01-.26 1.987zm.053 5.669a1.38 1.38 0 01-1.955-.265 1.432 1.432 0 01.26-1.987l7.158-5.561a1.38 1.38 0 011.955.265 1.432 1.432 0 01-.26 1.986zm0 5.829a1.38 1.38 0 01-1.955-.265 1.432 1.432 0 01.26-1.987l7.158-5.561a1.38 1.38 0 011.955.265 1.432 1.432 0 01-.26 1.986z"
                    fill="#ffffff"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <div className="flex min-h-screen">{children}</div>

          <Footer />
        </main>
      </body>
    </html>
  );
}
