import './globals.css'
import '@/features/v2/tokens/tokens.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
