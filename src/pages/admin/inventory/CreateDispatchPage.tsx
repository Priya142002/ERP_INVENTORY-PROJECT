import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Truck, 
  Calendar, 
  Package, 
  MapPin, 
  Save, 
  RotateCcw,
  Plus,
  Trash2
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";

export const CreateDispatchPage: React.FC = () => {
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
            onClick={() => navigate('/admin/inventory/dispatch')}
            className="p-2.5 bg-white hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all border border-slate-200 shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create Material Dispatch</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          {/* General Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-50">
              <div className="p-1.5 bg-orange-50 rounded-lg text-orange-600">
                <Truck size={16} />
              </div>
              <h3 className="font-bold text-slate-900 tracking-tight text-sm uppercase tracking-wider">Shipment Details</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Dispatch No" 
                placeholder="DISP-10025" 
                value="DISP-10025"
                required 
              />
              <Input 
                label="Dispatch Date" 
                type="date" 
                value={new Date().toISOString().split('T')[0]}
                leftIcon={<Calendar size={14} />} 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select 
                label="Customer" 
                placeholder="Select Customer"
                options={[
                  { label: 'Global Tech Solutions', value: '1' },
                  { label: 'Vertex Industries', value: '2' },
                  { label: 'Apex Manufacturing', value: '3' }
                ]} 
                required
              />
              <Select 
                label="Carrier / Shipping Method" 
                placeholder="Select Carrier"
                options={[
                  { label: 'FedEx', value: 'fedex' },
                  { label: 'UPS', value: 'ups' },
                  { label: 'DHL', value: 'dhl' },
                  { label: 'Self Pickup', value: 'self' }
                ]} 
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
                <h3 className="font-bold text-slate-900 tracking-tight text-sm uppercase tracking-wider">Dispatch Items</h3>
              </div>
              <Button variant="secondary" size="sm" leftIcon={<Plus size={16} />}>
                Add Item
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Warehouse</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 w-32">Qty to Ship</th>
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
                      <Select 
                        placeholder="Select Warehouse"
                        options={[
                          { label: 'Main Warehouse', value: '1' },
                          { label: 'West Coast Hub', value: '2' }
                        ]}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-500 text-sm">45 pcs</span>
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
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Source Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-50">
              <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                <MapPin size={16} />
              </div>
              <h3 className="font-bold text-slate-900 tracking-tight text-sm uppercase tracking-wider">Logistics</h3>
            </div>
            <Select 
              label="Source Warehouse" 
              placeholder="Select Source"
              options={[
                { label: 'Main Warehouse', value: '1' },
                { label: 'West Coast Hub', value: '2' },
                { label: 'Central Distribution', value: '3' }
              ]} 
              required
            />
            <Input label="Tracking Number" placeholder="Enter tracking ID" />
          </div>

          {/* Notes */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <Textarea label="Special Instructions" placeholder="Add any shipping notes or instructions..." rows={4} />
          </div>

          <div className="space-y-3 pt-2">
            <Button 
              variant="primary" 
              fullWidth 
              leftIcon={<Save size={18} />} 
              className="py-4 bg-[#002147] hover:bg-[#003366] border-none shadow-lg shadow-blue-900/10 rounded-xl font-bold text-xs uppercase tracking-widest active:scale-[0.98] transition-all"
            >
              Confirm Dispatch
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
