'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar({ role, name }) {
  const router = useRouter();

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      background: 'white',
      borderBottom: '1.5px solid var(--sky-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.25rem',
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(135,206,250,0.12)',
    }}>
      {/* Logo */}
      <div
        onClick={() => router.push(role === 'admin' ? '/admin' : '/teacher')}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
      >
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'var(--sky)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
        }}>🎒</div>
        <span style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: '0.9rem',
          color: 'var(--charcoal)',
        }}>
          my.kidsdenschool
        </span>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Role badge */}
        <span style={{
          background: 'var(--sky-light)',
          color: 'var(--charcoal)',
          fontSize: '0.72rem',
          fontWeight: 600,
          padding: '3px 10px',
          borderRadius: 20,
          textTransform: 'capitalize',
          display: 'none', // hidden on very small screens
        }}
          className="role-badge"
        >
          {role}
        </span>

        {/* Name */}
        {name && (
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--charcoal-light)',
            maxWidth: 120,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {name}
          </span>
        )}

        {/* Sign out button */}
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          style={{
            background: 'transparent',
            border: '1.5px solid var(--sky-light)',
            borderRadius: 8,
            padding: '5px 12px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.78rem',
            fontWeight: 500,
            color: 'var(--charcoal)',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--sky-light)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          Sign out
        </button>
      </div>

      <style>{`
        @media (min-width: 480px) {
          .role-badge { display: inline !important; }
        }
      `}</style>
    </nav>
  );
}