import React from 'react';
import Icon from '../../components/ui/Icon';
import Badge from '../../components/ui/Badge';

export const AdminDashboardPage: React.FC = () => {
  const stats = [
    { label: 'Total Sales', value: '$12,450', icon: 'cash', color: 'bg-green-500', trend: '+12.5%' },
    { label: 'Purchases', value: '$8,200', icon: 'shopping-cart', color: 'bg-blue-500', trend: '+5.2%' },
    { label: 'Stock Value', value: '$45,000', icon: 'archive', color: 'bg-purple-500', trend: '-2.1%' },
    { label: 'Low Stock Items', value: '12', icon: 'bell', color: 'bg-red-500', trend: 'Critical' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Overview</h1>
          <p className="text-slate-500 mt-1">Experience the evolution of your enterprise with real-time intelligence</p>
        </div>
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <button className="px-4 md:px-6 h-9 md:h-10 bg-white border border-slate-200 text-slate-600 text-[10px] md:text-xs font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            Analytics reports
          </button>
          <button className="px-4 md:px-6 h-9 md:h-10 bg-[#002147] text-white text-[10px] md:text-xs font-bold rounded-xl hover:bg-[#003366] transition-all shadow-lg shadow-blue-900/10 border-none">
            Smart Control
          </button>
        </div>
      </div>

      {/* Premium Info Banner Section */}
      <div className="bg-[#002147] rounded-2xl md:rounded-[1.5rem] py-3 px-6 md:py-4 md:px-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 scale-125 rotate-12 pointer-events-none text-white">
          <Icon name="archive" size="lg" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-inner">
              <Icon name="archive" size="sm" />
            </div>
            <div>
              <p className="text-white/60 font-medium text-[9px] md:text-[10px] uppercase tracking-[0.2em] leading-none mb-1">Global Intelligence</p>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">Welcome Back, Administrator</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="text-white/90 font-bold text-sm">124 Transactions Today Synchronized</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 md:p-5 rounded-xl md:rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${stat.color.replace('bg-', 'bg-')}/10 flex items-center justify-center ${stat.color.replace('bg-', 'text-')} rounded-lg md:rounded-xl shadow-sm border border-current/10`}>
                <Icon name={stat.icon} size="sm" />
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase ${
                stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 
                stat.trend === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <h3 className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-0.5">{stat.label}</h3>
              <p className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-[#334e68] transition-colors">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Invoices/Sales */}
        <div className="lg:col-span-2 bg-white rounded-xl md:rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">Recent Sales Activity</h2>
            <button className="text-[#334e68] text-[9px] font-bold uppercase tracking-widest hover:underline px-3 py-1.5 bg-indigo-50 rounded-lg transition-all">View Full Ledger</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-[0.15em]">
                  <th className="px-8 py-5">Invoice #</th>
                  <th className="px-6 py-5">Client / Customer</th>
                  <th className="px-6 py-5">Issue Date</th>
                  <th className="px-6 py-5">Total Amount</th>
                  <th className="px-6 py-5 text-right pr-8">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-slate-50/20 transition-all group">
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-[#3b4cb8] transition-colors">#INV-00{i}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-slate-200" />
                        <span className="text-sm font-medium text-slate-600">Enterprise Logistics Ltd.</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">Oct 12, 2023</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-slate-900">$2,245.00</span>
                    </td>
                    <td className="px-6 py-5 text-right pr-8">
                      <Badge variant="success" className="px-3 py-0.5 text-[10px] font-bold uppercase rounded-md tracking-wider">Paid</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl md:rounded-[1.5rem] border border-slate-100 shadow-sm p-6 md:p-8">
            <h2 className="text-base md:text-lg font-bold text-slate-900 mb-6 md:mb-8 tracking-tight">Asset Distribution</h2>
            <div className="space-y-6">
              {[
                { label: 'Cloud Infrastructure', percentage: 45, color: 'bg-[#3b4cb8]' },
                { label: 'Hardware Assets', percentage: 25, color: 'bg-emerald-500' },
                { label: 'Software Licenses', percentage: 20, color: 'bg-amber-500' },
                { label: 'Maintenance Goods', percentage: 10, color: 'bg-slate-400' },
              ].map((cat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">{cat.label}</span>
                    <span className="font-bold text-slate-900 text-sm leading-none">{cat.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div 
                      className={`h-full ${cat.color} rounded-full shadow-sm`} 
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-5 bg-indigo-50/30 rounded-2xl border border-indigo-100/50 relative overflow-hidden group">
              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-[#3b4cb8] shadow-sm border border-indigo-50 group-hover:rotate-12 transition-transform">
                  <Icon name="bell" size="sm" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-tight">Critical Inventory Alerts</p>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-medium">3 SKUs have fallen below the mandatory safety stock threshold.</p>
                  <button className="mt-3 text-[10px] font-bold text-[#3b4cb8] uppercase tracking-[0.15em] hover:underline">Resolve Stockouts </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
