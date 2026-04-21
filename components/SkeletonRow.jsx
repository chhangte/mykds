export default function SkeletonRow({ cols = 5, rows = 4 }) {
  return (
    <>
      <style>{`
        @keyframes kds-shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .kds-skeleton {
          border-radius: 6px; height: 14px;
          background: linear-gradient(
            90deg,
            #e8f0fe 25%,
            #d2e3fc 50%,
            #e8f0fe 75%
          );
          background-size: 600px 100%;
          animation: kds-shimmer 1.4s ease-in-out infinite;
        }
      `}</style>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} style={{ background: r % 2 === 0 ? 'white' : '#f5f8ff' }}>
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} style={{ padding: '0.6rem 0.8rem' }}>
              <div className="kds-skeleton"
                style={{ width: c === 1 ? '80%' : c === 0 ? '50%' : '60%' }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}