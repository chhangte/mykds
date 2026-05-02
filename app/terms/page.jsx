import BackButton from '@/components/BackButton';

export default function TermsPage() {
  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <BackButton />
      
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--charcoal)', marginBottom: '1.5rem' }}>
        Terms and Conditions
      </h1>
      
      <div style={{ lineHeight: '1.6', color: 'var(--charcoal-light)', fontSize: '0.95rem' }}>
        <p style={{ marginBottom: '1rem' }}>Last updated: May 02, 2026</p>
        
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          1. Acceptance of Terms
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          By accessing and using myKDS (Students&apos; Academic Performance System), you agree to be bound by these Terms and Conditions. This system is exclusively for the use of authorized staff and administrators of Kids Den School.
        </p>
        
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          2. User Obligations
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          Users are responsible for maintaining the confidentiality of their login credentials. Any activity occurring under your account is your responsibility. You agree to notify administration immediately of any unauthorized use.
        </p>
        
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          3. Data Accuracy and Backup
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          Teachers and administrators are responsible for the accuracy of the marks, attendance, and student data they input into the system. Intentional falsification of academic records is strictly prohibited and may result in disciplinary action.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          <strong>Important:</strong> To ensure data safety, all teachers are required to maintain a separate physical copy or offline backup of all marks and academic records entered into the system.
        </p>
        
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          4. Intellectual Property
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          The software, including its design, code, and branding (myKDS), is the property of Kids Den School. Unauthorized reproduction or distribution is prohibited.
        </p>
        
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '2rem', marginBottom: '1rem' }}>
          5. Limitation of Liability
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          While we strive for 100% uptime and data accuracy, Kids Den School is not liable for any temporary service interruptions or incidental data discrepancies.
        </p>
      </div>
    </div>
  );
}
