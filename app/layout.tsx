import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'FixPro | Reparatur für Ihre Haushaltsgeräte',
  description: 'Waschmaschinen, Kaffeemaschinen und Lautsprecher: Entdecken Sie den Reparaturservice von FixPro und fragen Sie Ihren Termin an.',
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de" dir="ltr"><body>{children}</body></html>
}
