'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      backgroundColor: 'var(--footer-bg)',
      borderTop: '1px solid var(--footer-border)',
      padding: '0.75rem 1.5rem',
      fontSize: '0.75rem',
      color: 'var(--text-light)',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 300,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Left Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ fontWeight: 400, color: 'var(--text-main, #495057)' }}>
            myKDS - Students&apos; Academic Performance Management System
          </div>
          <div>
            &copy; 2026 Kids Den School
          </div>
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>
            Terms and Conditions
          </Link>
          <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
          <Link href="/support" style={{ color: 'inherit', textDecoration: 'none' }}>
            Help and Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
