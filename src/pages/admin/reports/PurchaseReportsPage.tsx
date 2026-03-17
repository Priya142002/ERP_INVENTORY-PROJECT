import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart,
  ShoppingBag,
  Users,
  FileText, 
  DollarSign, 
  ArrowRight,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  PieChart
} from "lucide-react";
import Button from "../../../components/ui/Button";

const REPORT_CATEGORIES = [
  {
    title: "Procurement Analysis",
    description: "Analyze your spending and item procurement patterns.",
    reports: [
      { id: '1', title: 'Purchase Summary', description: 'Total purchase volume over time', icon: <TrendingUp size={20} /> },
      { id: '2', title: 'Spend by Vendor', description: 'Analysis of top suppliers by spend', icon: <Users size={20} /> },
      { id: '3', title: 'Category Breakdown', description: 'Distribution of purchases by category', icon: <PieChart size={20} /> },
    ]
  },
  {
    title: "Vendor Performance",
    description: "Evaluate your suppliers' reliability and history.",
    reports: [
      { id: '4', title: 'Vendor Scorecard', description: 'Delivery and quality metrics', icon: <BarChart size={20} /> },
      { id: '5', title: 'Purchase History', description: 'Detailed log of all items bought', icon: <ShoppingBag size={20} /> },
      { id: '6', title: 'Unpaid Bills', description: 'Accounts payable summary', icon: <Calendar size={20} /> },
    ]
  },
  {
    title: "Compliance & Financials",
    description: "Tax reports and transactional logs.",
    reports: [
      { id: '7', title: 'Purchase Register', description: 'Listing of all purchase invoices', icon: <FileText size={20} /> },
      { id: '8', title: 'Direct Payments', description: 'History of all vendor payments', icon: <DollarSign size={20} /> },
      { id: '9', title: 'Purchase Tax Report', description: 'Input tax credit analysis', icon: <Download size={20} /> },
    ]
  }
];

export const PurchaseReportsPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Page Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Procurement Intelligence</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="px-4 h-10 text-xs font-bold rounded-xl border-slate-200" leftIcon={<Filter size={14} />}>
            Filters
          </Button>
          <Button 
            variant="primary" 
            className="bg-[#002147] hover:bg-[#003366] text-white px-6 h-10 text-xs font-bold rounded-xl border-none shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all" 
            leftIcon={<Download size={14} />}
          >
            Export Reports
          </Button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {REPORT_CATEGORIES.map((category) => (
          <div key={category.title} className="space-y-4">
            <div className="px-1">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{category.title}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{category.description}</p>
            </div>
            
            <div className="space-y-3">
              {category.reports.map((report) => (
                <motion.button
                  key={report.id}
                  whileHover={{ x: 4 }}
                  className="w-full text-left bg-white p-3.5 rounded-xl shadow-sm border border-slate-100 hover:border-[#002147] hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="h-9 w-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#002147]/5 group-hover:text-[#002147] transition-colors">
                      {report.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-[#002147] transition-colors">{report.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{report.description}</p>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-[#002147] transition-colors" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-indigo-900 rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-indigo-100">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-2xl font-bold text-white">Purchase Cycle Analytics</h3>
            <p className="text-indigo-100 max-w-md">Analyze the entire lifecycle of your procurement from order to payment reconciliation.</p>
          </div>
          <Button variant="secondary" className="bg-white border-transparent text-indigo-900 hover:bg-slate-50 px-8 py-3 text-base shadow-lg">
            View Analytics Dashboard
          </Button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400 opacity-20 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
    </motion.div>
  );
};
