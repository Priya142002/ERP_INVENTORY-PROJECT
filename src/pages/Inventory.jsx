import React from 'react';
import { PageHeader, MockTable, StatCard } from '../components/UIComponents';
import { Package, AlertTriangle, Layers, ArrowDownUp } from 'lucide-react';

export default function Inventory() {
  const columns = ['SKU', 'Product Name', 'Category', 'Stock Level', 'Reorder Point', 'Status'];
  const mockData = [
    ['PRD-001', 'Logitech MX Master 3S', 'Electronics', '142', '50', <span className="badge badge-success">In Stock</span>],
    ['PRD-002', 'Apple M2 MacBook Air', 'Laptops', '12', '15', <span className="badge badge-warning">Low Stock</span>],
    ['PRD-003', 'Herman Miller Aeron Air', 'Furniture', '0', '5', <span className="badge badge-danger">Out of Stock</span>],
    ['PRD-004', 'Sony WH-1000XM5', 'Audio', '38', '20', <span className="badge badge-success">In Stock</span>],
    ['PRD-005', 'Uplift V2 Standing Desk', 'Furniture', '56', '10', <span className="badge badge-success">In Stock</span>],
  ];

  return (
    <div>
      <PageHeader 
        title="Inventory Warehouse" 
        subtitle="Current stock levels, locations, and low stock alerts."
        actionLabel="Receive Stock"
      />
      
      <div className="grid-cards">
        <StatCard title="Total SKUs" value="4,208" icon={Package} />
        <StatCard title="Low Stock Items" value="45" icon={AlertTriangle} colorClass="warning" />
        <StatCard title="Total Value" value="$2.4M" icon={Layers} />
        <StatCard title="Inventory Turns" value="12.4" icon={ArrowDownUp} />
      </div>

      <MockTable columns={columns} data={mockData} />
    </div>
  );
}
