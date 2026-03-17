import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../Header';
import { User } from '../../../types';

// Mock the superadmin-theme hook
vi.mock('../../../app/superadmin-theme', () => ({
  useSuperAdminTheme: () => ({
    mode: 'light',
    toggleTheme: vi.fn(),
  }),
}));

/**
 * Bug Condition Exploration Test for Header Branding Fix
 * 
 * This test verifies the bug condition: super admin dashboard header should display
 * "System Online" with green indicator and "Vivify Admin v2.0" instead of generic
 * title/subtitle content.
 * 
 * EXPECTED OUTCOME: This test FAILS on unfixed code (proving the bug exists)
 * 
 * **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
 */
describe('Header Bug Condition Exploration - Super Admin Branding', () => {
  const mockSuperAdmin: User = {
    id: 'super-1',
    fullName: 'John Doe',
    email: 'john@example.com',
    role: 'super_admin',
  };

  const mockOnMenuClick = vi.fn();
  const mockOnLogout = vi.fn();

  it('should display "System Online" with green indicator for super admin (Bug Condition Test)', () => {
    const { container } = render(
      <Header
        user={mockSuperAdmin}
        onMenuClick={mockOnMenuClick}
        onLogout={mockOnLogout}
        title="Dashboard"
      />
    );

    // Requirement 2.1: System SHALL display "System Online" with a green indicator
    const systemOnlineText = screen.getByText('System Online');
    expect(systemOnlineText).toBeInTheDocument();

    // Verify green status indicator exists (circular, green-500 color)
    // The indicator should be a span with green background before "System Online"
    const greenIndicator = container.querySelector('.bg-green-500.rounded-full');
    expect(greenIndicator).toBeInTheDocument();
    expect(greenIndicator).toHaveClass('w-2', 'h-2'); // 8px diameter
  });

  it('should display "Vivify Admin v2.0" as secondary text for super admin (Bug Condition Test)', () => {
    render(
      <Header
        user={mockSuperAdmin}
        onMenuClick={mockOnMenuClick}
        onLogout={mockOnLogout}
        title="Dashboard"
      />
    );

    // Requirement 2.2: System SHALL display "Vivify Admin v2.0" below system status
    const versionText = screen.getByText('Vivify Admin v2.0');
    expect(versionText).toBeInTheDocument();
  });

  it('should NOT display generic title prop for super admin (Bug Condition Test)', () => {
    render(
      <Header
        user={mockSuperAdmin}
        onMenuClick={mockOnMenuClick}
        onLogout={mockOnLogout}
        title="Dashboard"
      />
    );

    // Requirement 2.3: System SHALL NOT display user full name in left section
    // The title "Dashboard" should not appear in the left section for super admin
    const leftSection = screen.getByText('System Online').closest('div');
    expect(leftSection).not.toHaveTextContent('Dashboard');
  });

  it('should NOT display generic subtitle for super admin (Bug Condition Test)', () => {
    render(
      <Header
        user={mockSuperAdmin}
        onMenuClick={mockOnMenuClick}
        onLogout={mockOnLogout}
        title="Dashboard"
      />
    );

    // Requirement 2.4: System SHALL NOT display generic subtitle
    // The subtitle "Manage your ERP system efficiently" should not appear for super admin
    expect(screen.queryByText('Manage your ERP system efficiently')).not.toBeInTheDocument();
  });

  it('should display system branding regardless of title prop value (Bug Condition Test)', () => {
    render(
      <Header
        user={mockSuperAdmin}
        onMenuClick={mockOnMenuClick}
        onLogout={mockOnLogout}
        title="Analytics"
      />
    );

    // Super admin should see "System Online" even when title prop is "Analytics"
    expect(screen.getByText('System Online')).toBeInTheDocument();
    expect(screen.getByText('Vivify Admin v2.0')).toBeInTheDocument();
    
    // The title prop "Analytics" should not appear in the left section
    const leftSection = screen.getByText('System Online').closest('div');
    expect(leftSection).not.toHaveTextContent('Analytics');
  });
});
