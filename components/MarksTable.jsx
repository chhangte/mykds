'use client';
import { useState, useEffect } from 'react';

export default function MarksTable({ students, classId, type }) {
  const [marks, setMarks] = useState({});      // { studentId_index: value }
  const [numTests, setNumTests] = useState(3);
  const label = type === 'classtest' ? 'Test' : 'Exam';

  useEffect(() => {
    fetch(`/api/marks?classId=${classId}&type=${type}`)
      .then(r => r.json())
      .then(data => {
        const map = {};
        data.forEach(m => { map[`${m.student}_${m.index}`] = m.marksObtained; });
        setMarks(map);
      });
  }, [classId, type]);

  const handleChange = async (studentId, index, value) => {
    const key = `${studentId}_${index}`;
    setMarks(prev => ({ ...prev, [key]: value }));
    await fetch('/api/marks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, classId, type, index, marksObtained: Number(value) }),
    });
  };

  const thStyle = { padding:'0.6rem 0.8rem', fontWeight:600,
    fontSize:'0.78rem', background:'var(--sky-light)',
    color:'var(--charcoal)', textAlign:'left', whiteSpace:'nowrap' };
  const tdStyle = { padding:'0.5rem 0.8rem', fontSize:'0.82rem',
    borderBottom:'1px solid var(--sky-light)' };

  return (
    <div style={{ overflowX:'auto', borderRadius:'var(--radius)',
      border:'1.5px solid var(--sky-light)', background:'white' }}>
      <div style={{ padding:'0.8rem 1rem', display:'flex',
        justifyContent:'space-between', alignItems:'center',
        borderBottom:'1.5px solid var(--sky-light)' }}>
        <span style={{ fontWeight:600, fontSize:'0.88rem' }}>
          {label} Marks
        </span>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <span style={{ fontSize:'0.75rem', color:'var(--charcoal-light)' }}>
            Columns:
          </span>
          {[3,5,8].map(n => (
            <button key={n} onClick={() => setNumTests(n)} style={{
              padding:'2px 10px', borderRadius:20, border:'1.5px solid var(--sky)',
              background: numTests===n ? 'var(--sky)' : 'white',
              fontFamily:'Poppins', fontSize:'0.75rem', cursor:'pointer'
            }}>{n}</button>
          ))}
        </div>
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse', minWidth:400 }}>
        <thead>
          <tr>
            <th style={thStyle}>Roll No</th>
            <th style={thStyle}>Student Name</th>
            {Array.from({length: numTests}, (_,i) => (
              <th key={i} style={thStyle}>{label} {i+1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s, idx) => (
            <tr key={s._id} style={{
              background: idx%2===0 ? 'white' : '#fafeff' }}>
              <td style={tdStyle}>{s.rollNo}</td>
              <td style={{...tdStyle, fontWeight:500}}>{s.name}</td>
              {Array.from({length: numTests}, (_,i) => (
                <td key={i} style={tdStyle}>
                  <input
                    type="number" min="0" max="100"
                    value={marks[`${s._id}_${i+1}`] ?? ''}
                    onChange={e => handleChange(s._id, i+1, e.target.value)}
                    style={{ width:60, padding:'4px 8px', border:'1.5px solid var(--sky-light)',
                      borderRadius:8, fontFamily:'Poppins', fontSize:'0.82rem',
                      textAlign:'center', outline:'none' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}