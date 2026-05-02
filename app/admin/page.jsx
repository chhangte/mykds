'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [classSections, setClassSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/class-sections')
      .then(r => r.json())
      .then(data => {
        setClassSections(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const sectionColors = {
    A: { bg: '#e6f9ee', color: '#1a8a3c' },
    B: { bg: '#e8f0ff', color: '#2c5fe6' },
    C: { bg: '#fff8e1', color: '#e67e22' },
  };

  return (
    <div style={{ padding: '1rem 1.5rem', width: '100%', maxWidth: 1200, margin: '0 auto', minHeight: 'calc(100vh - 180px)' }}>

      {/* Welcome */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--charcoal)' }}>
          Welcome, {session?.user?.name ?? 'Admin'}
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-light)', marginTop: 4 }}>
          Manage your school from here
        </p>
      </div>

      {/* Management Shortcuts */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { path: '/admin/users', icon: '👥', title: 'Manage Users', sub: 'Teachers & Admins' },
          { path: '/admin/students', icon: '🎒', title: 'Manage Students', sub: 'Enroll & edit students' },
          { path: '/admin/classes', icon: '🏫', title: 'Manage Classes', sub: 'Subjects & sections' },
        ].map(item => (
          <div key={item.path} onClick={() => router.push(item.path)} style={{
            background: 'var(--card-bg)', borderRadius: 12, padding: '0.9rem 1.2rem',
            border: '1px solid var(--border)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            flex: 1, minWidth: 150,
            transition: 'background 0.15s, box-shadow 0.15s, transform 0.15s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--bg)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(66,133,244,0.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--card-bg)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--charcoal)' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-light)' }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Title */}
      <h3 style={{
        fontSize: '0.78rem', fontWeight: 600,
        color: 'var(--charcoal-light)', marginBottom: '1rem',
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        Classes Overview
      </h3>

      {/* Loading */}
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: '1rem' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{
              height: 100, borderRadius: 16,
              background: 'var(--sky-light)', opacity: 0.4
            }} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && classSections.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '3rem',
          background: 'var(--card-bg)', borderRadius: 16,
          border: '1.5px solid var(--sky-light)',
          color: 'var(--text-light)', fontSize: '0.88rem'
        }}>
          <div style={{ fontSize: 36, marginBottom: '0.8rem' }}>🏫</div>
          No classes configured yet.{' '}
          <span style={{ color: 'var(--sky-dark)', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => router.push('/admin/classes')}>
            Add classes →
          </span>
        </div>
      )}

      {/* Class+Section Tiles */}
      {!loading && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem',
        }}>
          {classSections.map(cs => {
            const sc = sectionColors[cs.section] || sectionColors.A;
            const key = `${cs.className}-${cs.section}`;
            return (
              <div key={key}
                onClick={() => router.push(
                  `/admin/class-view?class=${encodeURIComponent(cs.className)}&section=${cs.section}`
                )}
                style={{
                  background: 'var(--card-bg)', borderRadius: '16px', padding: '1.2rem',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'background 0.15s, box-shadow 0.15s, transform 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--bg)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(66,133,244,0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--card-bg)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: '0.8rem'
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'var(--sky-light)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 20
                  }}>🏫</div>
                  <span style={{
                    background: sc.bg, color: sc.color,
                    fontSize: '0.7rem', fontWeight: 700,
                    padding: '3px 10px', borderRadius: 20,
                  }}>
                    Sec {cs.section}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--charcoal)' }}>
                  {cs.className}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-light)', marginTop: 3 }}>
                  {cs.subjects.length} subject{cs.subjects.length !== 1 ? 's' : ''}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: '0.6rem' }}>
                  {cs.subjects.slice(0, 3).map(s => (
                    <span key={s._id} style={{
                      background: '#f0f4ff', color: 'var(--charcoal-light)',
                      fontSize: '0.65rem', padding: '2px 7px', borderRadius: 10,
                    }}>{s.subject}</span>
                  ))}
                  {cs.subjects.length > 3 && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--charcoal-light)' }}>
                      +{cs.subjects.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}