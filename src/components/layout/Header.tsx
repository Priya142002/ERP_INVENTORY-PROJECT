import React, { useState, useEffect, useRef } from 'react';
import { User } from '../../types';
import Icon from '../ui/Icon';
import { useSuperAdminTheme } from '../../app/superadmin-theme';
import { cn } from '../../utils/cn';

interface HeaderProps {
  user: User;
  onMenuClick: () => void;
  onLogout: () => void;
  onSwitchRole?: () => void;
  title?: string;
}
export const Header: React.FC<HeaderProps> = ({ user, onMenuClick, onLogout, onSwitchRole, title: _title = 'Dashboard' }) => {
  const { mode, toggleTheme } = useSuperAdminTheme();
  const isDarkMode = mode === 'dark';
  
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement global search functionality
    console.log('Search query:', searchQuery);
  };


  return (
    <header 
      className="relative z-40 transition-colors duration-200 bg-white shadow-sm border-b border-slate-200 backdrop-blur-sm bg-white/95"
    >
      <div className="flex items-center justify-between h-20 px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-3 rounded-xl text-[#002147] hover:text-[#001a33] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#002147] transition-all"
          >
            <Icon name="menu" size="md" />
          </button>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon name="search" className={cn(user.role === 'super_admin' ? "text-[var(--sa-text-secondary)]" : "text-[#002147]")} size="sm" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={cn(
                  "block w-full pl-12 pr-4 py-3 border font-medium transition-all duration-200 text-sm rounded-xl focus:outline-none focus:ring-2",
                  user.role === 'super_admin'
                    ? "bg-[var(--sa-card)] border-[var(--sa-border)] text-[var(--sa-text-primary)] placeholder-[var(--sa-text-secondary)] focus:ring-[var(--sa-primary)] focus:border-[var(--sa-primary)]"
                    : "border-slate-200 leading-5 bg-slate-50 placeholder-slate-400 focus:placeholder-slate-300 focus:ring-blue-500 focus:border-blue-500 focus:bg-white",
                  isSearchFocused && user.role !== 'super_admin' && "bg-white shadow-lg"
                )}
                placeholder="Search companies, admins, subscriptions..."
              />
            </div>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              "p-3 rounded-xl transition-all focus:outline-none focus:ring-2",
              user.role === 'super_admin'
                ? "hover:bg-[var(--sa-hover)] text-[var(--sa-text-secondary)] hover:text-[var(--sa-text-primary)] focus:ring-[var(--sa-primary)]"
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:ring-blue-500"
            )}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Icon name={isDarkMode ? 'sun' : 'moon'} size="sm" />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className={cn(
                "p-3 rounded-xl focus:outline-none focus:ring-2 transition-all relative",
                user.role === 'super_admin'
                  ? showNotifications 
                    ? "text-[var(--sa-primary)] bg-[color-mix(in srgb, var(--sa-primary), transparent 90%)]" 
                    : "text-[var(--sa-text-secondary)] hover:bg-[var(--sa-hover)] hover:text-[var(--sa-text-primary)] focus:ring-[var(--sa-primary)]"
                  : showNotifications 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:ring-blue-500'
              )}
            >
              <Icon name="bell" size="sm" />
              {/* Notification badge */}
              <span className="absolute top-2.5 right-2.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div 
                className={cn(
                  "absolute right-0 mt-2 w-80 rounded-xl shadow-xl ring-1 focus:outline-none z-[60] border transition-all duration-200",
                  user.role === 'super_admin'
                    ? "bg-[var(--sa-card)] border-[var(--sa-border)] ring-[var(--sa-border)]"
                    : "bg-white border-slate-200 ring-slate-200 shadow-xl"
                )}
              >
                <div className="py-1">
                  <div className={cn(
                    "px-4 py-3 text-sm font-semibold border-b rounded-t-xl",
                    user.role === 'super_admin'
                      ? "text-[var(--sa-text-primary)] border-[var(--sa-border)] bg-[var(--sa-hover)]"
                      : "text-slate-900 border-slate-200 bg-slate-50"
                  )}>
                    Notifications
                  </div>
                  <div className="px-4 py-8 text-sm text-center">
                    <Icon 
                      name="bell" 
                      className={cn("mx-auto mb-3", user.role === 'super_admin' ? "text-[color-mix(in srgb, var(--sa-primary), transparent 60%)]" : "text-slate-300")} 
                      size="lg" 
                    />
                    <p className={cn(user.role === 'super_admin' ? "text-[var(--sa-text-secondary)]" : "text-slate-500")}>
                      No new notifications
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className={cn(
                "flex items-center p-1.5 rounded-xl transition-all focus:outline-none focus:ring-2",
                user.role === 'super_admin'
                  ? showUserMenu 
                    ? "bg-[var(--sa-hover)] ring-2 ring-[var(--sa-primary)]" 
                    : "hover:bg-[var(--sa-hover)] focus:ring-[var(--sa-primary)]"
                  : showUserMenu 
                    ? 'text-blue-600 bg-blue-50 focus:ring-blue-500' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:ring-blue-500'
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center mr-3 shadow-lg transition-transform",
                user.role === 'super_admin' ? "bg-[var(--sa-primary)]" : "bg-gradient-to-br from-blue-500 to-blue-600"
              )}>
                <Icon name="user-circle" className="text-white" size="sm" />
              </div>
              <div className="hidden md:block text-left">
                <div className={cn("text-sm font-semibold", user.role === 'super_admin' ? "text-[var(--sa-text-primary)]" : "text-slate-900")}>
                  {user.fullName}
                </div>
                <div className={cn("text-[11px] font-medium uppercase tracking-wider", user.role === 'super_admin' ? "text-[var(--sa-text-secondary)]" : "text-slate-500")}>
                  {user.role.replace('_', ' ')}
                </div>
              </div>
              <Icon name="chevron-down" className={cn("ml-2 transition-transform", showUserMenu ? "rotate-180" : "", user.role === 'super_admin' ? "text-[var(--sa-text-secondary)]" : "text-slate-400")} size="sm" />
            </button>

            {showUserMenu && (
              <div 
                className={cn(
                  "absolute right-0 mt-2 w-64 rounded-xl shadow-xl ring-1 focus:outline-none z-[60] border overflow-hidden transition-all duration-200",
                  user.role === 'super_admin'
                    ? "bg-[var(--sa-card)] border-[var(--sa-border)] ring-[var(--sa-border)]"
                    : "bg-white border-slate-200 ring-slate-200"
                )}
              >
                <div className="py-2">
                  <div className="px-4 py-3 border-b mb-1 md:hidden" style={{ borderColor: 'var(--sa-border)' }}>
                     <p className="text-sm font-semibold" style={{ color: 'var(--sa-text-primary)' }}>{user.fullName}</p>
                     <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--sa-text-secondary)' }}>{user.role.replace('_', ' ')}</p>
                  </div>

                  <a
                    href="#"
                    className={cn(
                      "flex items-center px-4 py-3 text-sm transition-colors",
                      user.role === 'super_admin'
                        ? "text-[var(--sa-text-primary)] hover:bg-[var(--sa-hover)]"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowUserMenu(false);
                      // TODO: Navigate to profile
                    }}
                  >
                    <Icon name="user-circle" className={cn("mr-3", user.role === 'super_admin' ? "text-[var(--sa-primary)]" : "text-slate-400")} size="sm" />
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className={cn(
                      "flex items-center px-4 py-3 text-sm transition-colors",
                      user.role === 'super_admin'
                        ? "text-[var(--sa-text-primary)] hover:bg-[var(--sa-hover)]"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowUserMenu(false);
                      // TODO: Navigate to settings
                    }}
                  >
                    <Icon name="cog" className={cn("mr-3", user.role === 'super_admin' ? "text-[var(--sa-primary)]" : "text-slate-400")} size="sm" />
                    Settings
                  </a>
                  <div 
                    className="my-1 border-t" 
                    style={user.role === 'super_admin' ? { borderColor: 'var(--sa-border)' } : { borderColor: '#E2E8F0' }}
                  />
                  {onSwitchRole && (
                    <a
                      href="#"
                      className={cn(
                        "flex items-center px-4 py-3 text-sm transition-colors",
                        user.role === 'super_admin'
                          ? "text-[var(--sa-text-primary)] hover:bg-[var(--sa-hover)]"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowUserMenu(false);
                        onSwitchRole();
                      }}
                    >
                      <Icon name="switch-horizontal" className={cn("mr-3", user.role === 'super_admin' ? "text-[var(--sa-primary)]" : "text-slate-400")} size="sm" />
                      Switch to {user.role === 'super_admin' ? 'Admin' : 'Super Admin'}
                    </a>
                  )}
                  <a
                    href="#"
                    className={cn(
                      "flex items-center px-4 py-3 text-sm transition-colors",
                      user.role === 'super_admin'
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-red-600 hover:bg-red-50"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowUserMenu(false);
                      onLogout();
                    }}
                  >
                    <Icon name="x" className={cn("mr-3", user.role === 'super_admin' ? "text-red-400" : "text-red-400")} size="sm" />
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="search" className="text-[#002147]" size="sm" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
              placeholder="Search..."
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;