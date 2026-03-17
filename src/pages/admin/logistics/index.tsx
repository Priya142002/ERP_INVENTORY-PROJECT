import React from 'react';
import { PageTemplate } from '../PageTemplate';
import { Icon } from '../../../components/ui/Icon';
import Badge from '../../../components/ui/Badge';

export const LogisticsDashboard: React.FC = () => {
  const stats = [
    { label: 'Active Shipments', value: '184', icon: 'truck', color: 'bg-blue-500', trend: '12 Delayed' },
    { label: 'Delivered Today', value: '42', icon: 'check-circle', color: 'bg-emerald-500', trend: '+15%' },
    { label: 'Avg Delivery Time', value: '2.4 Days', icon: 'clock', color: 'bg-indigo-500', trend: '-4h' },
    { label: 'Returns Pending', value: '8', icon: 'refresh', color: 'bg-rose-500', trend: 'Urgent' },
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
              <Badge variant={stat.label.includes('Returns') ? 'error' : 'secondary'} className="text-[10px]">{stat.trend}</Badge>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Delivery Performance by Zone</h3>
          <div className="space-y-6">
            {[
              { zone: 'Northern Region', performance: 94, status: 'Optimal' },
              { zone: 'Southern Hub', performance: 82, status: 'Needs Review' },
              { zone: 'Eastern Sector', performance: 88, status: 'Normal' },
              { zone: 'Western Coast', performance: 91, status: 'Optimal' },
            ].map((zone, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 italic">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-50">
                    <Icon name="map" size="xs" className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{zone.zone}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{zone.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#002147]">{zone.performance}%</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Efficiency</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#002147] p-8 rounded-[2rem] text-white relative overflow-hidden flex flex-col">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-6">Real-time Map Feed</h3>
            <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 text-center">
              <Icon name="map" size="lg" className="text-blue-400 mb-4 animate-pulse" />
              <p className="text-sm font-medium text-slate-300">Live fleet tracking is only available on desktop viewports</p>
              <button className="mt-6 px-6 py-2 bg-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all">
                Open Fleet Map
              </button>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase">
                <span>Active Drivers</span>
                <span className="text-blue-400">24 Online</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[70%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ShipmentListPage: React.FC = () => (
  <PageTemplate title="Shipment Tracking" description="Manage outbound and inbound goods movement" icon="truck">
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white">
        <div className="flex gap-4">
          <input type="text" placeholder="SH-0000..." className="px-4 py-2 text-sm bg-slate-50 border border-slate-100 rounded-xl outline-none w-64" />
          <select className="px-4 py-2 text-sm bg-slate-50 border border-slate-100 rounded-xl outline-none shadow-sm italic cursor-pointer">
            <option>All Status</option>
            <option>In Transit</option>
            <option>Delivered</option>
          </select>
        </div>
        <button className="flex items-center px-6 h-10 bg-[#002147] text-white text-xs font-bold rounded-xl shadow-lg border-none">
          <Icon name="plus" size="xs" className="mr-2" /> Create Shipment
        </button>
      </div>
      <div className="flex-1 divide-y divide-slate-50">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="p-8 flex items-center gap-10 hover:bg-slate-50 transition-all">
            <div className="flex items-center gap-4 w-64">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Icon name="package" size="md" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">SH-0092{i}</p>
                <p className="text-[11px] text-slate-500 italic mt-0.5">Order: INV-2930{i}</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                <span className="text-[10px] font-bold text-[#002147] uppercase tracking-widest">{i === 1 ? 'Delivered' : 'In Transit'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`h-2 flex-1 rounded-full ${i === 1 ? 'bg-emerald-500' : 'bg-slate-100'}`}>
                  {i !== 1 && <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>}
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <Icon name="chevron-right" size="xs" className="text-slate-400" />
                </div>
              </div>
            </div>
            <div className="w-48 text-right">
              <p className="text-sm font-bold text-slate-900">NYC Distribution Hub</p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">ETA: Oct 1{i}, 2023</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageTemplate>
);

export const DeliveryPage: React.FC = () => (
  <PageTemplate title="Delivery Routes" description="Optimize and assign driver routes" icon="map">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-280px)] min-h-[500px]">
        <div className="p-6 border-b border-slate-50 bg-slate-50/20">
          <h3 className="font-bold text-slate-900">Active Route Assignments</h3>
        </div>
        <div className="flex-1 p-8 space-y-8 overflow-y-auto">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-6 relative">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-[#002147] text-white flex items-center justify-center font-bold z-10 shadow-lg">R{i}</div>
                {i !== 3 && <div className="flex-1 w-px border-l-2 border-dashed border-slate-200 my-2"></div>}
              </div>
              <div className="flex-1 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Driver: John Thompson</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 italic">Veh: Express Van #20{i}</p>
                  </div>
                  <Badge variant="info" className="text-[10px]">12 STOPS</Badge>
                </div>
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map(s => (
                    <div key={s} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                      s < 3 ? 'bg-emerald-100 text-emerald-700' : 'bg-white border border-slate-200 text-slate-400'
                    }`}>
                      {s}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300">...</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Zone Optimization</h3>
          <div className="space-y-4">
            {['Zone A-2', 'Zone B-4', 'Hub-Central'].map(hub => (
              <div key={hub} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">{hub}</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-widest">Optimized</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-[#002147] text-white text-xs font-bold rounded-2xl shadow-lg border-none italic">
            Recompute Routes
          </button>
        </div>
        <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
          <h4 className="text-sm font-bold text-emerald-900 mb-2">Driver Efficiency</h4>
          <p className="text-[11px] text-emerald-600 leading-relaxed italic">Route optimization has reduced fuel costs by 12.4% this week.</p>
        </div>
      </div>
    </div>
  </PageTemplate>
);
