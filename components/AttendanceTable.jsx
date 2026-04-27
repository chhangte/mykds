'use client';
import { useState, useEffect } from 'react';

export default function AttendanceTable({ students, classId }) {
  const [attendance, setAttendance] = useState({});
  const [dates, setDates] = useState([]);
  const [newDate, setNewDate] = useState('');
  const [saving, setSaving] = useState(false);

  // Generate last 5 dates by default on first load
  useEffect(() => {
    const last5 = [];
    for (let i = 4; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      last5.push(d.toISOString().split('T')[0]);
    }
    setDates(last5);
  }, []);

  // Load existing attendance from API
  useEffect(() => {
    if (!classId || dates.length === 0) return;
    fetch(`/api/attendance?classId=${classId}`)
      .then(r => r.json())
      .then(data => {
        const map = {};
        data.forEach(a => {
          const dateStr = new Date(a.date).toISOString().split('T')[0];
          map[`${a.student}_${dateStr}`] = a.status;
        });
        setAttendance(map);
      })
      .catch(() => {}); // silently fail if API not ready
  }, [classId, dates]);

  const handleChange = async (studentId, date, status) => {
    const key = `${studentId}_${date}`;
    setAttendance(prev => ({ ...prev, [key]: status }));
    setSaving(true);
    try {
      await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, classId, date, status }),
      });
    } catch (e) {}
    setSaving(false);
  };

  const addDate = () => {
    if (!newDate || dates.includes(newDate)) return;
    setDates(prev => [...prev, newDate].sort());
    setNewDate('');
  };

  const removeDate = (date) => {
    setDates(prev => prev.filter(d => d !== date));
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  };

  const statusColor = {
    present: { bg: '#e6f9ee', color: '#1a8a3c', label: 'P' },
    absent:  { bg: '#fdecea', color: '#c0392b', label: 'A' },
    late:    { bg: '#fff8e1', color: '#e67e22', label: 'L' },
  };

  const thStyle = {
    padding: '0.6rem 0.5rem',
    fontWeight: 600,
    fontSize: '0.75rem',
    background: 'var(--sky-light)',
    color: 'var(--charcoal)',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  };

  const tdStyle = {
    padding: '0.5rem 0.5rem',
    fontSize: '0.82rem',
    borderBottom: '1px solid var(--sky-light)',
    textAlign: 'center',
  };

  return (
    <div>
      {/* Add date control */}
      <div style={{
        display: 'flex', gap: '0.6rem', marginBottom: '1rem',
        alignItems: 'center', flexWrap: 'wrap',
      }}>
        <input
          type="date"
          value={newDate}
          onChange={e => setNewDate(e.target.value)}
          style={{
            padding: '0.45rem 0.8rem', borderRadius: 10,
            border: '1px solid var(--border)',
            fontFamily: 'Inter', fontSize: '0.82rem', outline: 'none',
            background: 'var(--card-bg)', color: 'var(--text)',
          }}
        />
        <button
          onClick={addDate}
          style={{
            padding: '0.45rem 1rem', borderRadius: 10,
            background: 'var(--sky)', border: 'none',
            fontFamily: 'Inter', fontWeight: 600,
            fontSize: '0.82rem', cursor: 'pointer',
            color: 'white',
          }}
        >
          + Add Date
        </button>
        {saving && (
          <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-light)' }}>
            Saving...
          </span>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
        {Object.entries(statusColor).map(([status, style]) => (
          <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              background: style.bg, color: style.color,
              borderRadius: 6, padding: '2px 8px',
              fontSize: '0.72rem', fontWeight: 700,
            }}>{style.label}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--charcoal-light)', textTransform: 'capitalize' }}>
              {status}
            </span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{
        overflowX: 'auto', borderRadius: '16px',
        border: '1px solid var(--border)', background: 'var(--card-bg)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, textAlign: 'left', padding: '0.6rem 0.8rem' }}>Roll No</th>
              <th style={{ ...thStyle, textAlign: 'left', minWidth: 120 }}>Name</th>
              {dates.map(date => (
                <th key={date} style={thStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <span>{formatDate(date)}</span>
                    <span
                      onClick={() => removeDate(date)}
                      style={{ cursor: 'pointer', fontSize: '0.65rem', color: '#c0392b', lineHeight: 1 }}
                      title="Remove date"
                    >✕</span>
                  </div>
                </th>
              ))}
              <th style={thStyle}>Present</th>
              <th style={thStyle}>Absent</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => {
              // Count present/absent for summary
              let presentCount = 0;
              let absentCount = 0;
              dates.forEach(date => {
                const val = attendance[`${s._id}_${date}`];
                if (val === 'present' || val === undefined) presentCount++;
                else if (val === 'absent') absentCount++;
              });

              return (
                <tr key={s._id} style={{ background: idx % 2 === 0 ? 'var(--card-bg)' : 'var(--bg)' }}>
                  <td style={{ ...tdStyle, textAlign: 'left', padding: '0.5rem 0.8rem' }}>
                    {s.rollNo}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'left', fontWeight: 500 }}>
                    {s.name}
                  </td>
                  {dates.map(date => {
                    const key = `${s._id}_${date}`;
                    const status = attendance[key] || 'present';
                    const style = statusColor[status];
                    return (
                      <td key={date} style={tdStyle}>
                        <select
                          value={status}
                          onChange={e => handleChange(s._id, date, e.target.value)}
                          style={{
                            background: style.bg,
                            color: style.color,
                            border: '1px solid #e0e0e0',
                            borderRadius: 8,
                            padding: '3px 6px',
                            fontFamily: 'Inter',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            outline: 'none',
                            width: 52,
                          }}
                        >
                          <option value="present">P</option>
                          <option value="absent">A</option>
                          <option value="late">L</option>
                        </select>
                      </td>
                    );
                  })}
                  {/* Summary */}
                  <td style={{ ...tdStyle, color: '#1a8a3c', fontWeight: 600 }}>
                    {presentCount}
                  </td>
                  <td style={{ ...tdStyle, color: '#c0392b', fontWeight: 600 }}>
                    {absentCount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}