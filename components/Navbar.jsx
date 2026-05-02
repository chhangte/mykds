'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';

function LoginHistoryModal({ onClose }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    fetch('/api/auth/login-history')
      .then(r => r.json())
      .then(d => { setHistory(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const fmt = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300,
      padding: '1.25rem'
    }}>
      <div ref={modalRef} style={{
        background: 'var(--card-bg)', borderRadius: 20, width: '100%', maxWidth: 400,
        maxHeight: '80vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        animation: 'kds-fade-up 0.3s ease both', overflow: 'hidden'
      }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--charcoal)' }}>Login History</h3>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--sky-light)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal-light)' }}>✕</button>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '0.5rem 0' }}>
          {loading && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--charcoal-light)' }}>Loading...</div>}
          {!loading && history.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--charcoal-light)' }}>No login history yet.</div>}
          {!loading && history.map((entry, i) => (
            <div key={entry._id || i} style={{ padding: '0.8rem 1.25rem', borderBottom: '1px solid #f0f4ff', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: i === 0 ? '#1a8a3c' : 'var(--sky-light)', marginTop: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal)' }}>{fmt(entry.loginAt)}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-light)', marginTop: 4, display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {i === 0 && <span style={{ background: '#e6f9ee', color: '#1a8a3c', padding: '1px 6px', borderRadius: 10, fontWeight: 600 }}>Current</span>}
                  <span style={{ background: entry.changesCount > 0 ? '#fff8e1' : '#f5f5f5', color: entry.changesCount > 0 ? '#c67c00' : '#999', padding: '1px 7px', borderRadius: 10, fontWeight: 600 }}>
                    {entry.changesCount > 0 ? `${entry.changesCount} edit${entry.changesCount !== 1 ? 's' : ''}` : 'No edits'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
          <button onClick={onClose} style={{ width: '100%', padding: '0.7rem', borderRadius: 12, background: 'var(--sky-light)', border: 'none', color: 'var(--charcoal)', fontWeight: 600, cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </div>
  );
}

function ProfileDrawer({ onClose, role, name, username }) {
  const [showHistory, setShowHistory] = useState(false);
  const drawerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const btnStyle = {
    display: 'block', width: '100%', padding: '0.75rem 1rem',
    borderRadius: 12, border: 'none', textAlign: 'left',
    fontFamily: 'Inter', fontWeight: 600, fontSize: '0.85rem',
    cursor: 'pointer', transition: 'all 0.2s', marginBottom: '0.5rem',
    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem'
  };

  return (
    <>
      <div ref={drawerRef} style={{
        position: 'fixed', top: 66, right: 12, width: 280,
        background: 'var(--card-bg)', borderRadius: 20, zIndex: 200,
        border: '1px solid var(--border)',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        display: 'flex', flexDirection: 'column',
        animation: 'kds-fade-up 0.2s ease both',
        padding: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--charcoal)', marginBottom: '0.1rem' }}>{name || 'User'}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--charcoal-light)' }}>@{username}</div>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--sky-light)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.9rem', color: 'var(--charcoal-light)', transition: 'all 0.2s'
          }} onMouseOver={(e) => e.currentTarget.style.background = '#e2e8f0'} onMouseOut={(e) => e.currentTarget.style.background = 'var(--sky-light)'}>✕</button>
        </div>

        <button onClick={() => setShowHistory(true)} style={{ ...btnStyle, background: 'var(--sky-light)', color: 'var(--charcoal)' }}>
          View Login History
        </button>

        <a href="https://link.kidsdenschool.in/u1T4boZT" style={{ ...btnStyle, background: '#f0fbff', color: 'var(--sky)', marginBottom: '0' }}>
          Contact Support
        </a>

        <div style={{ height: '1px', background: 'var(--sky-light)', margin: '0.8rem 0' }} />

        <button onClick={() => router.push('/signout')} style={{ ...btnStyle, background: '#c0392b', color: 'white', marginBottom: 0, justifyContent: 'center' }}>
          Sign Out
        </button>
      </div>

      {showHistory && <LoginHistoryModal onClose={() => setShowHistory(false)} />}
    </>
  );
}

export default function Navbar({ role, name, username }) {
  const router = useRouter();
  const [showDrawer, setShowDrawer] = useState(false);

  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const salutations = ['sir', 'miss', 'ma\'am', 'maam', 'mr', 'mrs', 'ms', 'dr', 'prof'];
    const words = fullName.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return '?';

    const isSalutation = salutations.includes(words[0].toLowerCase().replace(/\.$/, ''));
    let targetWords = words;

    if (isSalutation && words.length > 2) {
      targetWords = words.slice(1);
    }

    return targetWords.map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  const initials = getInitials(name);

  return (
    <>
      <style>{`
        @keyframes kds-nav-in {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes kds-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .kds-nav { animation: kds-nav-in 0.3s ease both; }
        .kds-avatar:hover { opacity: 0.85; }
        @media (max-width: 480px) {
          .kds-role-badge { display: none !important; }
          .kds-user-name  { display: none !important; }
          .kds-nav-logo img { height: 24px !important; }
        }
      `}</style>

      <nav className="kds-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '60px', background: 'var(--card-bg)', zIndex: 100,
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div className="kds-nav-logo" onClick={() => router.push(role === 'admin' ? '/admin' : '/teacher')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Image src="/kds-logo-tb-black-wm.png" alt="Kids Den School" width={150} height={36} style={{ objectFit: 'contain', height: 28, width: 'auto' }} priority />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ThemeToggle />
          <span className="kds-role-badge" style={{ background: 'var(--sky-light)', color: 'var(--text)', fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 20, textTransform: 'capitalize' }}>{role}</span>
          {name && <span className="kds-user-name" style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-light)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>}

          {/* Profile avatar */}
          <button className="kds-avatar" onClick={() => setShowDrawer(p => !p)} title="View profile and login history" style={{ width: 36, height: 36, borderRadius: '50%', background: showDrawer ? '#e6c700' : '#FFDD00', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, color: 'var(--charcoal)', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }}>
            {initials}
          </button>
        </div>
      </nav>

      {showDrawer && <ProfileDrawer onClose={() => setShowDrawer(false)} role={role} name={name} username={username} />}
    </>
  );
}