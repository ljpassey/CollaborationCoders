import "./globals.css";

import Nav from "../components/Nav";
import "@picocss/pico";

export const metadata = {
  title: "Collaboration Coders",
  description:
    "Collection of blog posts from the Collaboration Coders community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="css/pico.min.css" />
      </head>
      <body>
        <main class="container">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
