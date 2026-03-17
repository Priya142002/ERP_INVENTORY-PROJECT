import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, Download, Edit, Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import DataTable from "../../../components/ui/DataTable";

// Mock data for products
const MOCK_PRODUCTS = [
  { id: '1', name: 'Premium Wireless Headphones', sku: 'WHP-001', category: 'Electronics', brand: 'Sony', unit: 'pcs', stock: 45, price: 299.99, status: 'Active' },
  { id: '2', name: 'Smart Fitness Tracker', sku: 'SFT-002', category: 'Wearables', brand: 'Fitbit', unit: 'pcs', stock: 12, price: 149.50, status: 'Low Stock' },
  { id: '3', name: 'Ergonomic Office Chair', sku: 'EOC-003', category: 'Furniture', brand: 'Herman Miller', unit: 'pcs', stock: 8, price: 899.00, status: 'Active' },
  { id: '4', name: 'Mechanical Gaming Keyboard', sku: 'MGK-004', category: 'Accessories', brand: 'Logitech', unit: 'pcs', stock: 0, price: 129.99, status: 'Out of Stock' },
  { id: '5', name: '4K Ultra HD Monitor', sku: 'MON-005', category: 'Electronics', brand: 'Dell', unit: 'pcs', stock: 25, price: 449.00, status: 'Active' },
  { id: '6', name: 'Leather Travel Backpack', sku: 'BPK-006', category: 'Fashion', brand: 'Bellroy', unit: 'pcs', stock: 15, price: 189.00, status: 'Active' },
  { id: '7', name: 'Stainless Steel Water Bottle', sku: 'WBT-007', category: 'Home', brand: 'Hydro Flask', unit: 'pcs', stock: 120, price: 34.95, status: 'Active' },
  { id: '8', name: 'Noise-Cancelling Earbuds', sku: 'NCE-008', category: 'Electronics', brand: 'Bose', unit: 'pcs', stock: 5, price: 199.00, status: 'Low Stock' },
];

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products] = useState(MOCK_PRODUCTS);

  const columns = [
    {
      key: 'name' as const,
      label: 'Products',
      sortable: true,
      render: (value: string, item: any) => (
        <div className="flex items-center">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 tracking-tight leading-none group-hover:text-[#334e68] transition-colors">{value}</div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.sku}</span>
              <div className="h-1 w-1 rounded-full bg-slate-200" />
              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{item.brand}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'category' as const,
      label: 'Classification',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <span className="text-[9px] font-bold uppercase tracking-widest bg-indigo-50/50 text-indigo-600 border border-indigo-100 rounded-md py-0.5 px-1.5 inline-block">
          {value}
        </span>
      )
    },
    {
      key: 'stock' as const,
      label: 'Inventory',
      sortable: true,
      align: 'center' as const,
      render: (value: number, item: any) => (
        <div className="space-y-1.5">
          <div className="font-bold text-slate-700 text-sm">
            {value} <span className="text-[10px] text-slate-400 font-bold uppercase ml-0.5">{item.unit}</span>
          </div>
          <div className="w-16 h-1 bg-slate-100 rounded-full mx-auto overflow-hidden">
            <div 
              className={`h-full rounded-full ${value > 20 ? 'bg-emerald-500' : value > 0 ? 'bg-amber-500' : 'bg-rose-500'}`} 
              style={{ width: `${Math.min((value / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      )
    },
    {
      key: 'price' as const,
      label: 'M.R.P / Rate',
      sortable: true,
      align: 'right' as const,
      render: (value: number) => (
        <div className="font-mono font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 inline-block">
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
      )
    },
    {
      key: 'status' as const,
      label: 'Live Status',
      filterable: true,
      render: (value: string) => {
        if (value === 'Active') return (
          <div className="flex items-center gap-1.5 text-emerald-600">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Available</span>
          </div>
        );
        if (value === 'Low Stock') return (
          <div className="flex items-center gap-1.5 text-amber-600">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Replenish</span>
          </div>
        );
        return (
          <div className="flex items-center gap-1.5 text-rose-600">
            <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Depleted</span>
          </div>
        );
      }
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Page Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Product Catalog</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="px-4 h-10 text-xs font-bold rounded-xl border-slate-200" leftIcon={<Download size={14} />}>
            Export
          </Button>
          <Button 
            variant="primary" 
            className="bg-[#002147] hover:bg-[#003366] text-white px-6 h-10 text-xs font-bold rounded-xl border-none shadow-lg shadow-blue-900/10 active:scale-[0.98] transition-all"
            leftIcon={<Plus size={14} />}
            onClick={() => navigate('/admin/inventory/products/add')}
          >
            New Product
          </Button>
        </div>
      </div>


      {/* Main Content Grid with Filter Pills */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          {['All Products', 'In Stock', 'Critical Level', 'Recently Added'].map((chip, idx) => (
            <button key={chip} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-tight transition-all border ${idx === 0 ? 'bg-[#002147] text-white border-[#002147] shadow-md shadow-blue-900/10' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}>
              {chip}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl md:rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <DataTable 
            data={products}
            columns={columns}
            searchable
            filterable
            paginated
            pageSize={10}
            actions={[
            {
              label: 'Update',
              icon: <Edit size={16} />,
              onClick: (item) => console.log('Edit', item),
              variant: 'secondary'
            },
              {
                label: 'Archive',
                icon: <Trash2 size={16} />,
                onClick: (item) => console.log('Delete', item),
                variant: 'danger'
              }
            ]}
          />
        </div>
      </div>
    </motion.div>
  );
};

