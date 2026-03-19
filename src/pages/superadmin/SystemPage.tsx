import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Database, Settings, Mail, Bell, Shield, 
  Server, HardDrive, Cpu, Activity, Clock, CheckCircle,
  AlertTriangle, Download, Upload, RefreshCw, Code
} from "lucide-react";
import { Button, Card } from "../../components/ui";

const pageMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const SYSTEM_TABS = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "backup", label: "Backup", icon: Database },
  { id: "security", label: "Security", icon: Shield },
  { id: "email", label: "Email", icon: Mail },
  { id: "api", label: "API", icon: Code },
  { id: "notifications", label: "Notifications", icon: Bell }
];

const SYSTEM_HEALTH = [
  { label: "Database", status: "healthy", uptime: "99.9%", icon: Database, color: "var(--sa-success)" },
  { label: "API Server", status: "healthy", uptime: "99.8%", icon: Server, color: "var(--sa-success)" },
  { label: "Storage", status: "warning", uptime: "85% used", icon: HardDrive, color: "var(--sa-warning)" },
  { label: "CPU Usage", status: "healthy", uptime: "45%", icon: Cpu, color: "var(--sa-success)" }
];

const RECENT_BACKUPS = [
  { id: 1, name: "Auto Backup", date: "Today 02:00 AM", size: "2.4 GB", status: "completed" },
  { id: 2, name: "Auto Backup", date: "Yesterday 02:00 AM", size: "2.3 GB", status: "completed" },
  { id: 3, name: "Manual Backup", date: "Mar 16, 10:30 AM", size: "2.3 GB", status: "completed" }
];

export function SystemPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <motion.div {...pageMotion} className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--sa-text-primary)" }}>
            System Management
          </h1>
          <p className="text-slate-500 mt-1">Monitor and configure platform system settings</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border"
          style={{ borderColor: "var(--sa-border)", backgroundColor: "var(--sa-card)" }}>
          <Activity className="h-4 w-4" style={{ color: "var(--sa-success)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--sa-text-primary)" }}>
            All Systems Operational
          </span>
          <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--sa-success)" }} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2" style={{ borderColor: "var(--sa-border)" }}>
        {SYSTEM_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "font-medium"
                  : "hover:bg-slate-50"
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? "var(--sa-hover)" : "transparent",
                color: activeTab === tab.id ? "var(--sa-primary)" : "var(--sa-text-secondary)"
              }}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {SYSTEM_HEALTH.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `color-mix(in srgb, ${item.color}, transparent 90%)` }}>
                        <Icon className="h-5 w-5" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500">{item.label}</p>
                        <p className="text-sm font-bold" style={{ color: "var(--sa-text-primary)" }}>
                          {item.uptime}
                        </p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                      item.status === "healthy" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.status === "healthy" ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                      {item.status}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--sa-text-primary)" }}>
                System Information
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Platform Version", value: "v2.4.1" },
                  { label: "Database Version", value: "PostgreSQL 15.2" },
                  { label: "Node Version", value: "v20.11.0" },
                  { label: "Last Updated", value: "Mar 15, 2026" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b" style={{ borderColor: "var(--sa-border)" }}>
                    <span className="text-sm text-slate-500">{item.label}</span>
                    <span className="text-sm font-medium" style={{ color: "var(--sa-text-primary)" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--sa-text-primary)" }}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button variant="secondary" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Optimize Database
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  System Diagnostics
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Backup Tab */}
      {activeTab === "backup" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <Database className="h-8 w-8" style={{ color: "var(--sa-primary)" }} />
                <div>
                  <p className="text-xs text-slate-500">Total Backups</p>
                  <p className="text-2xl font-bold" style={{ color: "var(--sa-text-primary)" }}>24</p>
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8" style={{ color: "var(--sa-success)" }} />
                <div>
                  <p className="text-xs text-slate-500">Last Backup</p>
                  <p className="text-sm font-bold" style={{ color: "var(--sa-text-primary)" }}>Today 02:00 AM</p>
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8" style={{ color: "var(--sa-info)" }} />
                <div>
                  <p className="text-xs text-slate-500">Next Scheduled</p>
                  <p className="text-sm font-bold" style={{ color: "var(--sa-text-primary)" }}>Tomorrow 02:00 AM</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold" style={{ color: "var(--sa-text-primary)" }}>Recent Backups</h3>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Restore
                </Button>
                <Button variant="primary" size="sm">
                  <Database className="h-4 w-4 mr-2" />
                  Create Backup
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {RECENT_BACKUPS.map((backup, index) => (
                <motion.div
                  key={backup.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg border"
                  style={{ borderColor: "var(--sa-border)" }}
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle className="h-5 w-5" style={{ color: "var(--sa-success)" }} />
                    <div>
                      <h4 className="text-sm font-medium" style={{ color: "var(--sa-text-primary)" }}>
                        {backup.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">{backup.date} • {backup.size}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Other tabs content can be added similarly */}
      {activeTab !== "overview" && activeTab !== "backup" && (
        <Card className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: "var(--sa-hover)" }}>
            <Settings className="h-8 w-8" style={{ color: "var(--sa-primary)" }} />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: "var(--sa-text-primary)" }}>
            {SYSTEM_TABS.find(t => t.id === activeTab)?.label} Settings
          </h3>
          <p className="text-sm text-slate-500">
            Configure {SYSTEM_TABS.find(t => t.id === activeTab)?.label.toLowerCase()} settings for your platform
          </p>
        </Card>
      )}
    </motion.div>
  );
}

export default SystemPage;
