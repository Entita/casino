import './globals.css'

export const metadata = {
  title: 'Casino',
  description: 'Website made for casino televisions.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
