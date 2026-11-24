import Link from 'next/link';

/**
 * The root 404, outside any locale segment, so it cannot use translations —
 * it offers all three instead.
 */
export default function NotFound() {
  return (
    <html lang="ka">
      <body
        style={{
          background: '#100E0A',
          color: '#DAD4C0',
          fontFamily: 'system-ui, sans-serif',
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <main style={{ padding: '3rem 1.5rem', maxWidth: '34rem' }}>
          <p style={{ letterSpacing: '0.22em', margin: 0 }}>RED ROSE</p>
          <h1 style={{ fontSize: '1.95rem', margin: '1rem 0 0.5rem' }}>404</h1>
          <p style={{ color: '#9C9384', margin: '0 0 2rem' }}>
            გვერდი ვერ მოიძებნა · Page not found · Страница не найдена
          </p>
          <p style={{ display: 'flex', gap: '1.5rem', margin: 0 }}>
            <Link href="/ka/" style={{ color: '#D3A01C' }}>ქართული</Link>
            <Link href="/en/" style={{ color: '#D3A01C' }}>English</Link>
            <Link href="/ru/" style={{ color: '#D3A01C' }}>Русский</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
