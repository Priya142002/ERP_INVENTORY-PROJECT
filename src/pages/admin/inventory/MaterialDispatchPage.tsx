import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, Download, Edit, Trash2, Calendar, User } from "lucide-react";
import Button from "../../../components/ui/Button";
import DataTable from "../../../components/ui/DataTable";
import Badge from "../../../components/ui/Badge";

// Mock data for Material Dispatch
const MOCK_DISPATCHES = [
  { id: '1', date: '2026-03-16', dispatchNo: 'DISP-10024', customer: 'Global Tech Solutions', sourceWH: 'Main Warehouse', items: 12, status: 'Shipped', carrier: 'FedEx' },
  { id: '2', date: '2026-03-15', dispatchNo: 'DISP-10023', customer: 'Vertex Industries', sourceWH: 'West Coast Hub', items: 5, status: 'Processing', carrier: 'UPS' },
  { id: '3', date: '2026-03-14', dispatchNo: 'DISP-10022', customer: 'Apex Manufacturing', sourceWH: 'Central Distribution', items: 25, status: 'Delivered', carrier: 'DHL' },
  { id: '4', date: '2026-03-14', dispatchNo: 'DISP-10021', customer: 'Blue Horizon Ltd', sourceWH: 'Main Warehouse', items: 8, status: 'Pending', carrier: 'Self Pickup' },
  { id: '5', date: '2026-03-13', dispatchNo: 'DISP-10020', customer: 'Metropulse Corp', sourceWH: 'South Terminal', items: 15, status: 'Shipped', carrier: 'Express Freight' },
];

export const MaterialDispatchPage: React.FC = () => {
  const navigate = useNavigate();
  const [dispatches] = useState(MOCK_DISPATCHES);

  const columns = [
    {
      key: 'dispatchNo' as const,
      label: 'Dispatch No',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center">
          <div className="font-semibold text-slate-900">{value}</div>
        </div>
      )
    },
    {
      key: 'date' as const,
      label: 'Date',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <Calendar size={14} className="text-slate-400" />
          {value}
        </div>
      )
    },
    {
      key: 'customer' as const,
      label: 'Customer',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <User size={14} className="text-slate-400" />
          {value}
        </div>
      )
    },
    {
      key: 'items' as const,
      label: 'Items Qty',
      align: 'center' as const,
      render: (val: number) => <span className="font-medium">{val} units</span>
    },
    {
      key: 'status' as const,
      label: 'Status',
      filterable: true,
      render: (value: string) => {
        let variant: 'success' | 'warning' | 'info' | 'default' = 'default';
        if (value === 'Delivered') variant = 'success';
        if (value === 'Shipped') variant = 'info';
        if (value === 'Processing') variant = 'warning';
        
        return <Badge variant={variant}>{value}</Badge>;
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Material Dispatch</h1>
        </div>
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <Button 
            variant="secondary" 
            className="rounded-xl px-4 md:px-6 h-9 md:h-10 text-[10px] md:text-xs font-bold transition-all border-slate-200"
            leftIcon={<Download size={14} />}
          >
            Export
          </Button>
          <Button 
            variant="primary" 
            className="bg-[#334e68] hover:bg-[#243b53] text-white border-none shadow-lg shadow-indigo-500/10 rounded-xl px-4 md:px-8 h-9 md:h-10 text-[10px] md:text-xs font-bold transition-all"
            leftIcon={<Plus size={16} />}
            onClick={() => navigate('/admin/inventory/dispatch/create')}
          >
            Create Dispatch
          </Button>
        </div>
      </div>


      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <DataTable 
          data={dispatches}
          columns={columns}
          searchable
          filterable
          paginated
          pageSize={10}
          actions={[
            {
              label: 'Edit',
              icon: <Edit size={16} />,
              onClick: (item) => console.log('Edit', item),
              variant: 'secondary'
            },

            {
              label: 'Delete',
              icon: <Trash2 size={16} />,
              onClick: (item) => console.log('Delete', item),
              variant: 'danger'
            }
          ]}
        />
      </div>
    </motion.div>
  );
};
