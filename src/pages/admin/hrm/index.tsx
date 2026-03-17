import React from 'react';
import { PageTemplate } from '../PageTemplate';
import { Icon } from '../../../components/ui/Icon';
import Badge from '../../../components/ui/Badge';

export const HRDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Employees', value: '428', icon: 'users', color: 'bg-indigo-500', trend: '+14' },
    { label: 'Today Presence', value: '92%', icon: 'clipboard-check', color: 'bg-emerald-500', trend: 'Active' },
    { label: 'Leave Requests', value: '12', icon: 'calendar', color: 'bg-amber-500', trend: 'Pending' },
    { label: 'Net Payroll', value: '$245k', icon: 'cash', color: 'bg-rose-500', trend: 'Monthly' },
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
              <Badge variant={stat.trend === 'Pending' ? 'warning' : 'success'} className="text-[10px]">{stat.trend}</Badge>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Attendance Trends</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-12 text-[10px] font-bold text-slate-400">Day {i}</span>
                <div className="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${80 + i*3}%` }}></div>
                </div>
                <span className="text-xs font-bold text-slate-700">{80 + i*3}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Department Distribution</h3>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Engineering', count: 124, color: 'bg-blue-500' },
              { label: 'Marketing', count: 42, color: 'bg-purple-500' },
              { label: 'Sales', count: 86, color: 'bg-emerald-500' },
              { label: 'Support', count: 34, color: 'bg-amber-500' },
            ].map((dept, i) => (
              <div key={i} className="flex-1 min-w-[140px] p-4 bg-slate-50 rounded-3xl border border-slate-100 italic">
                <div className={`w-2 h-2 rounded-full ${dept.color} mb-2`}></div>
                <p className="text-xs font-bold text-slate-900">{dept.label}</p>
                <p className="text-[11px] text-slate-500">{dept.count} Employees</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmployeesPage: React.FC = () => (
  <PageTemplate title="Employee Directory" description="Manage your team and organizational structure" icon="users">
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <div key={i} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all text-center p-6 group">
          <div className="relative inline-block mb-4">
            <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-2xl font-bold ${
              i % 3 === 0 ? 'bg-indigo-50 text-indigo-600' : i % 2 === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
            }`}>
              EP
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h3 className="text-sm font-bold text-slate-900">Employee Name #{i}</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Senior Developer</p>
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">EMP-00{i}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Dept</p>
              <p className="text-xs font-bold text-slate-900 mt-0.5">Engg</p>
            </div>
          </div>
          <button className="w-full mt-6 py-2.5 text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
            View Profile
          </button>
        </div>
      ))}
    </div>
  </PageTemplate>
);

export const AttendancePage: React.FC = () => (
  <PageTemplate title="Attendance Calendar" description="Track daily presence and timing" icon="clipboard-check">
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-slate-900">October 2023</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Absent</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-center py-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{day}</span>
          </div>
        ))}
        {Array.from({ length: 31 }).map((_, i) => (
          <div key={i} className={`aspect-square rounded-2xl flex flex-col items-center justify-center border ${
            (i + 1) % 7 === 0 ? 'bg-rose-50 border-rose-100' : 'bg-slate-50/50 border-slate-100'
          } group hover:bg-white hover:border-blue-200 transition-all cursor-pointer`}>
            <span className="text-xs font-bold text-slate-700">{i + 1}</span>
            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
              (i + 1) % 7 === 0 ? 'bg-rose-500' : 'bg-emerald-500'
            }`}></div>
          </div>
        ))}
      </div>
    </div>
  </PageTemplate>
);

export const LeavePage: React.FC = () => (
  <PageTemplate title="Leave Management" description="Request and approve leave applications" icon="calendar">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <h3 className="font-bold text-slate-900">Pending Requests</h3>
          <Badge variant="warning" className="text-[10px]">4 Unprocessed</Badge>
        </div>
        <div className="divide-y divide-slate-50">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">L</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Sick Leave Request</p>
                  <p className="text-[11px] text-slate-500">Employee Name • 2 Days (Oct 12-14)</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-[10px] font-bold text-rose-600 uppercase tracking-widest hover:bg-rose-50 rounded-xl transition-all">Reject</button>
                <button className="px-4 py-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all">Approve</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Leave Balance</h3>
        <div className="space-y-6">
          {[
            { label: 'Casual Leave', total: 12, used: 4, color: 'bg-blue-500' },
            { label: 'Sick Leave', total: 10, used: 2, color: 'bg-rose-500' },
            { label: 'Paid Leave', total: 15, used: 10, color: 'bg-emerald-500' },
          ].map((type, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{type.label}</span>
                <span className="text-xs font-bold text-slate-900">{type.used}/{type.total}</span>
              </div>
              <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                <div className={`h-full ${type.color} rounded-full`} style={{ width: `${(type.used/type.total)*100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageTemplate>
);

export const PayrollPage: React.FC = () => (
  <PageTemplate title="Payroll Dashboard" description="Manage salary structures and payments" icon="cash">
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-50 bg-[#002147] text-white relative">
        <div className="relative z-10">
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Total Monthly Payout</p>
          <h2 className="text-4xl font-bold tracking-tight">$245,820.00</h2>
          <div className="mt-6 flex gap-8">
            <div>
              <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Calculated For</p>
              <p className="text-sm font-bold mt-1">428 Employees</p>
            </div>
            <div>
              <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Next Payout</p>
              <p className="text-sm font-bold mt-1">Oct 31, 2023</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Payroll Runs</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 border border-slate-100 rounded-3xl group hover:border-blue-200 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-600">
                  <Icon name="document-text" size="xs" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">September 2023 Monthly Payroll</p>
                  <p className="text-[11px] text-slate-500">Completed on Sept 28 • 426 Payslips</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">$242,100</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Paid</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageTemplate>
);
