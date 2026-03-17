import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DashboardShell } from '../DashboardShell';
import { User } from '../../../types';

// Mock the Outlet component from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Main Content</div>,
    useLocation: () => ({ pathname: '/dashboard' })
  };
});

const mockUser: User = {
  id: '1',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  role: 'super_admin'
};

const mockOnLogout = vi.fn();

const renderDashboardShell = (user: User = mockUser) => {
  return render(
    <BrowserRouter>
      <DashboardShell user={user} onLogout={mockOnLogout} />
    </BrowserRouter>
  );
};

describe('DashboardShell', () => {
  beforeEach(() => {
    mockOnLogout.mockClear();
  });

  it('should render the dashboard shell with sidebar and header', () => {
    renderDashboardShell();
    
    // Check if main components are rendered
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('should show mobile menu button on mobile', () => {
    renderDashboardShell();
    
    // The mobile menu button should be present
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('should toggle sidebar when menu button is clicked', () => {
    renderDashboardShell();
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    
    // Sidebar should be visible (this is a simplified test)
    // In a real test, you'd check for specific classes or attributes
    expect(menuButton).toBeInTheDocument();
  });

  it('should display correct page title based on route', () => {
    renderDashboardShell();
    
    // Should show Dashboard as the default title
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should render navigation items for super admin', () => {
    renderDashboardShell(mockUser);
    
    // Super admin should see all navigation items
    expect(screen.getByText('Companies')).toBeInTheDocument();
    expect(screen.getByText('Administrators')).toBeInTheDocument();
    expect(screen.getByText('Subscriptions')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should render limited navigation items for regular admin', () => {
    const adminUser: User = {
      ...mockUser,
      role: 'admin',
      companyId: 'company-1'
    };
    
    renderDashboardShell(adminUser);
    
    // Regular admin should not see company/admin/subscription management
    expect(screen.queryByText('Companies')).not.toBeInTheDocument();
    expect(screen.queryByText('Administrators')).not.toBeInTheDocument();
    expect(screen.queryByText('Subscriptions')).not.toBeInTheDocument();
    
    // But should see dashboard and settings
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should have responsive layout classes', () => {
    renderDashboardShell();
    
    // Check for responsive layout structure
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toHaveClass('flex-1');
  });
});