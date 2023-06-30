import './globals.css'

import Nav from '../components/Nav'

export const metadata = {
  title: 'Collaboration Coders',
  description: 'Collection of blog posts from the Collaboration Coders community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}
