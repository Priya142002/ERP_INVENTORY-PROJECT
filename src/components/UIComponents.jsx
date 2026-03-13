import React from 'react';

export const PageHeader = ({ title, subtitle, actionLabel }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: 0 }}>{title}</h1>
      {subtitle && <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>{subtitle}</p>}
    </div>
    {actionLabel && (
      <button style={{ 
        background: 'var(--primary)', 
        color: '#fff', 
        border: 'none', 
        padding: '0.75rem 1.5rem', 
        borderRadius: '8px',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)'
      }}>
        {actionLabel}
      </button>
    )}
  </div>
);

export const MockTable = ({ columns, data }) => (
  <div className="card animate-fade" style={{ marginTop: '2rem' }}>
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, i) => <th key={i}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const StatCard = ({ title, value, icon: Icon, colorClass = 'primary' }) => (
  <div className="card animate-fade">
    <div className="stat-card">
      <div className={`stat-icon bg-${colorClass} bg-opacity-10 text-${colorClass}`}>
        {Icon && <Icon size={24} />}
      </div>
      <div className="stat-info">
        <div className="label">{title}</div>
        <div className="value">{value}</div>
      </div>
    </div>
  </div>
);
