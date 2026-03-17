import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  FileText, 
  ClipboardList, 
  PieChart, 
  History, 
  ArrowRightLeft, 
  AlertTriangle,
  Download,
  ChevronRight
} from "lucide-react";
import Button from "../../../components/ui/Button";

const REPORT_CATEGORIES = [
  {
    title: "Stock Reports",
    reports: [
      { name: "Current Stock Balance", description: "Real-time stock levels across all warehouses", icon: <ClipboardList size={20} /> },
      { name: "Low Stock Report", description: "Items below minimum or reorder levels", icon: <AlertTriangle size={20} className="text-amber-500" /> },
      { name: "Stock Expiry Report", description: "Items approaching expiration date", icon: <History size={20} /> },
    ]
  },
  {
    title: "Movement Reports",
    reports: [
      { name: "Stock Ledger", description: "Detailed transaction history for specific items", icon: <FileText size={20} /> },
      { name: "Transfer History", description: "Records of all inter-warehouse stock movements", icon: <ArrowRightLeft size={20} /> },
      { name: "Material Dispatch Log", description: "History of outgoing goods and shipments", icon: <BarChart3 size={20} /> },
    ]
  },
  {
    title: "Valuation & Analysis",
    reports: [
      { name: "Inventory Valuation", description: "Total value of stock using FIFO/Weighted Average", icon: <PieChart size={20} /> },
      { name: "ABC Analysis", description: "Classification based on value and volume", icon: <BarChart3 size={20} /> },
      { name: "Stock Aging Report", description: "Analysis of how long stock has been in inventory", icon: <History size={20} /> },
    ]
  }
];

export const InventoryReportsPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      {/* Page Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Asset Intelligence</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="px-4 h-10 text-xs font-bold rounded-xl border-slate-200" leftIcon={<Download size={14} />}>
            Export Summary
          </Button>
        </div>
      </div>



      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {REPORT_CATEGORIES.map((category) => (
          <div key={category.title} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">
              {category.title}
            </h3>
            <div className="space-y-3">
              {category.reports.map((report) => (
                <motion.div
                  key={report.name}
                  whileHover={{ x: 4 }}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-slate-50 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {report.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                          {report.name}
                        </h4>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {report.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access Card */}
      <div className="bg-indigo-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Need a Custom Report?</h2>
          <p className="text-indigo-100 max-w-md">
            Our analytics engine can generate tailored reports based on your specific business requirements and KPIs.
          </p>
        </div>
        <Button 
          variant="primary" 
          className="bg-white text-indigo-600 hover:bg-indigo-50 border-none relative z-10"
        >
          Contact Support
        </Button>
        {/* Background blobs */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-50" />
        <div className="absolute -left-10 -top-10 w-32 h-32 bg-indigo-400 rounded-full blur-2xl opacity-30" />
      </div>
    </motion.div>
  );
};

