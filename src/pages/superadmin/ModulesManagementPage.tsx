import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Puzzle, ToggleLeft, ToggleRight, Archive, ShoppingCart, 
  TrendingUp, BookOpen, Users, Briefcase, Headphones, 
  Truck, Factory, Receipt, Search,
  ChevronDown, ChevronUp, Eye, Settings
} from "lucide-react";

const pageMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const MODULE_ICONS: Record<string, any> = {
  "archive": Archive,
  "shopping-cart": ShoppingCart,
  "presentation-chart-line": TrendingUp,
  "book-open": BookOpen,
  "user-group": Users,
  "clipboard-list": Briefcase,
  "support": Headphones,
  "truck": Truck,
  "factory": Factory,
  "receipt-tax": Receipt
};

const MODULES = [
  { id: 1, name: "Inventory Management", description: "Products, stock, warehouses, transfers", enabled: true, companies: 142, icon: "archive", category: "Operations", usage: 95 },
  { id: 2, name: "Purchase Management", description: "Vendors, POs, invoices, payments", enabled: true, companies: 138, icon: "shopping-cart", category: "Operations", usage: 92 },
  { id: 3, name: "Sales Management", description: "Customers, quotations, invoices", enabled: true, companies: 140, icon: "presentation-chart-line", category: "Operations", usage: 94 },
  { id: 4, name: "Accounts & Finance", description: "Chart of accounts, vouchers, reports", enabled: true, companies: 135, icon: "book-open", category: "Finance", usage: 90 },
  { id: 5, name: "CRM", description: "Leads, opportunities, follow-ups", enabled: true, companies: 98, icon: "user-group", category: "Sales", usage: 69 },
  { id: 6, name: "HRM", description: "Employees, attendance, payroll", enabled: true, companies: 112, icon: "user-group", category: "HR", usage: 79 },
  { id: 7, name: "Projects", description: "Project management, tasks, timesheets", enabled: true, companies: 87, icon: "clipboard-list", category: "Operations", usage: 61 },
  { id: 8, name: "Helpdesk", description: "Ticket management, SLA monitoring", enabled: true, companies: 76, icon: "support", category: "Support", usage: 54 },
  { id: 9, name: "Assets", description: "Asset tracking, depreciation, maintenance", enabled: true, companies: 65, icon: "archive", category: "Finance", usage: 46 },
  { id: 10, name: "Logistics", description: "Shipment tracking, delivery management", enabled: true, companies: 54, icon: "truck", category: "Operations", usage: 38 },
  { id: 11, name: "Production", description: "BOM, work orders, quality control", enabled: true, companies: 48, icon: "factory", category: "Manufacturing", usage: 34 },
  { id: 12, name: "Billing", description: "Invoice management, payment reminders", enabled: true, companies: 125, icon: "receipt-tax", category: "Finance", usage: 88 }
];

export function ModulesManagementPage() {
  const [modules, setModules] = useState(MODULES);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "companies" | "usage">("companies");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const toggleModule = (id: number) => {
    setModules(modules.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const handleSort = (field: "name" | "companies" | "usage") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const filteredModules = modules
    .filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory === "all" || m.category === filterCategory)
    )
    .sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "name") return multiplier * a.name.localeCompare(b.name);
      if (sortBy === "companies") return multiplier * (a.companies - b.companies);
      if (sortBy === "usage") return multiplier * (a.usage - b.usage);
      return 0;
    });

  const categories = ["all", ...Array.from(new Set(modules.map(m => m.category)))];

  return (
    <motion.div {...pageMotion} className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--sa-text-primary)" }}>
            ERP Modules
          </h1>
          <p className="text-slate-500 mt-1">Control which ERP modules are available to companies</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border shadow-sm"
          style={{ borderColor: "var(--sa-border)", backgroundColor: "var(--sa-card)" }}>
          <Puzzle className="h-4 w-4" style={{ color: "var(--sa-primary)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--sa-text-primary)" }}>
            {modules.filter(m => m.enabled).length} / {modules.length} Active
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Modules", value: modules.length, color: "var(--sa-primary)" },
          { label: "Active Modules", value: modules.filter(m => m.enabled).length, color: "var(--sa-success)" },
          { label: "Total Adoptions", value: modules.reduce((acc, m) => acc + m.companies, 0), color: "var(--sa-info)" },
          { label: "Avg Usage", value: `${Math.round(modules.reduce((acc, m) => acc + m.usage, 0) / modules.length)}%`, color: "var(--sa-warning)" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 rounded-xl border"
            style={{ backgroundColor: "var(--sa-card)", borderColor: "var(--sa-border)" }}
          >
            <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--sa-text-secondary)" }} />
          <input
            type="text"
            placeholder="Search modules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border text-sm transition focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--sa-card)",
              borderColor: "var(--sa-border)",
              color: "var(--sa-text-primary)"
            }}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="h-10 px-4 rounded-xl border text-sm transition focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--sa-card)",
              borderColor: "var(--sa-border)",
              color: "var(--sa-text-primary)"
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden shadow-sm" style={{ backgroundColor: "var(--sa-card)", borderColor: "var(--sa-border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--sa-border)", backgroundColor: "var(--sa-hover)" }}>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:text-[var(--sa-primary)] transition"
                    style={{ color: "var(--sa-text-secondary)" }}
                  >
                    Module
                    {sortBy === "name" && (
                      sortOrder === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--sa-text-secondary)" }}>
                  Category
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort("companies")}
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:text-[var(--sa-primary)] transition"
                    style={{ color: "var(--sa-text-secondary)" }}
                  >
                    Companies
                    {sortBy === "companies" && (
                      sortOrder === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => handleSort("usage")}
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:text-[var(--sa-primary)] transition"
                    style={{ color: "var(--sa-text-secondary)" }}
                  >
                    Adoption
                    {sortBy === "usage" && (
                      sortOrder === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                    )}
                  </button>
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--sa-text-secondary)" }}>
                  Status
                </th>
                <th className="p-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--sa-text-secondary)" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredModules.map((module, index) => {
                const IconComponent = MODULE_ICONS[module.icon] || Puzzle;
                return (
                  <motion.tr
                    key={module.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b hover:bg-[var(--sa-hover)] transition group"
                    style={{ borderColor: "var(--sa-border)" }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `color-mix(in srgb, var(--sa-primary), transparent 90%)` }}>
                          <IconComponent className="h-5 w-5" style={{ color: "var(--sa-primary)" }} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm" style={{ color: "var(--sa-text-primary)" }}>
                            {module.name}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: "var(--sa-text-secondary)" }}>
                            {module.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {module.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: "var(--sa-text-primary)" }}>
                          {module.companies}
                        </span>
                        <span className="text-xs" style={{ color: "var(--sa-text-secondary)" }}>
                          companies
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--sa-hover)", maxWidth: "100px" }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ 
                              backgroundColor: module.usage >= 70 ? "var(--sa-success)" : 
                                             module.usage >= 40 ? "var(--sa-warning)" : 
                                             "var(--sa-error)"
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${module.usage}%` }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                          />
                        </div>
                        <span className="text-xs font-medium" style={{ color: "var(--sa-text-secondary)" }}>
                          {module.usage}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="transition-transform hover:scale-110"
                      >
                        {module.enabled ? (
                          <div className="flex items-center gap-2">
                            <ToggleRight className="h-7 w-7" style={{ color: "var(--sa-success)" }} />
                            <span className="text-xs font-medium" style={{ color: "var(--sa-success)" }}>Enabled</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <ToggleLeft className="h-7 w-7 text-slate-300" />
                            <span className="text-xs font-medium text-slate-400">Disabled</span>
                          </div>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-2 rounded-lg hover:bg-slate-100 transition"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" style={{ color: "var(--sa-text-secondary)" }} />
                        </button>
                        <button
                          className="p-2 rounded-lg hover:bg-slate-100 transition"
                          title="Settings"
                        >
                          <Settings className="h-4 w-4" style={{ color: "var(--sa-text-secondary)" }} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-sm" style={{ color: "var(--sa-text-secondary)" }}>
        <div>
          Showing {filteredModules.length} of {modules.length} modules
        </div>
        <div>
          Total companies using modules: {modules.reduce((acc, m) => acc + m.companies, 0)}
        </div>
      </div>
    </motion.div>
  );
}

export default ModulesManagementPage;
