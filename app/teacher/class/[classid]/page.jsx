'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MarksTable from '@/components/MarksTable';
import AttendanceTable from '@/components/AttendanceTable';

const TABS = ['Class Tests', 'Exams', 'Attendance', 'Notes'];

export default function ClassPage() {
  const { classId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [students, setStudents] = useState([]);
  const [classInfo, setClassInfo] = useState(null);

  useEffect(() => {
    fetch(`/api/classes/${classId}`).then(r=>r.json()).then(setClassInfo);
    fetch(`/api/classes/${classId}/students`).then(r=>r.json()).then(setStudents);
  }, [classId]);

  return (
    <div style={{ padding:'1rem', maxWidth:900, margin:'0 auto' }}>
      <h2 style={{ fontWeight:700, marginBottom:'0.3rem' }}>
        {classInfo?.name} — {classInfo?.subject}
      </h2>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.5rem',
        marginTop:'1rem', overflowX:'auto', paddingBottom:4 }}>
        {TABS.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)} style={{
            padding:'0.5rem 1.1rem', borderRadius:20, border:'none',
            background: activeTab===i ? 'var(--sky)' : 'white',
            color: activeTab===i ? 'var(--charcoal)' : 'var(--charcoal-light)',
            fontFamily:'Poppins', fontWeight: activeTab===i ? 600 : 400,
            fontSize:'0.82rem', cursor:'pointer', whiteSpace:'nowrap',
            boxShadow: activeTab===i ? 'var(--shadow)' : 'none',
            border: `1.5px solid ${activeTab===i ? 'var(--sky)' : 'var(--sky-light)'}`,
          }}>{tab}</button>
        ))}
      </div>

      {activeTab === 0 && (
        <MarksTable students={students} classId={classId} type="classtest" />
      )}
      {activeTab === 1 && (
        <MarksTable students={students} classId={classId} type="exam" />
      )}
      {activeTab === 2 && (
        <AttendanceTable students={students} classId={classId} />
      )}
      {activeTab === 3 && (
        <NotesPanel classId={classId} students={students} />
      )}
    </div>
  );
}