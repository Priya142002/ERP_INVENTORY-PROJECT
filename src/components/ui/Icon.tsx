import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  CreditCard, 
  Settings, 
  List, 
  Plus, 
  Link as LinkIcon, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Bell, 
  Search, 
  Sun, 
  Moon, 
  UserCircle, 
  BarChart3, 
  ClipboardList, 
  ChevronUp,
  ShieldCheck,
  Building
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

const icons: Record<string, React.ComponentType<any>> = {
  dashboard: LayoutDashboard,
  building: Building2,
  users: Users,
  'credit-card': CreditCard,
  cog: Settings,
  list: List,
  plus: Plus,
  link: LinkIcon,
  menu: Menu,
  x: X,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  bell: Bell,
  search: Search,
  sun: Sun,
  moon: Moon,
  'user-circle': UserCircle,
  'chart-bar': BarChart3,
  'document-text': ClipboardList, // Mapping to ClipboardList for Audit Logs
  'clipboard-list': ClipboardList,
  'chevron-up': ChevronUp,
  'shield-check': ShieldCheck,
  'building-simple': Building
};

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 'md' }) => {
  const IconComponent = icons[name as keyof typeof icons];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent className={`${iconSizes[size]} ${className}`} />
  );
};

export default Icon;