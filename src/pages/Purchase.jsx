import React from 'react';
import { PageHeader, MockTable, StatCard } from '../components/UIComponents';
import { ShoppingBag, Truck, CheckSquare, Clock } from 'lucide-react';

export default function Purchase() {
  const columns = ['PO Number', 'Vendor', 'Date', 'Amount', 'Expected Delivery', 'Status'];
  const mockData = [
    ['PO-10041', 'Dell Computers', 'Today', '$14,500', '16 Oct 2026', <span className="badge badge-warning">Processing</span>],
    ['PO-10040', 'Office Depot', 'Yesterday', '$845', '14 Oct 2026', <span className="badge badge-primary">Shipped</span>],
    ['PO-10039', 'Global Logistics', '10 Oct', '$2,400', '12 Oct 2026', <span className="badge badge-success">Delivered</span>],
    ['PO-10038', 'Amazon B2B', '08 Oct', '$1,250', '10 Oct 2026', <span className="badge badge-success">Delivered</span>],
    ['PO-10037', 'Cisco Systems', '05 Oct', '$45,000', '20 Nov 2026', <span className="badge badge-warning">Backordered</span>],
  ];

  return (
    <div>
      <PageHeader 
        title="Purchase & Procurement" 
        subtitle="Manage supplier orders, vendor relationships, and inbound deliveries."
        actionLabel="Create PO"
      />
      
      <div className="grid-cards">
        <StatCard title="Active Orders" value="28" icon={ShoppingBag} />
        <StatCard title="In Transit" value="12" icon={Truck} colorClass="primary" />
        <StatCard title="Needs Approval" value="4" icon={CheckSquare} colorClass="warning" />
        <StatCard title="Pending Payments" value="7" icon={Clock} colorClass="danger" />
      </div>

      <MockTable columns={columns} data={mockData} />
    </div>
  );
}
