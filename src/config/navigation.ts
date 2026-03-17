import { NavigationItem } from '../types';

// Navigation configuration for the admin dashboard
export const superAdminNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Platform Overview',
    icon: 'dashboard',
    path: '/superadmin/dashboard',
    roles: ['super_admin']
  },
  {
    id: 'companies',
    label: 'Companies',
    icon: 'building',
    path: '/superadmin/companies',
    roles: ['super_admin']
  },
  {
    id: 'users',
    label: 'All Users',
    icon: 'users',
    path: '/superadmin/users',
    roles: ['super_admin']
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    icon: 'credit-card',
    path: '/superadmin/subscriptions',
    roles: ['super_admin']
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'chart-bar',
    path: '/superadmin/analytics',
    roles: ['super_admin']
  },
  {
    id: 'audit-logs',
    label: 'Audit Logs',
    icon: 'document-text',
    path: '/superadmin/audit-logs',
    roles: ['super_admin']
  },
  {
    id: 'settings',
    label: 'System Settings',
    icon: 'cog',
    path: '/superadmin/settings',
    roles: ['super_admin']
  }
];

export const adminNavigation: NavigationItem[] = [
  {
    id: 'inventory',
    label: 'Inventory',
    icon: 'archive',
    roles: ['admin'],
    children: [
      { id: 'inv-dashboard', label: 'Dashboard', path: '/admin/inventory/dashboard', roles: ['admin'], icon: 'dashboard' },
      { id: 'inv-products', label: 'Products', path: '/admin/inventory/products', roles: ['admin'], icon: 'cube' },
      { id: 'inv-dispatch', label: 'Material Dispatch', path: '/admin/inventory/dispatch', roles: ['admin'], icon: 'truck' },
      { id: 'inv-transfer', label: 'Product Transfer', path: '/admin/inventory/transfer', roles: ['admin'], icon: 'switch-horizontal' },
      { id: 'inv-receive', label: 'Product Receive', path: '/admin/inventory/receive', roles: ['admin'], icon: 'clipboard-check' },
      { id: 'inv-reports', label: 'Inventory Reports', path: '/admin/reports/inventory', roles: ['admin'], icon: 'document-report' },
    ]
  },
  {
    id: 'purchase',
    label: 'Purchase',
    icon: 'shopping-cart',
    roles: ['admin'],
    children: [
      { id: 'pur-dashboard', label: 'Dashboard', path: '/admin/purchase/dashboard', roles: ['admin'], icon: 'dashboard' },
      { id: 'pur-vendors', label: 'Vendor', path: '/admin/purchase/vendors', roles: ['admin'], icon: 'users' },
      { id: 'pur-invoices', label: 'Purchase Invoice', path: '/admin/purchase/invoices', roles: ['admin'], icon: 'document-text' },
      { id: 'pur-returns', label: 'Purchase Return', path: '/admin/purchase/returns', roles: ['admin'], icon: 'reply' },
      { id: 'pur-payments', label: 'Vendor Payment', path: '/admin/purchase/payments', roles: ['admin'], icon: 'credit-card' },
      { id: 'pur-credit-note', label: 'Vendor Credit Note', path: '/admin/purchase/credit-note', roles: ['admin'], icon: 'file-text' },
      { id: 'pur-debit-note', label: 'Vendor Debit Note', path: '/admin/purchase/debit-note', roles: ['admin'], icon: 'file-text' },
      { id: 'pur-reports', label: 'Purchase Reports', path: '/admin/reports/purchase', roles: ['admin'], icon: 'chart-bar' },
    ]
  },
  {
    id: 'sales',
    label: 'Sales',
    icon: 'presentation-chart-line',
    roles: ['admin'],
    children: [
      { id: 'sal-dashboard', label: 'Dashboard', path: '/admin/sales/dashboard', roles: ['admin'], icon: 'dashboard' },
      { id: 'sal-customers', label: 'Customer', path: '/admin/sales/customers', roles: ['admin'], icon: 'user-group' },
      { id: 'sal-quotations', label: 'Quotation', path: '/admin/sales/quotations', roles: ['admin'], icon: 'document-duplicate' },
      { id: 'sal-invoices', label: 'Sales Invoice', path: '/admin/sales/invoices', roles: ['admin'], icon: 'receipt-tax' },
      { id: 'sal-returns', label: 'Sales Return', path: '/admin/sales/returns', roles: ['admin'], icon: 'refresh' },
      { id: 'sal-payments', label: 'Customer Payment', path: '/admin/sales/payments', roles: ['admin'], icon: 'cash' },
      { id: 'sal-credit-note', label: 'Customer Credit Note', path: '/admin/sales/credit-note', roles: ['admin'], icon: 'file-text' },
      { id: 'sal-debit-note', label: 'Customer Debit Note', path: '/admin/sales/debit-note', roles: ['admin'], icon: 'file-text' },
      { id: 'sal-reports', label: 'Sales Reports', path: '/admin/reports/sales', roles: ['admin'], icon: 'chart-pie' },
    ]
  },
  {
    id: 'accounts',
    label: 'Accounts',
    icon: 'book-open',
    roles: ['admin'],
    children: [
      { id: 'acc-dashboard', label: 'Dashboard', path: '/admin/accounts/dashboard', roles: ['admin'], icon: 'dashboard' },
      { id: 'acc-chart', label: 'Chart of Accounts', path: '/admin/accounts/chart-of-accounts', roles: ['admin'], icon: 'list-bullet' },
      { id: 'acc-payments', label: 'Payment Voucher', path: '/admin/accounts/payments', roles: ['admin'], icon: 'credit-card' },
      { id: 'acc-receipts', label: 'Receipt Voucher', path: '/admin/accounts/receipts', roles: ['admin'], icon: 'receipt-refund' },
      { id: 'acc-journal', label: 'Journal Voucher', path: '/admin/accounts/journal', roles: ['admin'], icon: 'pencil-alt' },
      { id: 'acc-reports', label: 'Financial Reports', path: '/admin/reports/financial', roles: ['admin'], icon: 'chart-bar' },
    ]
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'user',
    roles: ['admin'],
    children: [
      { id: 'adm-company', label: 'Company', path: '/admin/settings/company', roles: ['admin'], icon: 'office-building' },
      { id: 'adm-users', label: 'Users', path: '/admin/settings/users', roles: ['admin'], icon: 'users' },
      { id: 'adm-access', label: 'User Access', path: '/admin/settings/roles', roles: ['admin'], icon: 'shield-check' },
      { id: 'adm-activity', label: 'Activity Log', path: '/admin/settings/activity', roles: ['admin'], icon: 'clipboard-list' },
    ]
  }
];

// Helper function to filter navigation items based on user role
export function getNavigationForRole(role: 'super_admin' | 'admin'): NavigationItem[] {
  if (role === 'super_admin') {
    return superAdminNavigation;
  }
  return adminNavigation;
}