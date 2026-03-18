import React from 'react';
import { motion } from 'framer-motion';
import { Download, Search, Filter, BarChart, FileText, PieChart, Activity } from 'lucide-react';
import Button from '../../../components/ui/Button';

export const ProductionReportsPage: React.FC = () => {
  const reports = [
    { id: '1', title: 'Daily Output Summary', desc: 'Summary of total units produced by each shift today.', icon: BarChart, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: '2', title: 'Material Consumption', desc: 'Detailed report on raw material usage vs planning benchmarks.', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: '3', title: 'Production Cost Analysis', desc: 'Breakdown of manufacturing costs including labor and overhead.', icon: PieChart, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: '4', title: 'Yield & Waste Report', desc: 'Analysis of production yield and scrap material generated.', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Production Reports</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Analyze manufacturing performance and resource efficiency</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="px-4 h-10 text-xs font-bold rounded-xl border-slate-200" leftIcon={<Download size={14} />}>
            Export All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
        {reports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${report.bg} ${report.color} rounded-2xl flex items-center justify-center shadow-sm border border-current/10 group-hover:scale-110 transition-transform`}>
                <report.icon size={24} />
              </div>
              <button className="text-slate-400 hover:text-blue-600 transition-colors">
                <Download size={18} />
              </button>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{report.title}</h3>
              <p className="text-xs text-slate-500 mt-2 font-medium italic">{report.desc}</p>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Last generated: 2 hours ago</span>
              <button className="text-blue-600 font-bold text-[10px] uppercase tracking-widest hover:underline transition-all">Generate Now</button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-white/50">
          <div className="flex items-center gap-4">
            <div className="relative font-bold uppercase tracking-widest text-[#002147] text-[11px] flex items-center gap-2">
              <BarChart size={14} className="text-blue-600" />
              <span>Historical Analytics Monitor</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <div className="relative">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search archive..." className="pl-10 pr-4 py-2 text-[11px] bg-slate-50/50 border border-slate-200 rounded-xl outline-none w-48 transition-all font-medium" />
             </div>
             <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-sm text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                <Filter size={14} />
             </div>
          </div>
        </div>
        <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-inner"><PieChart size={40} /></div>
            <p className="text-slate-400 text-sm font-medium italic max-w-sm mx-auto lowercase">NO HISTORICAL DATA STREAM DETECTED FOR ANALYTICAL PROCESSING IN THE CURRENT CYCLE.</p>
        </div>
      </div>
    </motion.div>
  );
};
