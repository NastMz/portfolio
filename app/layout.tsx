import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kevin Martinez',
  description: 'Portfolio de Kevin Martinez, desarrollador backend .NET'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
