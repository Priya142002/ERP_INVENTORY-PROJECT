import React from 'react';
import { PageHeader, MockTable, StatCard } from '../components/UIComponents';
import { ShieldCheck, UserPlus, FileKey, Activity } from 'lucide-react';

export default function Admin() {
  const columns = ['ID', 'Name', 'Role', 'Status', 'Last Active'];
  const mockData = [
    ['#ADM001', 'John Doe', 'Super Admin', <span className="badge badge-success">Active</span>, '2 mins ago'],
    ['#ADM002', 'Sarah Smith', 'HR Manager', <span className="badge badge-success">Active</span>, '1 hour ago'],
    ['#ADM003', 'Mike Johnson', 'Operations', <span className="badge badge-warning">Away</span>, '3 hours ago'],
    ['#ADM004', 'Emily Davis', 'Auditor', <span className="badge badge-danger">Offline</span>, '2 days ago'],
    ['#ADM005', 'Robert Wilson', 'IT Support', <span className="badge badge-success">Active</span>, '10 mins ago'],
  ];

  return (
    <div>
      <PageHeader 
        title="Admin Control Panel" 
        subtitle="Manage users, roles and system configurations system-wide."
        actionLabel="Add New User"
      />
      
      <div className="grid-cards">
        <StatCard title="Total Users" value="2,405" icon={UserPlus} />
        <StatCard title="Active Roles" value="14" icon={ShieldCheck} />
        <StatCard title="Pending Approvals" value="8" icon={FileKey} />
        <StatCard title="System Health" value="99.9%" icon={Activity} />
      </div>

      <MockTable columns={columns} data={mockData} />
    </div>
  );
}
