export default function Spinner({ size = 20, color = 'var(--sky-dark, #2b6fd4)' }) {
  return (
    <>
      <style>{`
        @keyframes kds-spin {
          to { transform: rotate(360deg); }
        }
        .kds-spinner {
          border-radius: 50%;
          animation: kds-spin 0.7s linear infinite;
          flex-shrink: 0;
        }
      `}</style>
      <div className="kds-spinner" style={{
        width: size, height: size,
        border: `${Math.max(2, size / 8)}px solid rgba(66,133,244,0.2)`,
        borderTopColor: color,
      }} />
    </>
  );
}