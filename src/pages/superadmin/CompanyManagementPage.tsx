import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Building2, Search, Edit, CheckCircle, XCircle, Users, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../vivify/ui";

const planDetails = {
  Trial: { users: 5, storage: 5, price: 0 },
  Basic: { users: 50, storage: 20, price: 49 },
  Enterprise: { users: "∞", storage: 100, price: 199 }
};

function EditCompanyModal({ company, onClose, onSave }: { company: any; onClose: () => void; onSave: (id: number, data: any) => void }) {
  const [status, setStatus] = useState(company.status);
  const [plan, setPlan] = useState(company.plan);
  const [userLimit, setUserLimit] = useState(company.plan === "Enterprise" ? "∞" : "50");
  const [storageLimit, setStorageLimit] = useState(company.plan === "Enterprise" ? "100" : "20");

  const handlePlanChange = (newPlan: string) => {
    setPlan(newPlan);
    setUserLimit(planDetails[newPlan as keyof typeof planDetails].users.toString());
    setStorageLimit(planDetails[newPlan as keyof typeof planDetails].storage.toString());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-xl border shadow-2xl"
        style={{ backgroundColor: "var(--sa-card)", borderColor: "var(--sa-border)" }}
      >
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--sa-border)" }}>
          <h2 className="text-lg font-semibold" style={{ color: "var(--sa-text-primary)" }}>Edit {company.name}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--sa-hover)]">
            <X className="h-5 w-5" style={{ color: "var(--sa-text-secondary)" }} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs mb-2" style={{ color: "var(--sa-text-primary)" }}>Company Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-10 rounded-lg border px-3"
              style={{ backgroundColor: "var(--sa-card)", borderColor: "var(--sa-border)", color: "var(--sa-text-primary)" }}
            >
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Trial">Trial</option>
            </select>
          </div>

          <div>
            <label className="block text-xs mb-2" style={{ color: "var(--sa-text-primary)" }}>Subscription Plan</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(planDetails).map(([p, details]) => (
                <button
                  key={p}
                  onClick={() => handlePlanChange(p)}
                  className={`p-3 rounded-lg border text-left transition ${
                    plan === p ? 'border-[var(--sa-primary)]' : ''
                  }`}
                  style={{ 
                    borderColor: plan === p ? 'var(--sa-primary)' : 'var(--sa-border)',
                    backgroundColor: plan === p ? 'color-mix(in srgb, var(--sa-primary), transparent 90%)' : 'var(--sa-card)'
                  }}
                >
                  <div className="text-sm font-medium" style={{ color: plan === p ? 'var(--sa-primary)' : 'var(--sa-text-primary)' }}>
                    {p}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--sa-text-secondary)' }}>
                    ${details.price}/mo
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-2" style={{ color: "var(--sa-text-primary)" }}>User Limit</label>
              <Input value={userLimit} readOnly />
            </div>
            <div>
              <label className="block text-xs mb-2" style={{ color: "var(--sa-text-primary)" }}>Storage Limit (GB)</label>
              <Input value={storageLimit} readOnly />
            </div>
          </div>

          <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 159, 67, 0.1)' }}>
            <p className="text-xs" style={{ color: 'var(--sa-warning)' }}>
              Note: Changing plan will affect billing immediately. Prorated charges will apply.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t" style={{ borderColor: "var(--sa-border)" }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium border"
            style={{ borderColor: "var(--sa-border)" }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(company.id, { status, plan });
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ backgroundColor: "var(--sa-primary)" }}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const pageMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const COMPANIES = [
  { id: 1, name: "BuildSafe Corp", admin: "David Kim", plan: "Enterprise", users: 248, storage: "42GB / 100GB", status: "Active", created: "Jan 2025" },
  { id: 2, name: "SteelWorks Ltd", admin: "Sarah Moore", plan: "Basic", users: 34, storage: "8GB / 20GB", status: "Active", created: "Mar 2025" },
  { id: 3, name: "GreenField Mining", admin: "Tom Walsh", plan: "Trial", users: 5, storage: "2GB / 5GB", status: "Trial", created: "Mar 2026" },
  { id: 4, name: "AeroCraft Inc", admin: "Lisa Park", plan: "Enterprise", users: 519, storage: "78GB / 100GB", status: "Active", created: "Aug 2024" },
  { id: 5, name: "Harbor Logistics", admin: "Ben Osei", plan: "Basic", users: 87, storage: "19GB / 20GB", status: "Suspended", created: "Nov 2024" },
];

export function CompanyManagementPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [editingCompany, setEditingCompany] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredCompanies = COMPANIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.admin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div {...pageMotion} className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--sa-text-primary)" }}>Organization Registry</h1>
          <p className="text-slate-500 mt-1">Manage and monitor all business entities across the platform</p>
        </div>
        <button
          className="flex items-center gap-2 px-6 h-10 rounded-xl text-xs font-bold text-white transition-all shadow-lg hover:shadow-indigo-500/10 active:scale-95"
          style={{ backgroundColor: "var(--sa-primary)" }}
        >
          <Plus className="h-4 w-4" />
          Add Company
        </button>
      </div>

      {/* Premium Info Banner Section */}
      <div className="py-3 px-6 md:py-4 md:px-8 rounded-2xl md:rounded-[1.5rem] shadow-lg border relative overflow-hidden text-white"
        style={{ backgroundColor: "var(--sa-primary)", borderColor: "var(--sa-border)" }}>
        <div className="absolute top-0 right-0 p-8 opacity-10 scale-125 rotate-12 pointer-events-none">
          <Building2 size={80} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-inner">
              <Building2 size={22} />
            </div>
            <div>
              <p className="text-white/60 font-medium text-[9px] md:text-[10px] uppercase tracking-[0.2em] leading-none mb-1">Infrastructure Hub</p>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">Tenant Matrix</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="text-white/90 font-bold text-sm">{COMPANIES.length} Subscribed Organizations Registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--sa-text-secondary)" }} />
        <input
          type="text"
          placeholder="Search companies or admins..."
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

      {/* Companies Table */}
      <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: "var(--sa-card)", borderColor: "var(--sa-border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--sa-border)" }}>
                <th className="p-4 text-left text-xs font-medium" style={{ color: "var(--sa-text-secondary)" }}>Company</th>
                <th className="p-4 text-left text-xs font-medium" style={{ color: "var(--sa-text-secondary)" }}>Admin</th>
                <th className="p-4 text-left text-xs font-medium" style={{ color: "var(--sa-text-secondary)" }}>Plan</th>
                <th className="p-4 text-left text-xs font-medium" style={{ color: "var(--sa-text-secondary)" }}>Users</th>
                <th className="p-4 text-left text-xs font-medium" style={{ color: "var(--sa-text-secondary)" }}>Storage</th>
                <th className="p-4 text-left text-xs font-medium" style={{ color: "var(--sa-text-secondary)" }}>Status</th>
                <th className="p-4 text-left text-xs font-medium" style={{ color: "var(--sa-text-secondary)" }}>Created</th>
                <th className="p-4 text-right text-xs font-medium" style={{ color: "var(--sa-text-secondary)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company, index) => (
                <motion.tr
                  key={company.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-[var(--sa-hover)] transition"
                  style={{ borderColor: "var(--sa-border)" }}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `color-mix(in srgb, var(--sa-primary), transparent 90%)` }}>
                        <Building2 className="h-4 w-4" style={{ color: "var(--sa-primary)" }} />
                      </div>
                      <span className="font-medium" style={{ color: "var(--sa-text-primary)" }}>{company.name}</span>
                    </div>
                  </td>
                  <td className="p-4" style={{ color: "var(--sa-text-secondary)" }}>{company.admin}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: company.plan === "Enterprise" ? "rgba(44, 110, 213, 0.1)" :
                                       company.plan === "Basic" ? "rgba(44, 110, 213, 0.1)" :
                                       "rgba(255, 159, 67, 0.1)",
                        color: company.plan === "Enterprise" ? "var(--sa-primary)" :
                               company.plan === "Basic" ? "var(--sa-info)" :
                               "var(--sa-warning)"
                      }}>
                      {company.plan}
                    </span>
                  </td>
                  <td className="p-4" style={{ color: "var(--sa-text-secondary)" }}>{company.users}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--sa-hover)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ 
                            width: `${(parseInt(company.storage.split('/')[0]) / parseInt(company.storage.split('/')[1].replace('GB', '').trim())) * 100}%`,
                            backgroundColor: "var(--sa-primary)"
                          }}
                        />
                      </div>
                      <span className="text-xs" style={{ color: "var(--sa-text-secondary)" }}>{company.storage}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {company.status === "Active" ? (
                        <CheckCircle className="h-3 w-3" style={{ color: "var(--sa-success)" }} />
                      ) : company.status === "Trial" ? (
                        <CheckCircle className="h-3 w-3" style={{ color: "var(--sa-warning)" }} />
                      ) : (
                        <XCircle className="h-3 w-3" style={{ color: "var(--sa-error)" }} />
                      )}
                      <span style={{ 
                        color: company.status === "Active" ? "var(--sa-success)" :
                               company.status === "Trial" ? "var(--sa-warning)" :
                               "var(--sa-error)"
                      }}>{company.status}</span>
                    </div>
                  </td>
                  <td className="p-4" style={{ color: "var(--sa-text-secondary)" }}>{company.created}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/superadmin/users`)}
                        className="p-1.5 rounded-lg hover:bg-[var(--sa-hover)] transition"
                        title="View users"
                      >
                        <Users className="h-4 w-4" style={{ color: "var(--sa-primary)" }} />
                      </button>
                      <button 
                        onClick={() => {
                          setEditingCompany(company);
                          setShowEditModal(true);
                        }}
                        className="p-1.5 rounded-lg hover:bg-[var(--sa-hover)] transition"
                        title="Edit company"
                      >
                        <Edit className="h-4 w-4" style={{ color: "var(--sa-primary)" }} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showEditModal && editingCompany && (
        <EditCompanyModal
          company={editingCompany}
          onClose={() => {
            setShowEditModal(false);
            setEditingCompany(null);
          }}
          onSave={(id, data) => {
            // Here you would update your data
            console.log("Updating company", id, data);
            setShowEditModal(false);
            setEditingCompany(null);
          }}
        />
      )}
    </motion.div>
  );
}

export default CompanyManagementPage;
