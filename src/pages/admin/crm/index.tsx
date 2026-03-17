import React from 'react';
import { PageTemplate } from '../PageTemplate';
import { Icon } from '../../../components/ui/Icon';
import Badge from '../../../components/ui/Badge';

export const CRMDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Leads', value: '1,284', icon: 'users', color: 'bg-blue-500', trend: '+12%' },
    { label: 'Opportunities', value: '420', icon: 'presentation-chart-line', color: 'bg-indigo-500', trend: '+8%' },
    { label: 'Conversion Rate', value: '24.5%', icon: 'chart-bar', color: 'bg-emerald-500', trend: '+5%' },
    { label: 'Deal Value', value: '$845k', icon: 'cash', color: 'bg-amber-500', trend: '+15%' },
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
              <Badge variant="success" className="text-[10px]">{stat.trend}</Badge>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Sales Pipeline</h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {['Qualification', 'Proposal', 'Negotiation', 'Closing'].map((stage, i) => (
              <div key={i} className="flex-1 min-w-[200px] bg-slate-50/50 p-4 rounded-3xl border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{stage}</span>
                  <Badge variant="secondary" className="text-[10px]">{12 - i*2}</Badge>
                </div>
                <div className="space-y-3">
                  {[1, 2].map(j => (
                    <div key={j} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 cursor-pointer transition-all">
                      <p className="text-sm font-bold text-slate-900">Enterprise Deal #{i}{j}</p>
                      <p className="text-[11px] text-slate-500 mt-1">$45,000 • High Probability</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Icon name="calendar" size="xs" className="text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Follow-up with John Doe</p>
                  <p className="text-[11px] text-slate-500">Scheduled for tomorrow at 10:00 AM</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 text-xs font-bold rounded-2xl hover:bg-slate-100 transition-all">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export const LeadsPage: React.FC = () => (
  <PageTemplate title="Lead Management" description="Create and manage your business leads" icon="users">
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Icon name="search" size="xs" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search leads..." className="pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 shadow-sm" />
          </div>
          <select className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
            <option>All Sources</option>
            <option>Website</option>
            <option>Referral</option>
          </select>
        </div>
        <button className="flex items-center px-6 h-10 bg-[#002147] text-white text-xs font-bold rounded-xl hover:bg-[#003366] transition-all shadow-lg border-none">
          <Icon name="plus" size="xs" className="mr-2" /> New Lead
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
            <th className="px-8 py-4 text-left">Lead Info</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Score</th>
            <th className="px-6 py-4 text-left">Agent</th>
            <th className="px-8 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {[1, 2, 3, 4, 5].map(i => (
            <tr key={i} className="hover:bg-slate-50/30 transition-all">
              <td className="px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">JD</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Lead #{i}0293</p>
                    <p className="text-[11px] text-slate-500">Website • 2 hours ago</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge variant={i % 2 === 0 ? 'success' : 'warning'} className="text-[10px]">
                  {i % 2 === 0 ? 'Qualified' : 'Contacted'}
                </Badge>
              </td>
              <td className="px-6 py-4 text-sm font-bold text-slate-700">8{i}/100</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                  <span className="text-xs font-medium text-slate-600">Admin User</span>
                </div>
              </td>
              <td className="px-8 py-4 text-right">
                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                  <Icon name="chevron-right" size="xs" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </PageTemplate>
);

export const OpportunitiesPage: React.FC = () => (
  <PageTemplate title="Opportunities" description="Track your sales pipeline" icon="presentation-chart-line">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['Pipeline', 'Under Review', 'Contract Signature'].map((group, i) => (
        <div key={i} className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{group}</h3>
            <Badge variant="secondary" className="text-[10px]">3</Badge>
          </div>
          {[1, 2, 3].map(j => (
            <div key={j} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-bold text-slate-900">Deal {i}{j}</h4>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icon name="cash" size="xs" />
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Global expansion project for logistics company...</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-sm font-bold text-slate-900">$24,500</span>
                <span className="text-[10px] font-bold text-emerald-600">80% Prob.</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </PageTemplate>
);

export const FollowUpsPage: React.FC = () => (
  <PageTemplate title="Activities & Follow-ups" description="Manage your task and meeting schedule" icon="calendar">
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-slate-900">Today's Schedule</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-xs font-bold border border-slate-200 rounded-xl hover:bg-slate-50">Day</button>
          <button className="px-4 py-2 text-xs font-bold bg-[#002147] text-white rounded-xl">Week</button>
        </div>
      </div>
      <div className="space-y-4">
        {[9, 10, 11, 12, 13].map(hour => (
          <div key={hour} className="flex gap-6 group">
            <div className="w-16 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{hour}:00</span>
            </div>
            <div className={`flex-1 min-h-[80px] rounded-3xl p-4 border transition-all ${
              hour === 10 ? 'bg-blue-50 border-blue-100 shadow-sm' : 'border-slate-50 hover:bg-slate-50'
            }`}>
              {hour === 10 ? (
                <div>
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-blue-900">Sales Pitch - New Client</p>
                    <Icon name="support" size="xs" className="text-blue-600" />
                  </div>
                  <p className="text-[11px] text-blue-600 mt-1">Google Meet • 10:00 - 11:00 AM</p>
                </div>
              ) : (
                <div className="h-full flex items-center text-slate-300 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100">
                  + Add task at {hour}:00
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageTemplate>
);
