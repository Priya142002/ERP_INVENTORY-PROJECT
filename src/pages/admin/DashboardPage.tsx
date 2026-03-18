import React from 'react';
import Icon from '../../components/ui/Icon';
import Badge from '../../components/ui/Badge';
import {
  StatCard,
  SalesTrendChart,
  ComparisonBarChart,
  DistributionDonutChart
} from '../../components/analytics/DashboardCharts';

// Mock Data for Charts
const salesTrendData = [
  { name: '01 Oct', revenue: 4200, orders: 120 },
  { name: '05 Oct', revenue: 5800, orders: 150 },
  { name: '10 Oct', revenue: 4900, orders: 130 },
  { name: '15 Oct', revenue: 7200, orders: 180 },
  { name: '20 Oct', revenue: 6500, orders: 170 },
  { name: '25 Oct', revenue: 8900, orders: 210 },
  { name: '30 Oct', revenue: 10500, orders: 250 },
];

const deptData = [
  { name: 'Inventory', sales: 8400, purchase: 6200 },
  { name: 'Electronics', sales: 12500, purchase: 9800 },
  { name: 'Furniture', sales: 7200, purchase: 5500 },
  { name: 'Apparel', sales: 9800, purchase: 7400 },
  { name: 'Logistics', sales: 6500, purchase: 5200 },
];

const distributionData = [
  { name: 'Online Sales', value: 45 },
  { name: 'Direct Retail', value: 25 },
  { name: 'Wholesale', value: 20 },
  { name: 'Affiliate', value: 10 },
];

const sparklineData = [
  { value: 40 }, { value: 65 }, { value: 50 }, { value: 85 }, { value: 70 }, { value: 95 }
];

export const AdminDashboardPage: React.FC = () => {
  const stats = [
    { label: 'Total Revenue', value: '$128,450', icon: 'cash', color: 'bg-emerald-500', trend: '12.5%', trendUp: true },
    { label: 'Avg Purchases', value: '$42,200', icon: 'shopping-cart', color: 'bg-blue-500', trend: '5.2%', trendUp: true },
    { label: 'Inventory Value', value: '$845,000', icon: 'archive', color: 'bg-indigo-500', trend: '2.1%', trendUp: false },
    { label: 'Pending Orders', value: '24', icon: 'bell', color: 'bg-rose-500', trend: '8.4%', trendUp: true },
  ];

  const operationalOverview = [
    { title: 'Business Operations', desc: 'Monitor daily sales and performance', icon: 'chart-bar', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Employee Control', desc: 'Manage departments and user access', icon: 'users', color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Logistics tracking', desc: 'Handle inventory and shipments', icon: 'truck', color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Financial Reports', desc: 'Access real-time analytics & tax', icon: 'document-text', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Intelligence</h1>
          <p className="text-slate-500 mt-1">Real-time oversight of your enterprise operations and performance</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <button className="flex items-center px-5 h-11 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
            <Icon name="chart-bar" size="xs" className="mr-2" />
            Export Data
          </button>
          <button className="flex items-center px-5 h-11 bg-[#002147] text-white text-xs font-bold rounded-2xl hover:bg-[#003366] transition-all shadow-lg shadow-blue-900/15 border-none">
            <Icon name="plus" size="xs" className="mr-2" />
            Quick Transaction
          </button>
        </div>
      </div>

      {/* Row 1: Operational Tiles (Enhanced existing feature) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {operationalOverview.map((op, i) => (
          <div key={i} className="group relative bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">
            <div className={`absolute top-0 right-0 w-24 h-24 ${op.bg} opacity-10 rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500`} />
            <div className={`w-12 h-12 ${op.bg} rounded-2xl flex items-center justify-center ${op.color} mb-4 relative z-10 group-hover:scale-110 transition-transform shadow-sm`}>
              <Icon name={op.icon} size="md" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 relative z-10 group-hover:text-[#002147] transition-colors">{op.title}</h3>
            <p className="text-xs text-slate-500 relative z-10 leading-relaxed group-hover:text-slate-600 transition-colors">{op.desc}</p>
          </div>
        ))}
      </div>

      {/* Row 2: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            trendUp={stat.trendUp}
            icon={stat.icon}
            color={stat.color}
            sparkData={sparklineData}
          />
        ))}
      </div>

      {/* Row 3: Full Width Trend Chart */}
      <SalesTrendChart data={salesTrendData} />

      {/* Row 4: Comparison & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ComparisonBarChart data={deptData} />
        <DistributionDonutChart data={distributionData} />
      </div>

      {/* Row 5: Recent Transactions Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-7 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recent Transactions</h2>
              <p className="text-xs text-slate-500 mt-1">Real-time ledger of inbound and outbound activities</p>
            </div>
            <button className="text-[#002147] text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 transition-all">
              Full Statement
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#002147] text-white text-[10px] uppercase font-bold tracking-[0.1em]">
                  <th className="px-8 py-5">Entity / Reference</th>
                  <th className="px-6 py-5">Type</th>
                  <th className="px-6 py-5">Amount</th>
                  <th className="px-6 py-5 text-right pr-8">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-indigo-50/30 transition-all group cursor-pointer border-l-4 border-l-transparent hover:border-l-indigo-600">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110 ${
                          i % 2 === 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {i % 2 === 0 ? 'PU' : 'SA'}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">#TRX-982{i}4</p>
                          <p className="text-[10px] text-slate-400 font-medium group-hover:text-slate-500">Global Supply Corp • 12 Oct</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">{i % 2 === 0 ? 'Purchase' : 'Sales'}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-sm font-bold transition-colors ${i % 2 === 0 ? 'text-rose-600 group-hover:text-rose-700' : 'text-emerald-600 group-hover:text-emerald-700'}`}>
                        {i % 2 === 0 ? '-' : '+'}${245 * i}.00
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right pr-8">
                      <Badge variant={i % 3 === 0 ? 'warning' : 'success'} className="px-3 py-1 text-[9px] font-bold rounded-lg uppercase tracking-wider group-hover:shadow-sm transition-all">
                        {i % 3 === 0 ? 'Pending' : 'Verified'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Notification Panel */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 h-fit">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Safety Alerts</h2>
            <Badge variant="error" className="px-2 py-0.5 text-[10px]">4 ACTIVE</Badge>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 items-start pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  i === 1 ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  <Icon name={i === 1 ? 'archive' : 'clock'} size="sm" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {i === 1 ? 'Critical Stock Level: Dell Workstations' : 'Payment Overdue: Global Partners'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium italic">
                    {i === 1 ? 'Current reached 2 units (Threshold: 5)' : 'Invoice #INV-29304 remains unpaid for 30 days'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all">
            Review All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
