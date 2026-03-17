import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardShell } from '../components/layout';
import { User } from '../types';
import { LoginPage } from '../pages/public';
import {
  DashboardPage,
  CompanyManagementPage,
  AdminManagementPage,
  SubscriptionManagementPage,
  AnalyticsPage,
  AuditLogsPage,
  SettingsPage,
} from '../pages/superadmin';
import {
  AdminDashboardPage,
  InventoryDashboard,
  ProductsPage,
  AddProductPage,
  MaterialDispatchPage,
  StockTransferPage,
  ProductReceivePage,
  OpeningStockPage,
  CategoriesPage,
  BrandsPage,
  UnitsPage,
  WarehousePage,
  StockAdjustmentPage,
  LowStockAlertsPage,
  CreateDispatchPage,
  CreateTransferPage,
  CreateReceivePage,
  PurchaseDashboard,
  VendorsPage,
  PurchaseInvoicesPage,
  PurchaseReturnsPage,
  VendorPaymentsPage,
  VendorCreditNotePage,
  VendorDebitNotePage,
  AddVendorPage,
  CreatePurchaseInvoicePage,
  CreatePurchaseReturnPage,
  CreateVendorPaymentPage,
  CreateVendorCreditNotePage,
  CreateVendorDebitNotePage,
  SalesDashboard,
  CustomersPage,
  QuotationsPage,
  SalesInvoicesPage,
  SalesReturnsPage,
  CustomerPaymentsPage,
  CustomerCreditNotePage,
  CustomerDebitNotePage,
  AddCustomerPage,
  CreateQuotationPage,
  CreateSalesInvoicePage,
  CreateSalesReturnPage,
  CreateCustomerPaymentPage,
  CreateCustomerCreditNotePage,
  CreateCustomerDebitNotePage,
  AccountsDashboard,
  ChartOfAccountsPage,
  AddAccountPage,
  PaymentsPage,
  CreatePaymentVoucherPage,
  ReceiptsPage,
  CreateReceiptVoucherPage,
  JournalVoucherPage,
  CreateJournalVoucherPage,
  SalesReportsPage,
  PurchaseReportsPage,
  InventoryReportsPage,
  FinancialReportsPage,
  CompanySettingsPage,
  UsersPage,
  RolesPermissionsPage,
  TaxSettingsPage,
  NotificationSettingsPage,
  ActivityLogPage,
  LeadsPage,
  OpportunitiesPage,
  FollowUpsPage,
  CRMDashboard,
  EmployeesPage,
  AttendancePage,
  LeavePage,
  PayrollPage,
  HRDashboard,
  ProjectDashboard,
  ProjectListPage,
  TasksPage,
  CollaborationPage,
  TicketsPage,
  SLAPage,
  HelpdeskDashboard,
  AssetTrackingPage,
  MaintenancePage,
  AssetDashboard,
  ShipmentListPage,
  DeliveryPage,
  LogisticsDashboard,
  InvoicesPage,
  RemindersPage,
  BillingDashboard,
} from '../pages/admin';

interface AppRoutesProps {
  user: User | null;
  onLogin: (role: 'super_admin' | 'admin', remember: boolean) => void;
  onLogout: () => void;
  onSwitchRole?: () => void;
}

export const AppRoutes = ({ user, onLogin, onLogout, onSwitchRole }: AppRoutesProps) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage user={user} onLogin={onLogin} />}
      />

      <Route
        path="/superadmin"
        element={
          user ? (
            <DashboardShell user={user} onLogout={onLogout} onSwitchRole={onSwitchRole} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        {/* Redirect base to dashboard */}
        <Route index element={<Navigate to="/superadmin/dashboard" replace />} />

        {/* Dashboard */}
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Super Admin only routes */}
        {user?.role === 'super_admin' && (
          <>
            <Route path="companies" element={<CompanyManagementPage />} />
            <Route path="companies/add" element={<CompanyManagementPage />} />
            <Route path="companies/:id" element={<CompanyManagementPage />} />
            <Route path="companies/:id/edit" element={<CompanyManagementPage />} />
            <Route path="users" element={<AdminManagementPage />} />
            <Route path="users/add" element={<AdminManagementPage />} />
            <Route path="users/:id" element={<AdminManagementPage />} />
            <Route path="users/:id/edit" element={<AdminManagementPage />} />
            <Route path="subscriptions" element={<SubscriptionManagementPage />} />
            <Route path="subscriptions/add" element={<SubscriptionManagementPage />} />
            <Route path="subscriptions/:id" element={<SubscriptionManagementPage />} />
            <Route path="subscriptions/:id/edit" element={<SubscriptionManagementPage />} />
            <Route path="subscriptions/assign" element={<SubscriptionManagementPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="audit" element={<AuditLogsPage />} />
          </>
        )}

        <Route path="settings" element={<SettingsPage />} />

        <Route path="*" element={<Navigate to="/superadmin/dashboard" replace />} />
      </Route>

      {/* Redirect root based on role */}
      <Route 
        path="/" 
        element={
          <Navigate 
            to={user ? (user.role === 'super_admin' ? "/superadmin/dashboard" : "/admin/dashboard") : "/login"} 
            replace 
          />
        } 
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          user?.role === 'admin' ? (
            <DashboardShell user={user} onLogout={onLogout} onSwitchRole={onSwitchRole} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        
        {/* Inventory */}
        <Route path="inventory">
          <Route path="dashboard" element={<InventoryDashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/add" element={<AddProductPage />} />
          <Route path="dispatch" element={<MaterialDispatchPage />} />
          <Route path="dispatch/create" element={<CreateDispatchPage />} />
          <Route path="transfer" element={<StockTransferPage />} />
          <Route path="transfer/create" element={<CreateTransferPage />} />
          <Route path="receive" element={<ProductReceivePage />} />
          <Route path="receive/create" element={<CreateReceivePage />} />
          <Route path="opening" element={<OpeningStockPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="brands" element={<BrandsPage />} />
          <Route path="units" element={<UnitsPage />} />
          <Route path="warehouse" element={<WarehousePage />} />
          <Route path="adjustment" element={<StockAdjustmentPage />} />
          <Route path="alerts" element={<LowStockAlertsPage />} />
        </Route>

        {/* Purchase */}
        <Route path="purchase">
          <Route path="dashboard" element={<PurchaseDashboard />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="vendors/add" element={<AddVendorPage />} />
          <Route path="invoices" element={<PurchaseInvoicesPage />} />
          <Route path="invoices/create" element={<CreatePurchaseInvoicePage />} />
          <Route path="returns" element={<PurchaseReturnsPage />} />
          <Route path="returns/new" element={<CreatePurchaseReturnPage />} />
          <Route path="payments" element={<VendorPaymentsPage />} />
          <Route path="payments/new" element={<CreateVendorPaymentPage />} />
          <Route path="credit-note" element={<VendorCreditNotePage />} />
          <Route path="credit-note/new" element={<CreateVendorCreditNotePage />} />
          <Route path="debit-note" element={<VendorDebitNotePage />} />
          <Route path="debit-note/new" element={<CreateVendorDebitNotePage />} />
        </Route>

        {/* Sales */}
        <Route path="sales">
          <Route path="dashboard" element={<SalesDashboard />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="customers/add" element={<AddCustomerPage />} />
          <Route path="quotations" element={<QuotationsPage />} />
          <Route path="quotations/create" element={<CreateQuotationPage />} />
          <Route path="invoices" element={<SalesInvoicesPage />} />
          <Route path="invoices/create" element={<CreateSalesInvoicePage />} />
          <Route path="returns" element={<SalesReturnsPage />} />
          <Route path="returns/new" element={<CreateSalesReturnPage />} />
          <Route path="payments" element={<CustomerPaymentsPage />} />
          <Route path="payments/new" element={<CreateCustomerPaymentPage />} />
          <Route path="credit-note" element={<CustomerCreditNotePage />} />
          <Route path="credit-note/new" element={<CreateCustomerCreditNotePage />} />
          <Route path="debit-note" element={<CustomerDebitNotePage />} />
          <Route path="debit-note/new" element={<CreateCustomerDebitNotePage />} />
        </Route>

        {/* Accounts */}
        <Route path="accounts">
          <Route path="dashboard" element={<AccountsDashboard />} />
          <Route path="chart-of-accounts" element={<ChartOfAccountsPage />} />
          <Route path="chart-of-accounts/add" element={<AddAccountPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="payments/create" element={<CreatePaymentVoucherPage />} />
          <Route path="receipts" element={<ReceiptsPage />} />
          <Route path="receipts/create" element={<CreateReceiptVoucherPage />} />
          <Route path="journal" element={<JournalVoucherPage />} />
          <Route path="journal/create" element={<CreateJournalVoucherPage />} />
        </Route>

        {/* Reports */}
        <Route path="reports">
          <Route path="sales" element={<SalesReportsPage />} />
          <Route path="purchase" element={<PurchaseReportsPage />} />
          <Route path="inventory" element={<InventoryReportsPage />} />
          <Route path="financial" element={<FinancialReportsPage />} />
        </Route>

        {/* Settings */}
        <Route path="settings">
          <Route path="company" element={<CompanySettingsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="roles" element={<RolesPermissionsPage />} />
          <Route path="tax" element={<TaxSettingsPage />} />
          <Route path="notifications" element={<NotificationSettingsPage />} />
          <Route path="activity" element={<ActivityLogPage />} />
        </Route>

        {/* CRM */}
        <Route path="crm">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CRMDashboard />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="opportunities" element={<OpportunitiesPage />} />
          <Route path="follow-ups" element={<FollowUpsPage />} />
        </Route>

        {/* HRM */}
        <Route path="hrm">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<HRDashboard />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="leave" element={<LeavePage />} />
          <Route path="payroll" element={<PayrollPage />} />
        </Route>

        {/* Projects */}
        <Route path="projects">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProjectDashboard />} />
          <Route path="list" element={<ProjectListPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="collaboration" element={<CollaborationPage />} />
        </Route>

        {/* Helpdesk */}
        <Route path="helpdesk">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<HelpdeskDashboard />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="sla" element={<SLAPage />} />
        </Route>

        {/* Assets */}
        <Route path="assets">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AssetDashboard />} />
          <Route path="tracking" element={<AssetTrackingPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
        </Route>

        {/* Logistics */}
        <Route path="logistics">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<LogisticsDashboard />} />
          <Route path="shipments" element={<ShipmentListPage />} />
          <Route path="delivery" element={<DeliveryPage />} />
        </Route>

        {/* Billing */}
        <Route path="billing">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<BillingDashboard />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="reminders" element={<RemindersPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;