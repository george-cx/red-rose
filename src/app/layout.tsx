/**
 * Passthrough root. The real document lives in app/[locale]/layout.tsx, which
 * is where the locale is known and <html lang> can be set correctly.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
