export default function Tile({ icon, title, subtitle, onClick, small }) {
  return (
    <div onClick={onClick} style={{
      background: 'white',
      borderRadius: small ? 12 : 'var(--radius)',
      padding: small ? '0.9rem 1rem' : '1.4rem',
      boxShadow: 'var(--shadow)',
      border: '1.5px solid var(--sky-light)',
      cursor: 'pointer',
      transition: 'transform 0.15s, box-shadow 0.15s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.9rem',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)';
      e.currentTarget.style.boxShadow='0 6px 24px rgba(135,206,250,0.3)' }}
    onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)';
      e.currentTarget.style.boxShadow='var(--shadow)' }}
    >
      {icon && (
        <div style={{ width: small?38:48, height: small?38:48, borderRadius: 10,
          background: 'var(--sky-light)', display:'flex',
          alignItems:'center', justifyContent:'center',
          fontSize: small?18:22, flexShrink:0 }}>{icon}</div>
      )}
      <div>
        <div style={{ fontWeight:600, fontSize: small?'0.85rem':'0.95rem',
          color:'var(--charcoal)' }}>{title}</div>
        {subtitle && <div style={{ fontSize:'0.75rem',
          color:'var(--charcoal-light)', marginTop:2 }}>{subtitle}</div>}
      </div>
    </div>
  );
}