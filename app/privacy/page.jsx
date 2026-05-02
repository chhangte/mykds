import BackButton from '@/components/BackButton';

export default function PrivacyPage() {
  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <BackButton />
      
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--charcoal)', marginBottom: '1.5rem' }}>
        Privacy Policy
      </h1>
      
      <div style={{ lineHeight: '1.6', color: 'var(--charcoal-light)', fontSize: '0.95rem' }}>
        <p style={{ marginBottom: '1rem' }}>Last updated: May 02, 2026</p>
        
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          1. Data Collection
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          myKDS collects and stores student academic records, including marks, attendance, and basic profile information. We also log teacher activity (edits and logins) to ensure accountability and data integrity.
        </p>
        
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          2. Use of Information
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          The collected data is used exclusively for academic management, generating marksheets, tracking student progress, and school administration. Data is never sold or shared with third-party advertisers.
        </p>
        
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          3. Data Security
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          We implement industry-standard security measures to protect student data. Access is restricted based on roles (Teacher/Admin), and all sessions are encrypted.
        </p>
        
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          4. Data Retention
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          Academic records are retained as part of the school&apos;s official history. Requests for data deletion or correction should be directed to the school administration.
        </p>
        
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          5. Cookies
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          We use essential cookies to maintain your login session and theme preferences. No tracking or marketing cookies are used in this system.
        </p>
      </div>
    </div>
  );
}
