import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign, 
  ArrowRight,
  PieChart,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import Button from "../../../components/ui/Button";

const REPORT_CATEGORIES = [
  {
    title: "Revenue Analysis",
    description: "In-depth analysis of sales revenue across periods and segments.",
    reports: [
      { id: '1', title: 'Sales Summary', description: 'Overall sales performance overview', icon: <TrendingUp size={20} /> },
      { id: '2', title: 'Revenue by Category', description: 'Breakdown of income by product types', icon: <PieChart size={20} /> },
      { id: '3', title: 'Monthly Growth', description: 'Comparison of mo-m performance', icon: <BarChart3 size={20} /> },
    ]
  },
  {
    title: "Customer Insights",
    description: "Understand your customer behavior and geographic distribution.",
    reports: [
      { id: '4', title: 'Top Customers', description: 'High-value customer ranking', icon: <Users size={20} /> },
      { id: '5', title: 'Customer Acquisition', description: 'New vs returning customer rates', icon: <ArrowRight size={20} /> },
      { id: '6', title: 'Customer Aging', description: 'Outstanding receivables analysis', icon: <Calendar size={20} /> },
    ]
  },
  {
    title: "Transactional Reports",
    description: "Detailed lists and summaries of sales activities.",
    reports: [
      { id: '7', title: 'Invoice Register', description: 'Complete list of all sales invoices', icon: <FileText size={20} /> },
      { id: '8', title: 'Payment Receipt Log', description: 'Log of all customer payments', icon: <DollarSign size={20} /> },
      { id: '9', title: 'Tax Summary', description: 'Sales tax collected report', icon: <Download size={20} /> },
    ]
  }
];

export const SalesReportsPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Page Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Revenue Intelligence</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="px-4 h-10 text-[10px] md:text-xs font-bold rounded-xl border-slate-200" leftIcon={<Filter size={14} />}>
            General Filters
          </Button>
          <Button 
            variant="primary" 
            className="bg-[#002147] hover:bg-[#003366] text-white px-6 h-10 text-[10px] md:text-xs font-bold rounded-xl border-none shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all"
            leftIcon={<Download size={14} />}
          >
            Export All
          </Button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {REPORT_CATEGORIES.map((category) => (
          <div key={category.title} className="space-y-4">
            <div className="px-1">
              <h3 className="text-lg font-bold text-slate-900">{category.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{category.description}</p>
            </div>
            
            <div className="space-y-3">
              {category.reports.map((report) => (
                <motion.button
                  key={report.id}
                  whileHover={{ x: 4 }}
                  className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      {report.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{report.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{report.description}</p>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-blue-200">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-2xl font-bold text-white">Advanced Custom Reports</h3>
            <p className="text-blue-100 max-w-md">Need something specific? Use our advanced query builder to create cross-modular sales reports.</p>
          </div>
          <Button variant="secondary" className="bg-white border-transparent text-blue-700 hover:bg-blue-50 px-8 py-3 text-base shadow-lg">
            Open Report Builder
          </Button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 opacity-20 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
    </motion.div>
  );
};
