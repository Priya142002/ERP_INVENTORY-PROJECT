// ERP Modules Configuration
// This file defines the available modules for the ERP system
// Each module has a name, path, and icon from lucide-react

import logoIcon from '../assets/logoicon.png';

export const erpModules = [
  {
    section: 'Management',
    name: 'Admin',
    path: '/admin',
    icon: 'Users',
    description: 'User management and system administration',
    subMenu: [
      { name: 'Users', path: '/admin/users' },
      { name: 'Roles', path: '/admin/roles' },
      { name: 'Permissions', path: '/admin/permissions' }
    ]
  },
  {
    section: 'Management',
    name: 'Accounts',
    path: '/accounts',
    icon: 'Briefcase',
    description: 'Financial management and accounting',
    subMenu: [
      { name: 'Ledger', path: '/accounts/ledger' },
      { name: 'Payments', path: '/accounts/payments' },
      { name: 'Expenses', path: '/accounts/expenses' }
    ]
  },
  {
    section: 'Management',
    name: 'Inventory',
    path: '/inventory',
    icon: 'PackageSearch',
    description: 'Stock and warehouse management',
    subMenu: [
      { name: 'Stock Overview', path: '/inventory/overview' },
      { name: 'Stock Adjustments', path: '/inventory/adjustments' },
      { name: 'Low Stock', path: '/inventory/low-stock' }
    ]
  },
  {
    section: 'Finance',
    name: 'Purchase',
    path: '/purchase',
    icon: 'ShoppingCart',
    description: 'Procurement and vendor management',
    subMenu: [
      { name: 'Orders', path: '/purchase/orders' },
      { name: 'Vendors', path: '/purchase/vendors' },
      { name: 'Receipts', path: '/purchase/receipts' }
    ]
  },
  {
    section: 'Finance',
    name: 'Sales',
    path: '/sales',
    icon: 'CreditCard',
    description: 'Sales orders and customer management',
    subMenu: [
      { name: 'Dashboard', path: '/sales/dashboard' },
      { name: 'Invoices', path: '/sales/invoices' },
      { name: 'Customers', path: '/sales/customers' }
    ]
  }
];

// Branding configuration
export const branding = {
  name: 'Vivify ERP',
  logo: logoIcon,
  primaryColor: '#1d4ed8'
};

// This makes the system plug-and-play by allowing easy module configuration
// To add/remove modules, just edit this array