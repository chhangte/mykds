'use client';
import { useState, useEffect, useRef } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mounted]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <div style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '6px 12px',
        width: 100,
        height: 34,
        opacity: 0.5,
      }}></div>
    );
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'var(--card-bg)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          fontSize: '0.78rem',
          fontWeight: 600,
          fontFamily: 'Poppins',
          transition: 'all 0.2s',
        }}
      >
        <span>{theme === 'light' ? 'Light' : 'Dark (Beta)'}</span>
        <span style={{ fontSize: '0.6rem', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          right: 0,
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '4px',
          minWidth: 100,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          animation: 'kds-fade-up 0.15s ease both',
        }}>
          <button
            onClick={() => changeTheme('light')}
            style={{
              padding: '8px 12px',
              background: theme === 'light' ? 'var(--sky-light)' : 'transparent',
              color: 'var(--text)',
              borderRadius: 8,
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 500,
              fontFamily: 'Poppins',
            }}
          >
            Light
          </button>
          <button
            onClick={() => changeTheme('dark')}
            style={{
              padding: '8px 12px',
              background: theme === 'dark' ? 'var(--sky-light)' : 'transparent',
              color: 'var(--text)',
              borderRadius: 8,
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 500,
              fontFamily: 'Poppins',
            }}
          >
            Dark (Beta)
          </button>
        </div>
      )}
    </div>
  );
}
