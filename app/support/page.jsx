import BackButton from '@/components/BackButton';

export default function SupportPage() {
  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <BackButton />

      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--charcoal)', marginBottom: '1.5rem' }}>
        Help and Support
      </h1>

      <div style={{ lineHeight: '1.6', color: 'var(--charcoal-light)', fontSize: '0.95rem' }}>
        <p style={{ marginBottom: '1.5rem' }}>
          Welcome to the myKDS Support Center. If you are experiencing issues with the system, please refer to the guides below or contact us directly.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--white)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '0.5rem' }}>Technical Issues</h3>
            <p style={{ fontSize: '0.85rem' }}>For login failures, page errors, or slow performance, please clear your browser cache or try a different browser.</p>
          </div>
          <div style={{ background: 'var(--white)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '0.5rem' }}>Data Corrections</h3>
            <p style={{ fontSize: '0.85rem' }}>If you find incorrect student data or marks that you cannot edit, please contact the Admin office with the specific details.</p>
          </div>
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          Contact Us
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          For immediate assistance, you can reach out to the IT department through the following channels:
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Direct Link: <a href="https://link.kidsdenschool.in/u1T4boZT" style={{ color: 'var(--sky)', textDecoration: 'none' }}>Submit a Support Ticket</a></li>
          <li style={{ marginBottom: '0.5rem' }}>Email: support@kidsdenschool.in</li>
        </ul>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ marginBottom: '1rem' }}>
          <details style={{ marginBottom: '0.75rem', padding: '0.75rem', background: 'var(--sky-light)', borderRadius: '8px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 600, fontSize: '0.9rem' }}>How do I change my password?</summary>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Passwords are managed through the central administration. Please visit the IT office for a password reset request.</p>
          </details>
          <details style={{ marginBottom: '0.75rem', padding: '0.75rem', background: 'var(--sky-light)', borderRadius: '8px', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 600, fontSize: '0.9rem' }}>Can I access myKDS from home?</summary>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Yes, the system is cloud-based and accessible from any device with an internet connection via my.kidsdenschool.in.</p>
          </details>
        </div>
      </div>
    </div>
  );
}
