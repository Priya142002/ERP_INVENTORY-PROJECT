import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Package, 
  MapPin, 
  Save, 
  RotateCcw,
  Plus,
  Trash2,
  AlertCircle
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";

export const CreateTransferPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6 pb-12"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/inventory/transfer')}
            className="p-2.5 bg-white hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all border border-slate-200 shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">New Product Transfer</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Transfer Routing */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-50">
              <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                <MapPin size={16} />
              </div>
              <h3 className="font-bold text-slate-900 tracking-tight text-sm uppercase tracking-wider">Transfer Routing</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Reference No" 
                placeholder="TR-2026-006" 
                value="TR-2026-006"
                required 
              />
              <Input 
                label="Transfer Date" 
                type="date" 
                value={new Date().toISOString().split('T')[0]}
                leftIcon={<Calendar size={14} />} 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select 
                label="From Warehouse" 
                placeholder="Source Location"
                options={[
                  { label: 'Main Warehouse', value: '1' },
                  { label: 'West Coast Hub', value: '2' },
                  { label: 'Central Distribution', value: '3' }
                ]} 
                required
              />
              <Select 
                label="To Warehouse" 
                placeholder="Destination Location"
                options={[
                  { label: 'Main Warehouse', value: '1' },
                  { label: 'West Coast Hub', value: '2' },
                  { label: 'Central Distribution', value: '3' },
                  { label: 'South Export Terminal', value: '4' }
                ]} 
                required
              />
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <Package size={16} />
                </div>
                <h3 className="font-bold text-slate-900 tracking-tight text-sm uppercase tracking-wider">Transfer Items</h3>
              </div>
              <Button variant="secondary" size="sm" leftIcon={<Plus size={16} />}>
                Add Item
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-6 py-4">Product Name</th>
                    <th className="px-6 py-4">SKU</th>
                    <th className="px-6 py-4">Current Stock</th>
                    <th className="px-6 py-4 w-32">Transfer Qty</th>
                    <th className="px-6 py-4 text-center w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="group">
                    <td className="px-6 py-4">
                      <Select 
                        placeholder="Search Product"
                        options={[
                          { label: 'Premium Wireless Headphones', value: '1' },
                          { label: 'Smart Fitness Tracker', value: '2' }
                        ]}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-400 text-xs">WHP-001</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-500 text-sm font-medium">45 pcs</span>
                    </td>
                    <td className="px-6 py-4">
                      <Input type="number" placeholder="0" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700 leading-relaxed">
                Ensure the destination warehouse has sufficient capacity for these items. Inventory levels will be adjusted upon confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Shipping Charge */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-50">
              <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                <Plus size={16} />
              </div>
              <h3 className="font-bold text-slate-900 tracking-tight text-sm uppercase tracking-wider">Other Details</h3>
            </div>
            <Input 
              label="Shipping Charge" 
              type="number" 
              placeholder="0.00" 
              value="0.00"
              leftIcon={<span className="text-xs font-bold">$</span>}
            />
            <Select 
              label="Transfer Priority"
              options={[
                { label: 'Normal', value: 'normal' },
                { label: 'Urgent', value: 'urgent' },
                { label: 'Critical', value: 'critical' }
              ]}
              value="normal"
            />
          </div>

          {/* User / Remarks */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <Textarea label="Remarks" placeholder="Internal notes for this transfer..." rows={4} />
          </div>

          <div className="space-y-3 pt-2">
            <Button 
              variant="primary" 
              fullWidth 
              leftIcon={<Save size={18} />} 
              className="py-4 bg-[#002147] hover:bg-[#003366] border-none shadow-lg shadow-blue-900/10 rounded-xl font-bold text-xs uppercase tracking-widest active:scale-[0.98] transition-all"
            >
              Execute Transfer
            </Button>
            <Button 
              variant="secondary" 
              fullWidth 
              leftIcon={<RotateCcw size={18} />} 
              className="py-4 rounded-xl font-bold text-xs uppercase tracking-widest border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
            >
              Reset Form
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
