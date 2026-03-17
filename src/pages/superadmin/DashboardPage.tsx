import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, Users, CreditCard, 
  ArrowUpRight, Server, Activity, Globe, Award,
  DollarSign
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


// Animation preset
const pageMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const STATS = [
  { label: "Total Companies", value: "142", delta: "+8 this month", icon: Building2 },
  { label: "Total Users", value: "3,841", delta: "+234 this week", icon: Users },
  { label: "Active Subscriptions", value: "118", delta: "83% conversion", icon: CreditCard },
  { label: "Platform Revenue", value: "$28.4K", delta: "+12% MoM", icon: DollarSign },
];

const GROWTH_DATA = [
  { month: "Oct", users: 2100, companies: 98 },
  { month: "Nov", users: 2650, companies: 109 },
  { month: "Dec", users: 2900, companies: 115 },
  { month: "Jan", users: 3200, companies: 124 },
  { month: "Feb", users: 3550, companies: 133 },
  { month: "Mar", users: 3841, companies: 142 },
];

const RECENT_COMPANIES = [
  { name: "BuildSafe Corp", plan: "Enterprise", users: 248, status: "Active" },
  { name: "SteelWorks Ltd", plan: "Basic", users: 34, status: "Active" },
  { name: "GreenField Mining", plan: "Trial", users: 5, status: "Trial" },
  { name: "AeroCraft Inc", plan: "Enterprise", users: 519, status: "Active" },
  { name: "Harbor Logistics", plan: "Basic", users: 87, status: "Suspended" },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div {...pageMotion} className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 px-2 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider"
              style={{ backgroundColor: "var(--sa-primary)", color: "white" }}>
              <Award className="h-3 w-3" /> Super Admin
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--sa-text-primary)" }}>Platform Overview</h1>
          <p className="text-slate-500 mt-1">Real-time intelligence and monitoring across the enterprise ecosystem</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border shadow-sm"
          style={{ borderColor: "var(--sa-border)", backgroundColor: "var(--sa-card)" }}>
          <Globe className="h-4 w-4" style={{ color: "var(--sa-primary)" }} />
          <span className="text-sm font-bold" style={{ color: "var(--sa-text-primary)" }}>Network Status: Live</span>
          <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--sa-success)" }} />
        </div>
      </div>

      {/* Premium Info Banner Section */}
      <div className="py-3 px-6 md:py-4 md:px-8 rounded-2xl md:rounded-[1.5rem] shadow-lg border relative overflow-hidden text-white"
        style={{ backgroundColor: "var(--sa-primary)", borderColor: "var(--sa-border)" }}>
        <div className="absolute top-0 right-0 p-8 opacity-10 scale-125 rotate-12 pointer-events-none">
          <Activity size={80} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-inner">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-white/60 font-medium text-[9px] md:text-[10px] uppercase tracking-[0.2em] leading-none mb-1">Global Operations</p>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">Vivify Enterprise Platform</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="text-white/90 font-bold text-sm">{STATS[0].value} Active Organizations Monitored</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          const colors = [
            "var(--sa-primary)",
            "var(--sa-info)",
            "var(--sa-success)",
            "var(--sa-warning)"
          ];
          const color = colors[index];
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-5 rounded-xl border hover:shadow-lg transition-all group"
                style={{ backgroundColor: "var(--sa-card)", borderColor: "var(--sa-border)" }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl transition group-hover:scale-110"
                    style={{ backgroundColor: `color-mix(in srgb, ${color}, transparent 90%)` }}>
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                    style={{ backgroundColor: "var(--sa-hover)", color: "var(--sa-success)" }}>
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.delta.split(' ')[0]}
                  </div>
                </div>
                <div className="text-3xl font-bold" style={{ color: "var(--sa-text-primary)" }}>{stat.value}</div>
                <div className="text-sm mt-1" style={{ color: "var(--sa-text-secondary)" }}>{stat.label}</div>
                <div className="text-xs mt-2" style={{ color: "var(--sa-text-secondary)" }}>{stat.delta}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--sa-card)", borderColor: "var(--sa-border)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: "var(--sa-text-primary)" }}>User & Company Growth</h3>
              <p className="text-xs mt-1" style={{ color: "var(--sa-text-secondary)" }}>Last 6 months</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--sa-primary)" }} />
                <span className="text-xs" style={{ color: "var(--sa-text-secondary)" }}>Users</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--sa-info)" }} />
                <span className="text-xs" style={{ color: "var(--sa-text-secondary)" }}>Companies</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={GROWTH_DATA}>
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--sa-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--sa-primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="companyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--sa-info)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--sa-info)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sa-border)" />
              <XAxis dataKey="month" tick={{ fill: "var(--sa-text-secondary)", fontSize: 11 }} />
              <YAxis tick={{ fill: "var(--sa-text-secondary)", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--sa-card)",
                  borderColor: "var(--sa-border)",
                  borderRadius: 8,
                  color: "var(--sa-text-primary)"
                }}
              />
              <Area type="monotone" dataKey="users" stroke="var(--sa-primary)" strokeWidth={2} fill="url(#userGradient)" />
              <Area type="monotone" dataKey="companies" stroke="var(--sa-info)" strokeWidth={2} fill="url(#companyGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Companies */}
        <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--sa-card)", borderColor: "var(--sa-border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4" style={{ color: "var(--sa-primary)" }} />
            <h3 className="text-sm font-semibold" style={{ color: "var(--sa-text-primary)" }}>Recent Companies</h3>
          </div>
          <div className="space-y-3">
            {RECENT_COMPANIES.map((company, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/superadmin/companies`)}
                className="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                style={{ borderColor: "var(--sa-border)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `color-mix(in srgb, var(--sa-primary), transparent 90%)` }}>
                    <Building2 className="h-4 w-4" style={{ color: "var(--sa-primary)" }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--sa-text-primary)" }}>{company.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--sa-text-secondary)" }}>
                      {company.plan} · {company.users} users
                    </div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full text-xs font-medium"
                   style={{ 
                    backgroundColor: company.status === "Active" ? "rgba(40, 167, 69, 0.1)" : 
                                   company.status === "Trial" ? "rgba(255, 159, 67, 0.1)" : 
                                   "rgba(220, 53, 69, 0.1)",
                    color: company.status === "Active" ? "var(--sa-success)" : 
                           company.status === "Trial" ? "var(--sa-warning)" : 
                           "var(--sa-error)"
                  }}>
                  {company.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Storage */}
      <div className="p-5 rounded-xl border" style={{ backgroundColor: "var(--sa-card)", borderColor: "var(--sa-border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Server className="h-4 w-4" style={{ color: "var(--sa-primary)" }} />
          <h3 className="text-sm font-semibold" style={{ color: "var(--sa-text-primary)" }}>Platform Storage</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Provisioned", value: "14.2 TB", used: 100, color: "var(--sa-primary)" },
            { label: "Currently Used", value: "8.7 TB", used: 61, color: "var(--sa-warning)" },
            { label: "Available", value: "5.5 TB", used: 39, color: "var(--sa-success)" },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: "var(--sa-text-secondary)" }}>{item.label}</span>
                <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}</span>
              </div>
              <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--sa-hover)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.used}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardPage;
