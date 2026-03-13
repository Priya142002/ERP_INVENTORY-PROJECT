import React from 'react';
import { PageHeader, MockTable, StatCard } from '../components/UIComponents';
import { BadgeDollarSign, Users, ArrowUpRight, Percent } from 'lucide-react';

export default function Sales() {
  const columns = ['Invoice #', 'Customer', 'Date', 'Amount', 'Tax', 'Status'];
  const mockData = [
    ['INV-8801', 'TechCorp Solutions', 'Today', '$12,400', '$1,240', <span className="badge badge-success">Paid</span>],
    ['INV-8802', 'Global Industries', 'Yesterday', '$3,500', '$350', <span className="badge badge-warning">Pending</span>],
    ['INV-8803', 'Apex Systems', '11 Oct', '$8,200', '$820', <span className="badge badge-success">Paid</span>],
    ['INV-8804', 'Starlight Media', '10 Oct', '$15,000', '$1,500', <span className="badge badge-danger">Overdue</span>],
    ['INV-8805', 'Nova Soft', '08 Oct', '$5,600', '$560', <span className="badge badge-success">Paid</span>],
  ];

  return (
    <div>
      <PageHeader 
        title="Sales & Revenue" 
        subtitle="Manage customer invoices, track payments, and analyze sales performance."
        actionLabel="Create Invoice"
      />
      
      <div className="grid-cards">
        <StatCard title="Monthly Sales" value="$458,200" icon={BadgeDollarSign} />
        <StatCard title="Active Customers" value="1,240" icon={Users} colorClass="primary" />
        <StatCard title="Conversion Rate" value="12.4%" icon={Percent} colorClass="success" />
        <StatCard title="Growth" value="+18.5%" icon={ArrowUpRight} />
      </div>

      <MockTable columns={columns} data={mockData} />
    </div>
  );
}
