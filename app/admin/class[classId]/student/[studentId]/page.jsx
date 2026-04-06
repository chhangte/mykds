// app/admin/class/[classId]/student/[studentId]/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function StudentReport() {
  const { studentId } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/report/${studentId}`)
      .then(r=>r.json()).then(setReport);
  }, [studentId]);

  if (!report) return <div style={{padding:'2rem'}}>Loading...</div>;

  // report.subjects = [{ subject, classTests:[m1,m2,m3], exams:[e1,e2] }]
  return (
    <div style={{ padding:'1rem', maxWidth:900, margin:'0 auto' }}>
      <h2 style={{ fontWeight:700 }}>{report.student.name}</h2>
      <p style={{ fontSize:'0.82rem', color:'var(--charcoal-light)' }}>
        Roll No: {report.student.rollNo} · {report.student.class}
      </p>
      <div style={{ overflowX:'auto', marginTop:'1.5rem', borderRadius:'var(--radius)',
        border:'1.5px solid var(--sky-light)', background:'white' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', minWidth:500 }}>
          <thead>
            <tr>
              <th style={{ padding:'0.7rem 1rem', textAlign:'left',
                background:'var(--sky-light)', fontSize:'0.8rem', fontWeight:600 }}>
                Subject
              </th>
              {['Test 1','Test 2','Test 3','Exam 1','Exam 2'].map(h => (
                <th key={h} style={{ padding:'0.7rem 0.8rem',
                  background:'var(--sky-light)', fontSize:'0.78rem', fontWeight:600 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {report.subjects.map((row, i) => (
              <tr key={row.subject}
                style={{ background: i%2===0?'white':'#fafeff' }}>
                <td style={{ padding:'0.6rem 1rem', fontWeight:500, fontSize:'0.85rem' }}>
                  {row.subject}
                </td>
                {[...row.classTests, ...row.exams].map((val, j) => (
                  <td key={j} style={{ padding:'0.6rem 0.8rem',
                    textAlign:'center', fontSize:'0.85rem' }}>
                    {val ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}