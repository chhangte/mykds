'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function TeacherDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const classes = [
    { _id: 'cls1', name: 'Class V', subject: 'English', academicYear: '2024-25' },
    { _id: 'cls2', name: 'Class VI', subject: 'Social Science', academicYear: '2024-25' },
    { _id: 'cls3', name: 'Class IV', subject: 'Math', academicYear: '2024-25' },
  ];

  const ICONS = { 'English': '📖', 'Math': '🔢', 'Science': '🔬',
    'Social Science': '🌍', 'Hindi': '📝' };

  return (
    <div style={{ padding: '1.5rem', maxWidth: 700, margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--charcoal)' }}>
          Good morning, {session?.user?.name ?? 'Teacher'} 👋
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-light)', marginTop: 4 }}>
          Your classes this year
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1rem'
      }}>
        {classes.map(cls => (
          <div
            key={cls._id}
            onClick={() => router.push(`/teacher/class/${cls._id}`)}
            style={{
              background: 'white', borderRadius: '16px', padding: '1.4rem',
              boxShadow: '0 2px 16px rgba(135,206,250,0.18)',
              border: '1.5px solid var(--sky-light)',
              cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s',
              display: 'flex', alignItems: 'center', gap: '0.9rem',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(135,206,250,0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 16px rgba(135,206,250,0.18)';
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 10,
              background: 'var(--sky-light)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 22, flexShrink: 0
            }}>
              {ICONS[cls.subject] ?? '📚'}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--charcoal)' }}>
                {cls.name} — {cls.subject}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-light)', marginTop: 2 }}>
                {cls.academicYear}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}