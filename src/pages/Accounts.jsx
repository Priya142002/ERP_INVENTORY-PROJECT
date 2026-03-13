import React from 'react';
import { PageHeader, MockTable, StatCard } from '../components/UIComponents';
import { Wallet, TrendingUp, HandCoins, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function Accounts() {
  const columns = ['Tx ID', 'Date', 'Description', 'Category', 'Amount', 'Status'];
  const mockData = [
    ['TX-0091', 'Today 10:24', 'Server Costs', 'Infrastructure', <span className="text-danger">-$1,240.00</span>, <span className="badge badge-success">Completed</span>],
    ['TX-0092', 'Today 09:12', 'Client Payment', 'Revenue', <span className="text-success">+$4,500.00</span>, <span className="badge badge-success">Completed</span>],
    ['TX-0093', 'Yesterday', 'Office Supplies', 'Expenses', <span className="text-danger">-$250.00</span>, <span className="badge badge-success">Completed</span>],
    ['TX-0094', 'Oct 12', 'Q3 Tax Payment', 'Tax', <span className="text-danger">-$15,400.00</span>, <span className="badge badge-warning">Pending</span>],
    ['TX-0095', 'Oct 10', 'Consulting Fees', 'Revenue', <span className="text-success">+$8,200.00</span>, <span className="badge badge-success">Completed</span>],
  ];

  return (
    <div>
      <PageHeader 
        title="Accounts & Finance" 
        subtitle="Track income, expenses, and overall financial health."
        actionLabel="New Transaction"
      />
      
      <div className="grid-cards">
        <StatCard title="Total Revenue" value="$124,500" icon={TrendingUp} />
        <StatCard title="Total Expenses" value="$42,300" icon={ArrowDownRight} />
        <StatCard title="Net Profit" value="$82,200" icon={ArrowUpRight} />
        <StatCard title="Cash on Hand" value="$350,000" icon={Wallet} />
      </div>

      <MockTable columns={columns} data={mockData} />
    </div>
  );
}
