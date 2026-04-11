'use client';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const features = [
    { icon: '📝', title: 'Class Test Marks', desc: 'Record and track multiple test scores per subject easily.' },
    { icon: '📊', title: 'Exam Results', desc: 'Manage term and final exam marks across all subjects.' },
    { icon: '🗓️', title: 'Attendance', desc: 'Mark daily attendance with present, absent or late status.' },
    { icon: '📋', title: 'Student Notes', desc: 'Add personal notes and remarks for individual students.' },
    { icon: '🏫', title: 'Class Reports', desc: 'Admin can view full class performance at a glance.' },
    { icon: '👤', title: 'Student Reports', desc: 'Generate detailed reports for any student across subjects.' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Poppins', sans-serif;
          background: #f0f8ff;
          color: #434343;
          overflow-x: hidden;
        }

        .landing-wrap {
          min-height: 100vh;
          position: relative;
        }

        /* Subtle background blobs */
        .bg-blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 500px; height: 500px;
          background: #87cefa;
          top: -120px; right: -100px;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: #b8e4fd;
          bottom: 100px; left: -80px;
        }
        .blob-3 {
          width: 300px; height: 300px;
          background: #d0ecfd;
          top: 50%; left: 40%;
        }

        /* Navbar */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: rgba(240, 248, 255, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(135, 206, 250, 0.3);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
        }

        .nav-logo-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: #87cefa;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }

        .nav-logo-text {
          font-weight: 700;
          font-size: 0.95rem;
          color: #434343;
        }

        .nav-login-btn {
          background: #87cefa;
          color: #434343;
          border: none;
          border-radius: 10px;
          padding: 0.5rem 1.3rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 12px rgba(135, 206, 250, 0.4);
        }

        .nav-login-btn:hover {
          background: #5bb8f5;
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(135, 206, 250, 0.5);
        }

        /* Hero */
        .hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 7rem 1.5rem 4rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(135, 206, 250, 0.25);
          border: 1.5px solid rgba(135, 206, 250, 0.5);
          border-radius: 20px;
          padding: 0.35rem 1rem;
          font-size: 0.78rem;
          font-weight: 500;
          color: #2a7ab0;
          margin-bottom: 1.8rem;
          animation: fadeUp 0.6s ease both;
        }

        .hero-title {
          font-size: clamp(2.2rem, 6vw, 4rem);
          font-weight: 800;
          line-height: 1.15;
          color: #434343;
          max-width: 700px;
          margin-bottom: 1.2rem;
          animation: fadeUp 0.6s ease 0.1s both;
        }

        .hero-title span {
          color: #2a7ab0;
          position: relative;
        }

        .hero-title span::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 0; right: 0;
          height: 4px;
          background: #87cefa;
          border-radius: 2px;
          opacity: 0.6;
        }

        .hero-sub {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: #6b6b6b;
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          font-weight: 400;
          animation: fadeUp 0.6s ease 0.2s both;
        }

        .hero-btns {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 0.6s ease 0.3s both;
        }

        .btn-primary {
          background: #87cefa;
          color: #434343;
          border: none;
          border-radius: 12px;
          padding: 0.85rem 2rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(135, 206, 250, 0.45);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary:hover {
          background: #5bb8f5;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(135, 206, 250, 0.55);
        }

        .btn-secondary {
          background: white;
          color: #434343;
          border: 1.5px solid rgba(135, 206, 250, 0.6);
          border-radius: 12px;
          padding: 0.85rem 2rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: #f0f8ff;
          border-color: #87cefa;
          transform: translateY(-2px);
        }

        /* Hero visual cards */
        .hero-visual {
          position: relative;
          margin-top: 4rem;
          width: 100%;
          max-width: 680px;
          animation: fadeUp 0.7s ease 0.4s both;
        }

        .mock-card {
          background: white;
          border-radius: 18px;
          border: 1.5px solid rgba(135, 206, 250, 0.35);
          box-shadow: 0 8px 40px rgba(135, 206, 250, 0.18);
          overflow: hidden;
        }

        .mock-header {
          background: linear-gradient(135deg, #87cefa 0%, #b8e4fd 100%);
          padding: 1rem 1.4rem;
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .mock-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.6);
        }

        .mock-title {
          font-weight: 600;
          font-size: 0.85rem;
          color: #2a4a6b;
          margin-left: 0.3rem;
        }

        .mock-body {
          padding: 1rem 1.4rem;
        }

        .mock-row {
          display: grid;
          grid-template-columns: 60px 1fr repeat(3, 70px);
          gap: 0.5rem;
          padding: 0.45rem 0;
          border-bottom: 1px solid #f0f8ff;
          font-size: 0.78rem;
          align-items: center;
        }

        .mock-row.header {
          font-weight: 600;
          color: #6b6b6b;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .mock-score {
          background: #d0ecfd;
          border-radius: 6px;
          padding: 3px 8px;
          font-weight: 600;
          color: #2a7ab0;
          text-align: center;
          font-size: 0.75rem;
        }

        .mock-score.high { background: #e6f9ee; color: #1a8a3c; }
        .mock-score.mid { background: #fff8e1; color: #c67c00; }

        /* Floating stat cards */
        .stat-float {
          position: absolute;
          background: white;
          border-radius: 14px;
          border: 1.5px solid rgba(135, 206, 250, 0.4);
          box-shadow: 0 6px 24px rgba(135, 206, 250, 0.2);
          padding: 0.8rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.78rem;
          white-space: nowrap;
        }

        .stat-float.left {
          left: -40px;
          top: 30%;
          animation: floatLeft 3s ease-in-out infinite;
        }

        .stat-float.right {
          right: -40px;
          bottom: 20%;
          animation: floatRight 3s ease-in-out infinite 1s;
        }

        .stat-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: #d0ecfd;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        /* Features section */
        .features {
          position: relative;
          z-index: 1;
          padding: 5rem 1.5rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .section-label {
          text-align: center;
          font-size: 0.78rem;
          font-weight: 600;
          color: #2a7ab0;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.8rem;
        }

        .section-title {
          text-align: center;
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 700;
          color: #434343;
          margin-bottom: 0.8rem;
        }

        .section-sub {
          text-align: center;
          font-size: 0.9rem;
          color: #6b6b6b;
          margin-bottom: 3rem;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.2rem;
        }

        .feature-card {
          background: white;
          border-radius: 16px;
          border: 1.5px solid rgba(135, 206, 250, 0.3);
          padding: 1.5rem;
          transition: all 0.2s;
          box-shadow: 0 2px 12px rgba(135, 206, 250, 0.1);
        }

        .feature-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(135, 206, 250, 0.22);
          border-color: rgba(135, 206, 250, 0.6);
        }

        .feature-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #d0ecfd, #87cefa33);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          margin-bottom: 1rem;
        }

        .feature-title {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 0.4rem;
          color: #434343;
        }

        .feature-desc {
          font-size: 0.82rem;
          color: #6b6b6b;
          line-height: 1.6;
        }

        /* Portals section */
        .portals {
          position: relative;
          z-index: 1;
          padding: 4rem 1.5rem 5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .portals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.2rem;
          margin-top: 2.5rem;
        }

        .portal-card {
          border-radius: 18px;
          padding: 2rem 1.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.2s;
        }

        .portal-card.teacher {
          background: linear-gradient(135deg, #87cefa22, #d0ecfd55);
          border: 1.5px solid rgba(135, 206, 250, 0.4);
        }

        .portal-card.admin {
          background: linear-gradient(135deg, #434343, #2a4a6b);
          border: 1.5px solid #434343;
          color: white;
        }

        .portal-card.student {
          background: white;
          border: 1.5px dashed rgba(135, 206, 250, 0.5);
        }

        .portal-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(135, 206, 250, 0.2);
        }

        .portal-emoji {
          font-size: 32px;
          margin-bottom: 1rem;
          display: block;
        }

        .portal-name {
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .portal-desc {
          font-size: 0.82rem;
          line-height: 1.6;
          opacity: 0.75;
        }

        .portal-badge {
          display: inline-block;
          margin-top: 1rem;
          background: rgba(135, 206, 250, 0.25);
          border: 1px solid rgba(135, 206, 250, 0.4);
          border-radius: 20px;
          padding: 3px 12px;
          font-size: 0.72rem;
          font-weight: 600;
          color: #2a7ab0;
        }

        .portal-badge.coming {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.6);
        }

        /* CTA */
        .cta {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 5rem 1.5rem 6rem;
        }

        .cta-box {
          background: linear-gradient(135deg, #87cefa 0%, #5bb8f5 100%);
          border-radius: 24px;
          padding: 3.5rem 2rem;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 16px 48px rgba(135, 206, 250, 0.4);
        }

        .cta-title {
          font-size: clamp(1.4rem, 3vw, 2rem);
          font-weight: 800;
          color: #434343;
          margin-bottom: 0.8rem;
        }

        .cta-sub {
          font-size: 0.9rem;
          color: #2a4a6b;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .cta-btn {
          background: white;
          color: #2a7ab0;
          border: none;
          border-radius: 12px;
          padding: 0.9rem 2.5rem;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        /* Footer */
        .footer {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 1.5rem;
          border-top: 1px solid rgba(135, 206, 250, 0.3);
          font-size: 0.78rem;
          color: #9b9b9b;
        }

        /* Animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatLeft {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-8px) translateX(4px); }
        }

        @keyframes floatRight {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(8px) translateX(-4px); }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .nav { padding: 0.9rem 1.2rem; }
          .stat-float { display: none; }
          .mock-row { grid-template-columns: 50px 1fr repeat(2, 60px); }
          .mock-row .mock-score:last-child { display: none; }
          .portal-card.admin { color: white; }
        }
      `}</style>

      <div className="landing-wrap">
        {/* Background blobs */}
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
        <div className="bg-blob blob-3" />

        {/* Navbar */}
        <nav className="nav">
          <div className="nav-logo">
            <div className="nav-logo-icon">🎒</div>
            <span className="nav-logo-text">my.kidsdenschool</span>
          </div>
          <button className="nav-login-btn" onClick={() => window.location.href = '/login'}>
            Sign In →
          </button>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-badge">
            <span>🏫</span> School Management Portal
          </div>
          <h1 className="hero-title">
            The smarter way to manage <span>student records</span>
          </h1>
          <p className="hero-sub">
            Record marks, track attendance, and generate reports — all in one clean, simple platform built for teachers and administrators.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => window.location.href = '/login'}>
              🔐 Sign In to Portal
            </button>
            <button className="btn-secondary" onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Learn More ↓
            </button>
          </div>

          {/* Mock UI preview */}
          <div className="hero-visual">
            <div className="stat-float left">
              <div className="stat-icon">✅</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#434343' }}>32 Present</div>
                <div style={{ fontSize: '0.7rem', color: '#6b6b6b' }}>Today's attendance</div>
              </div>
            </div>

            <div className="mock-card">
              <div className="mock-header">
                <div className="mock-dot" />
                <div className="mock-dot" />
                <div className="mock-dot" />
                <span className="mock-title">📖 Class VIII A — English · Test Marks</span>
              </div>
              <div className="mock-body">
                <div className="mock-row header">
                  <span>Roll</span>
                  <span>Student Name</span>
                  <span>Test 1</span>
                  <span>Test 2</span>
                  <span>Test 3</span>
                </div>
                {[
                  { roll: '8101', name: 'Aarav Mehta', s: ['high','high','mid'], v: [92, 88, 74] },
                  { roll: '8102', name: 'Diya Sharma', s: ['high','mid','high'], v: [95, 79, 91] },
                  { roll: '8103', name: 'Rohan Nair', s: ['mid','high','high'], v: [76, 85, 88] },
                  { roll: '8104', name: 'Priya Iyer', s: ['high','high','high'], v: [89, 93, 96] },
                ].map((row) => (
                  <div key={row.roll} className="mock-row">
                    <span style={{ fontWeight: 600, color: '#434343' }}>{row.roll}</span>
                    <span style={{ fontWeight: 500 }}>{row.name}</span>
                    {row.v.map((val, i) => (
                      <span key={i} className={`mock-score ${row.s[i]}`}>{val}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="stat-float right">
              <div className="stat-icon">📊</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#434343' }}>87% Avg</div>
                <div style={{ fontSize: '0.7rem', color: '#6b6b6b' }}>Class performance</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features" id="features">
          <p className="section-label">What's inside</p>
          <h2 className="section-title">Everything teachers need</h2>
          <p className="section-sub">
            A focused set of tools that cover the full academic workflow without the clutter.
          </p>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Portals */}
        <section className="portals">
          <p className="section-label">Access levels</p>
          <h2 className="section-title">Three portals, one school</h2>
          <p className="section-sub" style={{ textAlign: 'center' }}>
            Purpose-built access for every role in your school.
          </p>
          <div className="portals-grid">
            <div className="portal-card teacher">
              <span className="portal-emoji">🧑‍🏫</span>
              <div className="portal-name">Teacher Portal</div>
              <div className="portal-desc">
                Access your assigned classes, record test and exam marks, mark attendance, and add student notes.
              </div>
              <span className="portal-badge">✓ Available now</span>
            </div>
            <div className="portal-card admin">
              <span className="portal-emoji">🔑</span>
              <div className="portal-name" style={{ color: 'white' }}>Admin Portal</div>
              <div className="portal-desc" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Manage users, students, and classes. View reports for any class or individual student.
              </div>
              <span className="portal-badge" style={{ background: 'rgba(135,206,250,0.2)', color: '#87cefa', borderColor: 'rgba(135,206,250,0.3)' }}>
                ✓ Available now
              </span>
            </div>
            <div className="portal-card student">
              <span className="portal-emoji">🎒</span>
              <div className="portal-name" style={{ color: '#6b6b6b' }}>Student Portal</div>
              <div className="portal-desc" style={{ color: '#9b9b9b' }}>
                Students will be able to view their own marks, attendance records and teacher notes.
              </div>
              <span className="portal-badge" style={{ background: '#f0f8ff', color: '#9b9b9b', borderColor: '#d0ecfd' }}>
                🚧 Coming in Stage 2
              </span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="cta-box">
            <div className="cta-title">Ready to get started?</div>
            <div className="cta-sub">
              Sign in with your staff credentials to access the teacher or admin portal.
            </div>
            <button className="cta-btn" onClick={() => window.location.href = '/login'}>
              Sign In Now →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          © {new Date().getFullYear()} my.kidsdenschool · Built for educators 🎒
        </footer>
      </div>
    </>
  );
}