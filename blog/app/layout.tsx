import "./globals.css";

import Nav from "../components/Nav";

export const metadata = {
  title: "Collaboration Coders",
  description:
    "Collection of blog posts from the Collaboration Coders community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="css/pico.min.css" />
      </head>
      <body>
        <main>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
