import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  ArrowLeft, 
  Tag, 
  DollarSign, 
  Database, 
  Image as ImageIcon,
  Save,
  RotateCcw
} from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";

export const AddProductPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6 pb-12"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/inventory/products')}
            className="p-2.5 bg-white hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all border border-slate-200 shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add Products</h1>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-50">
              <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                <Tag size={16} />
              </div>
              <h3 className="font-bold text-slate-900 tracking-tight text-sm uppercase tracking-wider">Primary Metadata</h3>
            </div>
            
            <Input 
              label="Product Name" 
              placeholder="e.g. Wireless Noise Cancelling Headphones" 
              required 
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="SKU" 
                placeholder="PROD-10293" 
                required 
              />
              <Select 
                label="Category" 
                options={[
                  { label: 'Electronics', value: 'electronics' },
                  { label: 'Furniture', value: 'furniture' },
                  { label: 'Clothing', value: 'clothing' },
                  { label: 'Accessories', value: 'accessories' }
                ]} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Select 
                label="Brand" 
                options={[
                  { label: 'Sony', value: 'sony' },
                  { label: 'Apple', value: 'apple' },
                  { label: 'Logitech', value: 'logitech' }
                ]} 
              />
              <Select 
                label="Unit of Measure" 
                options={[
                  { label: 'Pcs (Piece)', value: 'pcs' },
                  { label: 'Kg (Kilogram)', value: 'kg' },
                  { label: 'Box', value: 'box' }
                ]} 
              />
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-50">
              <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                <DollarSign size={16} />
              </div>
              <h3 className="font-bold text-slate-900 tracking-tight text-sm uppercase tracking-wider">Financial Dimensions</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Purchase Price" 
                type="number" 
                placeholder="0.00" 
                leftIcon={<DollarSign size={14} />} 
              />
              <Input 
                label="Selling Price" 
                type="number" 
                placeholder="0.00" 
                leftIcon={<DollarSign size={14} />} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Tax Percentage (%)" 
                type="number" 
                placeholder="5" 
              />
              <Input 
                label="Opening Stock" 
                type="number" 
                placeholder="0" 
                leftIcon={<Database size={14} />} 
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <Textarea 
              label="Product Description" 
              placeholder="Write detailed information about the product..." 
              rows={4} 
            />
          </div>
        </div>

        {/* Right Column - Media & Status */}
        <div className="space-y-6">
          {/* Status Selection */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
             <Select 
              label="Initial Status" 
              options={[
                { label: 'Active', value: 'active' },
                { label: 'Draft', value: 'draft' },
                { label: 'Inactive', value: 'inactive' }
              ]} 
            />
          </div>

          {/* Image Upload Placeholder */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-50">
              <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                <ImageIcon size={16} />
              </div>
              <h3 className="font-bold text-slate-900 tracking-tight text-sm uppercase tracking-wider">Visual Assets</h3>
            </div>
            
            <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 p-6 cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all group">
              <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                <Plus size={24} />
              </div>
              <p className="text-xs font-medium text-slate-500 text-center">Click to upload product image</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest text-center">JPG, PNG, WebP up to 5MB</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button 
              variant="primary" 
              fullWidth 
              leftIcon={<Save size={18} />}
              className="py-4 bg-[#002147] hover:bg-[#003366] border-none shadow-lg shadow-blue-900/10 rounded-xl font-bold text-xs uppercase tracking-widest active:scale-[0.98] transition-all"
            >
              Commit Product
            </Button>
            <Button 
              variant="secondary" 
              fullWidth 
              leftIcon={<RotateCcw size={18} />}
              className="py-4 rounded-xl font-bold text-xs uppercase tracking-widest border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
            >
              Clear Workspace
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
