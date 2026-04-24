'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Spinner from '@/components/Spinner';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [step, setStep] = useState(1);
  const [recognizedUser, setRecognizedUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleCheckUser = async (e) => {
    e.preventDefault();
    if (!form.username) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username }),
      });
      const data = await res.json();

      if (data.exists) {
        setRecognizedUser(data.user);
        setStep(2);
      } else {
        setError("Couldn't find your account. Please try again.");
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      username: form.username,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid password. Please try again.');
      setLoading(false);
      return;
    }

    setSuccess(true);
    const session = await fetch('/api/auth/session').then(r => r.json());
    const role = session?.user?.role;

    setTimeout(() => {
      if (role === 'admin') router.push('/admin');
      else if (role === 'teacher' || role === 'classTeacher') router.push('/teacher');
      else { setError('Unknown role. Contact admin.'); setLoading(false); setSuccess(false); }
    }, 600);
  };

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

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem', borderRadius: 12,
    border: '1.5px solid var(--sky-light, #d2e3fc)', fontFamily: 'Poppins',
    fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <>
      <style>{`
        main { padding-top: 0 !important; }
        @keyframes kds-login-in {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes kds-success-pop {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        .login-card {
          animation: kds-login-in 0.45s cubic-bezier(.22,1,.36,1) both;
        }
        .kds-input:focus {
          border-color: var(--sky, #4285F4) !important;
          box-shadow: 0 0 0 3px rgba(66,133,244,0.12);
        }
        .kds-success-icon {
          animation: kds-success-pop 0.4s cubic-bezier(.22,1,.36,1) both;
        }
        .kds-support-link {
          color: var(--sky-dark, #2b6fd4);
          text-decoration: none;
          font-weight: 600;
        }
        .kds-support-link:hover { text-decoration: underline; }
        @keyframes kds-progress {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        
        .split-layout {
          display: flex;
          min-height: 100vh;
        }

        .left-pane {
          display: none;
        }
        
        .right-pane {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg, #f7fbff);
          padding: 2rem;
          position: relative;
        }

        @media (min-width: 900px) {
          .left-pane {
            display: flex;
            width: 50%;
            position: relative;
            background-color: var(--sky-light, #f0f4ff);
            overflow: hidden;
            justify-content: center;
            align-items: center;
          }
          .right-pane {
            width: 50%;
          }
        }

        .user-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 6px;
          border-radius: 20px;
          border: 1px solid #e0e0e0;
          background: #fff;
          margin-bottom: 24px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .user-chip:hover {
          background: #f8f9fa;
        }
        .avatar-circle {
          width: 24px;
          height: 24px;
          border-radius: 12px;
          background: var(--sky, #4285F4);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }
      `}</style>

      <div className="no-navbar-padding split-layout">
        <div className="left-pane">
          <Image
            src="/banner.png"
            alt="School Banner"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className="right-pane">
          <div className="login-card" style={{
            background: 'white', borderRadius: 24,
            padding: '3rem 2.5rem', width: '100%', maxWidth: 420,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
            border: '1px solid #f0f0f0',
          }}>

            {success ? (
              <div style={{ textAlign: 'center' }}>
                <div className="kds-success-icon" style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: '#FFDD00', border: '3px solid #e6c700',
                  margin: '0 auto 1.5rem',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.6rem',
                  fontWeight: 700, color: 'var(--charcoal)'
                }}>
                  {getInitials(recognizedUser?.name || form.username)}
                </div>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--charcoal)', marginBottom: 8 }}>
                  Welcome back!
                </h1>
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-light)', marginBottom: 24 }}>
                  Redirecting to your portal…
                </p>
                <div style={{
                  height: 4, borderRadius: 2,
                  background: 'var(--sky-light, #d2e3fc)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%', width: '100%',
                    background: 'var(--sky, #4285F4)',
                    animation: 'kds-progress 0.6s ease forwards',
                  }} />
                </div>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{
                    margin: '0 auto 1.5rem',
                    width: 160, height: 50,
                    position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Image
                      src="/mykds-logo-tb.png"
                      alt="myKDS"
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                    {step === 1 ? 'Sign in' : 'Welcome'}
                  </h1>
                  <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-light)', marginTop: 8 }}>
                    {step === 1 ? 'to continue to your portal' : ''}
                  </p>
                </div>

                {step === 1 && (
                  <form onSubmit={handleCheckUser}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--charcoal)', display: 'block', marginBottom: 8 }}>
                        Username
                      </label>
                      <input
                        className="kds-input"
                        value={form.username}
                        onChange={e => setForm({ ...form, username: e.target.value })}
                        style={inputStyle}
                        placeholder="Enter your username"
                        required
                        disabled={loading}
                        autoFocus
                      />
                    </div>

                    <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-light)' }}>
                        {'Need help? '}
                        <a href="https://link.kidsdenschool.in/u1T4boZT" target="_blank" rel="noopener noreferrer" className="kds-support-link">Contact support</a>
                      </span>
                    </div>

                    {error && (
                      <div style={{
                        color: '#c0392b', fontSize: '0.85rem',
                        background: '#fff5f5', padding: '10px 14px',
                        borderRadius: 10, marginBottom: '1.5rem',
                        border: '1px solid #fde2e2',
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                        {error}
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button type="submit" disabled={loading} style={{
                        padding: '0.75rem 2rem',
                        background: loading ? 'var(--sky-light, #d2e3fc)' : 'var(--sky, #4285F4)',
                        color: 'white', border: 'none', borderRadius: 24,
                        fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.95rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: 8,
                      }}>
                        {loading ? <Spinner size={18} color="#fff" /> : 'Next'}
                      </button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleSignIn}>
                    <div style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => { setStep(1); setError(''); setForm({ ...form, password: '' }); }}
                        className="user-chip"
                        title="Change account"
                      >
                        <div className="avatar-circle">
                          {form.username.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--charcoal, #333)', fontWeight: 500 }}>
                          {form.username}
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#555555', marginLeft: 4 }}>
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--charcoal)' }}>
                          Password
                        </label>
                      </div>
                      <input
                        className="kds-input"
                        type="password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        style={inputStyle}
                        placeholder="Enter your password"
                        required
                        disabled={loading}
                        autoFocus
                      />
                    </div>

                    {error && (
                      <div style={{
                        color: '#c0392b', fontSize: '0.85rem',
                        background: '#fff5f5', padding: '10px 14px',
                        borderRadius: 10, marginBottom: '1.5rem',
                        border: '1px solid #fde2e2',
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                        {error}
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <a href="https://link.kidsdenschool.in/u1T4boZT" target="_blank" rel="noopener noreferrer" className="kds-support-link" style={{ fontSize: '0.85rem' }}>
                        Forgot password?
                      </a>

                      <button type="submit" disabled={loading} style={{
                        padding: '0.75rem 2rem',
                        background: loading ? 'var(--sky-light, #d2e3fc)' : 'var(--sky, #4285F4)',
                        color: 'white', border: 'none', borderRadius: 24,
                        fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.95rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: 8,
                      }}>
                        {loading ? <Spinner size={18} color="#fff" /> : 'Sign In'}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}