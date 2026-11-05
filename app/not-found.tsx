import Link from 'next/link';
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{background: '#07060a', color: '#f1ece4', fontFamily: 'system-ui, sans-serif'}}>
        <main style={{minHeight: '100svh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '2rem'}}>
          <div>
            <p style={{fontSize: '6rem', fontWeight: 900, margin: 0, color: '#9d5cff'}}>404</p>
            <p style={{margin: '0 0 2rem'}}>Lost in the night. / Perdu·e dans la nuit.</p>
            <Link href="/" style={{background: '#9d5cff', color: '#07060a', padding: '1rem 2rem', borderRadius: 999, fontWeight: 700, textDecoration: 'none', letterSpacing: '.15em', textTransform: 'uppercase', fontSize: 14}}>
              Kyx-Nyx →
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
