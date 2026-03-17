import React from 'react';
import { PageTemplate } from '../PageTemplate';
import { Icon } from '../../../components/ui/Icon';
import Badge from '../../../components/ui/Badge';

export const ProjectDashboard: React.FC = () => {
  const stats = [
    { label: 'Active Projects', value: '24', icon: 'folder', color: 'bg-blue-500', trend: '8 on track' },
    { label: 'Total Tasks', value: '184', icon: 'check-circle', color: 'bg-indigo-500', trend: '+12 this week' },
    { label: 'Resource Util.', value: '88%', icon: 'users', color: 'bg-emerald-500', trend: 'High' },
    { label: 'Avg. Velocity', value: '42 pts', icon: 'chart-bar', color: 'bg-amber-500', trend: '+5 pts' },
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
              <Badge variant="info" className="text-[10px]">{stat.trend}</Badge>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Ongoing Project Health</h3>
          <div className="space-y-8">
            {[
              { name: 'Infrastructure Overhaul', progress: 75, color: 'bg-blue-600', priority: 'High' },
              { name: 'ERP Core Migration', progress: 42, color: 'bg-indigo-600', priority: 'Urgent' },
              { name: 'Supply Chain Sync', progress: 90, color: 'bg-emerald-600', priority: 'Normal' },
            ].map((prj, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{prj.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">{prj.priority} PRIORITY</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{prj.progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full ${prj.color} rounded-full`} style={{ width: `${prj.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Upcoming Milestones</h3>
          <div className="flex-1 space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 relative">
                {i !== 3 && <div className="absolute left-4 top-8 bottom-0 w-px bg-slate-100"></div>}
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 relative z-10 text-slate-400">
                  <Icon name="clock" size="xs" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Alpha Release v{i}.0</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Oct {15 + i*2}, 2023</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 text-xs font-bold rounded-2xl">
            Open Planning
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProjectListPage: React.FC = () => (
  <PageTemplate title="Project List" description="Overview of all active and historical projects" icon="list">
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
        <div className="flex gap-4">
          <input type="text" placeholder="Search projects..." className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none w-64 shadow-sm" />
          <select className="px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none shadow-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>
        <button className="px-6 h-10 bg-[#002147] text-white text-xs font-bold rounded-xl shadow-lg border-none">+ New Project</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-slate-100">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white p-8 hover:bg-slate-50 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Icon name="folder" size="md" />
              </div>
              <Badge variant={i % 2 === 0 ? 'success' : 'primary'} className="text-[9px]">
                {i % 2 === 0 ? 'ACTIVE' : 'PLANNING'}
              </Badge>
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Strategic Initiative #{i}</h3>
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Modernization of regional distribution hubs and real-time inventory synchronization...</p>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(j => (
                  <div key={j} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200"></div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Budget</p>
                <p className="text-xs font-bold text-slate-900">$12,400</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageTemplate>
);

export const TasksPage: React.FC = () => (
  <PageTemplate title="Kanban Task Board" description="Collaborative workspace for team activities" icon="check-circle">
    <div className="flex gap-6 overflow-x-auto pb-4 h-[calc(100vh-280px)] min-h-[500px]">
      {['Backlog', 'In Progress', 'Testing', 'Done'].map((col, i) => (
        <div key={i} className="flex-1 min-w-[300px] flex flex-col bg-slate-50/50 rounded-[2.5rem] border border-slate-100/50 p-6">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-slate-400' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
              <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest leading-none">{col}</h3>
            </div>
            <Badge variant="secondary" className="px-2 py-0.5 text-[10px] rounded-lg">12</Badge>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto pr-1 custom-scrollbar">
            {[1, 2, 3].map(j => (
              <div key={j} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-grab active:cursor-grabbing group">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={j % 2 === 0 ? 'error' : 'warning'} className="text-[9px] px-1.5 leading-tight">Priority</Badge>
                  <Icon name="link" size="xs" className="text-slate-300 opacity-0 group-hover:opacity-100" />
                </div>
                <h4 className="text-[13px] font-bold text-slate-800 leading-snug">Update module architecture patterns and documentation {i}{j}</h4>
                <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-50"></div>
                    <span className="text-[10px] font-bold text-slate-400">Admin</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Icon name="calendar" size="xs" />
                    <span className="text-[10px] font-bold">Oct 24</span>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-[10px] font-bold text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all uppercase tracking-widest mt-2">
              + New Task
            </button>
          </div>
        </div>
      ))}
    </div>
  </PageTemplate>
);

export const CollaborationPage: React.FC = () => (
  <PageTemplate title="Project Collaboration" description="Team discussions and shared resources" icon="chat-alt-2">
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm h-[calc(100vh-280px)] min-h-[500px] flex overflow-hidden">
      <div className="w-80 border-r border-slate-100 flex flex-col">
        <div className="p-6 border-b border-slate-50">
          <input type="text" placeholder="Search channels..." className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-100 rounded-xl outline-none" />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {['General', 'Development', 'Design System', 'Feedback'].map(chan => (
            <button key={chan} className={`w-full p-4 rounded-2xl text-left transition-all ${
              chan === 'Development' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold"># {chan}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-slate-50/20">
        <div className="p-6 border-b border-white bg-white/50 backdrop-blur-sm shadow-sm z-10">
          <h3 className="text-base font-bold text-slate-900"># Development</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Technical discussions and code reviews</p>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center font-bold text-blue-600 border border-slate-100 shrink-0">A</div>
              <div className="max-w-2xl bg-white p-5 rounded-3xl rounded-tl-none shadow-sm border border-slate-50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-slate-900">Admin User</span>
                  <span className="text-[10px] font-medium text-slate-400 tracking-tight">Today at 10:24 AM</span>
                </div>
                <p className="text-[13px] text-slate-600 leading-relaxed">
                  Hey team! I've updated the module architecture patterns. Please review the new documentation when you have a moment. We need to align on the new service-oriented structure.
                </p>
                <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center gap-3 cursor-pointer hover:bg-blue-50 transition-all">
                  <Icon name="link" size="xs" className="text-blue-500" />
                  <span className="text-[11px] font-bold text-slate-600">architecture_v2_draft.pdf</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="relative">
            <input type="text" placeholder="Type a message..." className="w-full pl-6 pr-24 h-14 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <button className="p-2 hover:bg-white rounded-xl text-slate-400"><Icon name="link" size="xs" /></button>
              <button className="px-5 h-10 bg-blue-600 text-white text-[10px] font-bold uppercase rounded-xl hover:bg-blue-700 shadow-md">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageTemplate>
);
