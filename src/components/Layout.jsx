import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  PackageSearch, 
  ShoppingCart, 
  CreditCard,
  Menu,
  Bell,
  Search,
  User
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Admin', path: '/admin', icon: Users },
  { name: 'Accounts', path: '/accounts', icon: Briefcase },
  { name: 'Inventory', path: '/inventory', icon: PackageSearch },
  { name: 'Purchase', path: '/purchase', icon: ShoppingCart },
  { name: 'Sales', path: '/sales', icon: CreditCard },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layouts">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">
              EP
            </div>
            ERP Pro
          </div>
        </div>
        <nav className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <button className="icon-btn mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={24} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--border-color)', padding: '0.5rem 1rem', borderRadius: '8px', gap: '8px' }}>
              <Search size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-main)' }}
              />
            </div>
          </div>
          <div className="header-right">
            <button className="icon-btn relative">
              <Bell size={20} />
              <span style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }}></span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <User size={20} />
              </div>
              <div className="hidden md:block">
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Admin User</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Superadmin</div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
