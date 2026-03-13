import React from 'react';
import { PageHeader, StatCard, MockTable } from '../components/UIComponents';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';

export default function Dashboard() {
  const columns = ['System', 'User', 'Action', 'Time', 'Status'];
  const mockData = [
    ['Inventory', 'Admin', 'Updated SKU PRD-001', '5 mins ago', <span className="badge badge-primary">Success</span>],
    ['Sales', 'Sarah', 'Created Invoice INV-8801', '12 mins ago', <span className="badge badge-primary">Success</span>],
    ['Admin', 'System', 'Automated Backup Completed', '1 hour ago', <span className="badge badge-primary">Success</span>],
    ['Purchase', 'Mike', 'PO-10041 Flagged for Review', '2 hours ago', <span className="badge badge-warning">Warning</span>],
    ['Accounts', 'John', 'Transaction TX-0091 Failed', '4 hours ago', <span className="badge badge-danger">Error</span>],
  ];

  return (
    <div>
      <PageHeader 
        title="ERP Overview" 
        subtitle="Monitor your business performance at a glance."
      />
      
      <div className="grid-cards">
        <StatCard title="Total Revenue" value="$1.2M" icon={TrendingUp} />
        <StatCard title="Total Orders" value="1,450" icon={ShoppingCart} colorClass="primary" />
        <StatCard title="Active Users" value="24" icon={Users} colorClass="success" />
        <StatCard title="Low Stock Alerts" value="12" icon={AlertCircle} colorClass="danger" />
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Recent Activity</h3>
        <MockTable columns={columns} data={mockData} />
      </div>

      <div className="grid-cards" style={{ marginTop: '2.5rem' }}>
        <div className="card">
          <h3 className="card-title">Top Selling Products</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { name: 'MacBook Air M2', sales: '$45,000' },
              { name: 'Logitech MX Master', sales: '$12,400' },
              { name: 'Sony WH-1000XM5', sales: '$8,200' }
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem' }}>{p.name}</span>
                <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{p.sales}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="card-title">Budget Utilization</h3>
          <div style={{ padding: '0.5rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              <span>Marketing</span>
              <span>85%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'var(--primary)' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0 0.5rem', fontSize: '0.875rem' }}>
              <span>Operations</span>
              <span>42%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '42%', height: '100%', background: 'var(--success)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
