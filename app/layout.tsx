import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '工作性价比',
  description: 'Created with Wu',
  generator: 'Astar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
