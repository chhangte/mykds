'use client';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function SignOutPage() {
  useEffect(() => {
    // Adding a short delay for better UX before actually clearing the session and redirecting
    const timer = setTimeout(() => {
      signOut({ callbackUrl: '/login' });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg, #f7fbff)',
      flexDirection: 'column',
      padding: '1rem'
    }}>
      <style>{`
        @keyframes kds-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes kds-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .signout-logo {
          animation: kds-bounce 2.5s ease-in-out infinite;
        }
        .signout-card {
          animation: kds-fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes kds-spin { 
          0% { transform: rotate(0deg); } 
          100% { transform: rotate(360deg); } 
        }
      `}</style>

      <div className="signout-card" style={{
        background: 'white',
        padding: '3rem 2rem',
        borderRadius: 24,
        boxShadow: '0 10px 40px rgba(66, 133, 244, 0.08)',
        border: '1px solid #f0f4ff',
        textAlign: 'center',
        maxWidth: 380,
        width: '100%'
      }}>


        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>
          Signing out...
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-light)', marginBottom: 32 }}>
          Happy Teaching!
        </p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 28, height: 28,
            border: '3px solid #d2e3fc',
            borderTop: '3px solid #4285F4',
            borderRadius: '50%',
            animation: 'kds-spin 1s linear infinite'
          }} />
        </div>
      </div>
    </div>
  );
}
