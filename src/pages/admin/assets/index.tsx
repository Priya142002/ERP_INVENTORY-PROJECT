import React from 'react';
import { PageTemplate } from '../PageTemplate';
import { Icon } from '../../../components/ui/Icon';
import Badge from '../../../components/ui/Badge';

export const AssetDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Assets', value: '1,240', icon: 'archive', color: 'bg-blue-500', trend: 'Value: $2.4M' },
    { label: 'Assigned', value: '842', icon: 'users', color: 'bg-emerald-500', trend: '68% Utilized' },
    { label: 'Maintenance', value: '12', icon: 'refresh', color: 'bg-amber-500', trend: 'Scheduled' },
    { label: 'Retired', value: '45', icon: 'x', color: 'bg-slate-500', trend: 'Last 12mo' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color}/10 rounded-2xl flex items-center justify-center ${stat.color.replace('bg-', 'text-')}`}>
                <Icon name={stat.icon} size="md" />
              </div>
              <Badge variant="secondary" className="text-[10px]">{stat.trend}</Badge>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Asset Condition Distribution</h3>
          <div className="space-y-6">
            {[
              { label: 'Excellent', count: 720, color: 'bg-emerald-500' },
              { label: 'Good', count: 340, color: 'bg-blue-500' },
              { label: 'Fair (Maintenance Required)', count: 120, color: 'bg-amber-500' },
              { label: 'Poor (Damaged)', count: 60, color: 'bg-rose-500' },
            ].map((condition, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{condition.label}</span>
                  <span className="text-xs font-bold text-slate-900">{condition.count}</span>
                </div>
                <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full ${condition.color} rounded-full`} style={{ width: `${(condition.count/1240)*100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Asset Movements</h3>
          <div className="flex-1 space-y-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  <Icon name="link" size="xs" className="text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">MacBook Pro M2 Assigned</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">To Sarah Jenkins • Engineering Dept • 2h ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 text-xs font-bold rounded-2xl hover:bg-slate-100 transition-all">
            Full Audit Log
          </button>
        </div>
      </div>
    </div>
  );
};

export const AssetTrackingPage: React.FC = () => (
  <PageTemplate title="Asset Tracking" description="Monitor and manage all corporate assets" icon="archive">
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
        <div className="flex gap-4">
          <div className="relative">
            <Icon name="search" size="xs" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by ID, Name..." className="pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none w-64" />
          </div>
          <select className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none">
            <option>All Categories</option>
            <option>IT Hardware</option>
            <option>Furniture</option>
          </select>
        </div>
        <button className="px-6 h-10 bg-[#002147] text-white text-xs font-bold rounded-xl shadow-lg border-none flex items-center gap-2">
          <Icon name="plus" size="xs" /> Add Asset
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
            <th className="px-8 py-4 text-left">Asset Info</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Location</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-8 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {[1, 2, 3, 4, 5].map(i => (
            <tr key={i} className="hover:bg-slate-50/30 transition-all group">
              <td className="px-8 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-mono text-[10px] font-bold">
                    ASST-{i}0{i}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Workstation #{i}092</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Dell Precision 3660</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs font-medium text-slate-600">IT Equipment</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5">
                  <Icon name="map" size="xs" className="text-slate-400" />
                  <span className="text-xs font-medium text-slate-600">Main Office, Floor {i}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge variant={i % 2 === 0 ? 'success' : 'info'}>
                  {i % 2 === 0 ? 'Assigned' : 'Available'}
                </Badge>
              </td>
              <td className="px-8 py-4 text-right">
                <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"><Icon name="chevron-right" size="xs" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </PageTemplate>
);

export const MaintenancePage: React.FC = () => (
  <PageTemplate title="Maintenance Logs" description="Schedule and track asset servicing" icon="refresh">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Upcoming Maintenance</h3>
            <Badge variant="warning" className="text-[10px]">12 Pending</Badge>
          </div>
          <div className="divide-y divide-slate-50">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Icon name="clock" size="xs" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Annual Server Checkup</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">ID: ASST-8829 • Scheduled for Oct {12 + i}</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                  Start Service
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Service Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 rounded-3xl text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Completed</p>
            <p className="text-xl font-bold text-emerald-600 mt-1">142</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-3xl text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Avg Cost</p>
            <p className="text-xl font-bold text-slate-900 mt-1">$124</p>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Popular Providers</h4>
          {[1, 2].map(i => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
              <span className="text-sm font-bold text-slate-700 italic">TechSupport Pro #{i}</span>
              <Icon name="chevron-right" size="xs" className="text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageTemplate>
);
