import React from 'react';
import { PageTemplate } from '../PageTemplate';
import { Icon } from '../../../components/ui/Icon';
import Badge from '../../../components/ui/Badge';

export const HelpdeskDashboard: React.FC = () => {
  const stats = [
    { label: 'Open Tickets', value: '42', icon: 'ticket', color: 'bg-indigo-500', trend: '8 Urgent' },
    { label: 'Avg Solve Time', value: '3.5h', icon: 'clock', color: 'bg-emerald-500', trend: '-12%' },
    { label: 'SLA Success', value: '96.2%', icon: 'shield-check', color: 'bg-blue-500', trend: '+1.5%' },
    { label: 'CSAT Score', value: '4.8/5', icon: 'support', color: 'bg-amber-500', trend: 'Excellent' },
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
              <Badge variant={stat.trend.includes('Urgent') ? 'error' : 'success'} className="text-[10px]">{stat.trend}</Badge>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Weekly Ticket Volume</h3>
          <div className="flex items-end gap-3 h-[200px] pb-6">
            {[45, 62, 38, 55, 74, 42, 28].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full bg-slate-50 rounded-t-xl relative group overflow-hidden" style={{ height: `${(v/80)*100}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-600 to-indigo-400 opacity-80 group-hover:opacity-100 transition-all"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Tickets</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-transparent hover:border-blue-100 transition-all cursor-pointer">
                <div>
                  <p className="text-sm font-bold text-slate-900">Issue #{i}092</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Urgent • 14m ago</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400">
                  <Icon name="chevron-right" size="xs" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TicketsPage: React.FC = () => (
  <PageTemplate title="Ticket Management" description="Track and resolve customer support issues" icon="ticket">
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-280px)] min-h-[600px]">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
        <div className="flex gap-4">
          <div className="relative">
            <Icon name="search" size="xs" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search tickets..." className="pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none w-64 shadow-sm" />
          </div>
          <select className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none shadow-sm">
            <option>Open Tickets</option>
            <option>Resolved</option>
            <option>All Tasks</option>
          </select>
        </div>
        <button className="px-6 h-10 bg-[#002147] text-white text-xs font-bold rounded-xl shadow-lg border-none flex items-center gap-2">
          <Icon name="plus" size="xs" /> New Ticket
        </button>
      </div>
      <div className="flex-1 flex min-h-0">
        <div className="w-96 border-r border-slate-50 overflow-y-auto custom-scrollbar">
          <div className="divide-y divide-slate-50">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`p-6 hover:bg-slate-50 transition-all cursor-pointer border-l-4 ${
                i === 1 ? 'border-blue-600 bg-blue-50/20' : 'border-transparent'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TICKET-00{i}</span>
                  <Badge variant={i === 1 ? 'error' : 'info'} className="text-[8px] py-0 px-1.5">URGENT</Badge>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight mb-2 truncate">Application crashes on checkout sequence {i}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Tech Support</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 tracking-tight">2h ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-slate-50/10">
          <div className="p-8 border-b border-slate-50 bg-white/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">#</div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Application crashes on checkout sequence</h3>
                <div className="flex items-center gap-3 mt-1">
                  <Badge variant="error" className="text-[9px]">URGENT</Badge>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client: Enterprise Corp</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-white border border-slate-200 rounded-xl hover:bg-slate-50">Assign</button>
              <button className="px-4 py-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 rounded-xl hover:bg-emerald-100">Resolve</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-10 space-y-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center font-bold text-slate-600 border border-slate-100 shrink-0">C</div>
              <div className="max-w-xl bg-white p-6 rounded-3xl rounded-tl-none shadow-sm border border-slate-100">
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  The system throws a NullReferenceException every time a user clicks on the "Proceed to Payment" button when using the mobile application. This is blocking all mobile sales for the past hour.
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="bg-slate-50 p-2 rounded-xl border border-dotted border-slate-200 text-[10px] font-bold text-slate-400 cursor-pointer">crash_log.txt</div>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 shadow-sm flex items-center justify-center font-bold text-white shrink-0">A</div>
              <div className="max-w-xl bg-indigo-600 p-6 rounded-3xl rounded-tr-none shadow-sm text-white">
                <p className="text-[13px] leading-relaxed">
                  Understand the urgency. I've escalated this to the mobile dev team and we're investigating the logs. Will update you within 30 minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-white border-t border-slate-50">
            <div className="relative">
              <textarea placeholder="Reply to customer..." className="w-full pl-6 pr-24 py-4 min-h-[100px] bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm resize-none" />
              <div className="absolute right-4 bottom-4 flex gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"><Icon name="support" size="xs" /></button>
                <button className="px-6 h-10 bg-[#002147] text-white text-[10px] font-bold uppercase rounded-xl hover:bg-blue-900 shadow-lg">Send Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageTemplate>
);

export const SLAPage: React.FC = () => (
  <PageTemplate title="SLA Monitoring" description="Monitor service level compliance and breach alerts" icon="clock">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-8">Response Time Compliance</h3>
        <div className="space-y-8">
          {[
            { label: 'Critical Priority (1h Limit)', value: '100%', color: 'bg-emerald-500' },
            { label: 'High Priority (4h Limit)', value: '94%', color: 'bg-emerald-500' },
            { label: 'Medium Priority (12h Limit)', value: '88%', color: 'bg-amber-500' },
            { label: 'Low Priority (24h Limit)', value: '98%', color: 'bg-emerald-500' },
          ].map((sla, i) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sla.label}</span>
                <span className="text-xs font-bold text-slate-900">{sla.value}</span>
              </div>
              <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                <div className={`h-full ${sla.color} rounded-full`} style={{ width: sla.value }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-rose-50 p-8 rounded-[2rem] border border-rose-100 shadow-sm flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center">
            <Icon name="bell" size="md" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-rose-900">SLA Breach Alerts</h3>
            <p className="text-xs text-rose-600 font-medium">3 active breaches require immediate attention</p>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-6 bg-white rounded-3xl border border-rose-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-bold text-slate-900 underline">TICKET-0098{i}</h4>
                <Badge variant="error" className="text-[10px]">-42m Over</Badge>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">Response time exceeded for critical billing issue. Escalated to Dept. Lead.</p>
              <button className="mt-4 w-full py-2 bg-rose-50 text-rose-700 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-rose-100 italic transition-all">Take Over Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageTemplate>
);
