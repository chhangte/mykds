'use client';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <>
      <style>{`
        .kds-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #f0f4f8;
          border: 1.5px solid var(--sky-light);
          height: 30px;
          border-radius: 20px;
          padding: 0 0.75rem;
          cursor: pointer;
          color: var(--charcoal);
          font-family: Poppins, sans-serif;
          font-weight: 600;
          font-size: 0.78rem;
          transition: all 0.2s ease;
          margin-bottom: 0.6rem;
        }
        .kds-back-btn:hover {
          background: white;
          box-shadow: 0 2px 8px rgba(135,206,250,0.25);
        }
      `}</style>
      <button
        className="kds-back-btn"
        onClick={() => router.back()}
        title="Go back"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>
    </>
  );
}
