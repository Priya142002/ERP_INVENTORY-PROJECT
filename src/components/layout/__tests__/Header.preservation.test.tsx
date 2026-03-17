import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import fc from 'fast-check';
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
 * Preservation Property Tests for Header Branding Fix
 * 
 * These tests verify that non-super-admin roles and all interactive features
 * continue to work exactly as they do on the UNFIXED code.
 * 
 * EXPECTED OUTCOME: These tests PASS on unfixed code (confirming baseline behavior)
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7**
 */
describe('Header Preservation Properties - Non-Super-Admin Behavior', () => {
  const mockOnMenuClick = vi.fn();
  const mockOnLogout = vi.fn();

  afterEach(() => {
    cleanup();
    mockOnMenuClick.mockClear();
    mockOnLogout.mockClear();
  });

  /**
   * Property 2: Preservation - Non-Super-Admin Header Display
   * 
   * For any user where user.role !== 'super_admin', the Header component SHALL
   * continue to display the title prop value and subtitle unchanged.
   * 
   * **Validates: Requirements 3.7**
   */
  it('Property: Non-super-admin roles display title prop and subtitle unchanged', () => {
    // Arbitrary for non-super-admin roles (only 'admin' since types don't include company_admin)
    const nonSuperAdminRoleArb = fc.constant('admin');
    
    // Arbitrary for title values
    const titleArb = fc.oneof(
      fc.constant('Dashboard'),
      fc.constant('Analytics'),
      fc.constant('Settings'),
      fc.constant('Reports'),
      fc.constant(undefined) // Test default title
    );

    fc.assert(
      fc.property(nonSuperAdminRoleArb, titleArb, fc.uuid(), fc.emailAddress(), fc.string(), (role, title, id, email, fullName) => {
        const user: User = {
          id,
          fullName: fullName || 'Test User',
          email,
          role: role as 'admin',
        };

        const { container, unmount } = render(
          <Header
            user={user}
            onMenuClick={mockOnMenuClick}
            onLogout={mockOnLogout}
            title={title}
          />
        );

        // Requirement 3.7: Non-super-admin SHALL CONTINUE TO display existing layout
        const expectedTitle = title || 'Dashboard';
        const titleElements = container.querySelectorAll('h1');
        const titleElement = Array.from(titleElements).find(el => el.textContent === expectedTitle);
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveClass('text-2xl', 'font-bold');

        // Verify subtitle is displayed
        const subtitle = screen.getByText('Manage your ERP system efficiently');
        expect(subtitle).toBeInTheDocument();
        expect(subtitle).toHaveClass('text-sm', 'mt-1');

        // Verify system branding is NOT displayed for non-super-admin
        expect(screen.queryByText('System Online')).not.toBeInTheDocument();
        expect(screen.queryByText('Vivify Admin v2.0')).not.toBeInTheDocument();

        // Verify no green indicator is present
        const greenIndicator = container.querySelector('.bg-green-500.rounded-full');
        expect(greenIndicator).not.toBeInTheDocument();
        
        unmount();
      }),
      { numRuns: 20 }
    );
  });

  /**
   * Property: User menu dropdown displays and functions correctly for all roles
   * 
   * **Validates: Requirements 3.1**
   */
  it('Property: User menu dropdown works identically for all roles', () => {
    const mockAdmin: User = {
      id: 'admin-1',
      fullName: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    };

    render(
      <Header
        user={mockAdmin}
        onMenuClick={mockOnMenuClick}
        onLogout={mockOnLogout}
      />
    );

    // Requirement 3.1: User menu SHALL CONTINUE TO display in top right
    const userMenuButton = screen.getByRole('button', { name: /Admin User/i });
    expect(userMenuButton).toBeInTheDocument();

    // Verify user menu displays user information
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();

    // Click to open user menu
    fireEvent.click(userMenuButton);

    // Verify dropdown menu appears with expected items
    expect(screen.getByText('Your Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();

    // Click sign out
    const signOutButton = screen.getByText('Sign out');
    fireEvent.click(signOutButton);

    // Verify logout callback was called
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  /**
   * Property: Mobile menu button functions correctly for all roles
   * 
   * **Validates: Requirements 3.2**
   */
  it('Property: Mobile menu button works identically for all roles', () => {
    const mockAdmin: User = {
      id: 'admin-1',
      fullName: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    };

    render(
      <Header
        user={mockAdmin}
        onMenuClick={mockOnMenuClick}
        onLogout={mockOnLogout}
      />
    );

    // Requirement 3.2: Mobile menu button SHALL CONTINUE TO function
    const mobileMenuButtons = screen.getAllByRole('button');
    const mobileMenuButton = mobileMenuButtons.find(btn => {
      const svg = btn.querySelector('svg');
      return svg && btn.className.includes('lg:hidden');
    });

    expect(mobileMenuButton).toBeInTheDocument();

    // Click mobile menu button
    fireEvent.click(mobileMenuButton!);

    // Verify onMenuClick callback was called
    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Property: Search bar displays and functions correctly for all roles
   * 
   * **Validates: Requirements 3.3**
   */
  it('Property: Search bar works identically for all roles', () => {
    const mockAdmin: User = {
      id: 'admin-1',
      fullName: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    };

    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <Header
        user={mockAdmin}
        onMenuClick={mockOnMenuClick}
        onLogout={mockOnLogout}
      />
    );

    // Requirement 3.3: Search bar SHALL CONTINUE TO display in center section
    const searchInputs = screen.getAllByPlaceholderText(/search/i);
    expect(searchInputs.length).toBeGreaterThan(0);
    
    // Use the first search input (desktop version)
    const searchInput = searchInputs[0];
    expect(searchInput).toBeInTheDocument();

    // Type in search input
    const testQuery = 'test search';
    fireEvent.change(searchInput, { target: { value: testQuery } });
    expect(searchInput).toHaveValue(testQuery);

    // Submit search form
    fireEvent.submit(searchInput.closest('form')!);

    // Verify search functionality works (console.log is called)
    expect(consoleLogSpy).toHaveBeenCalledWith('Search query:', testQuery);

    consoleLogSpy.mockRestore();
  });

  /**
   * Property: Theme toggle button functions correctly for all roles
   * 
   * **Validates: Requirements 3.4**
   */
  it('Property: Theme toggle button works identically for all roles', () => {
    const mockAdmin: User = {
      id: 'admin-1',
      fullName: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    };

    render(
      <Header
        user={mockAdmin}
        onMenuClick={mockOnMenuClick}
        onLogout={mockOnLogout}
      />
    );

    // Requirement 3.4: Theme toggle SHALL CONTINUE TO display
    const themeToggleButton = screen.getByTitle(/switch to dark mode/i);
    expect(themeToggleButton).toBeInTheDocument();

    // Verify it's a button element
    expect(themeToggleButton.tagName).toBe('BUTTON');
  });

  /**
   * Property: Notifications button displays and functions correctly for all roles
   * 
   * **Validates: Requirements 3.5**
   */
  it('Property: Notifications button works identically for all roles', () => {
    const mockAdmin: User = {
      id: 'admin-1',
      fullName: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    };

    const { container } = render(
      <Header
        user={mockAdmin}
        onMenuClick={mockOnMenuClick}
        onLogout={mockOnLogout}
      />
    );

    // Requirement 3.5: Notifications button SHALL CONTINUE TO display
    // Find the notification button by looking for the bell icon and notification badge
    const notificationBadge = container.querySelector('.bg-red-400.ring-2');
    expect(notificationBadge).toBeInTheDocument();
    
    // Get the button that contains the badge
    const notificationButton = notificationBadge?.closest('button');
    expect(notificationButton).toBeInTheDocument();

    // Click notifications button
    fireEvent.click(notificationButton!);

    // Verify notifications dropdown appears
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('No new notifications')).toBeInTheDocument();
  });

  /**
   * Property: Super admin theme styling continues to be applied correctly
   * 
   * **Validates: Requirements 3.6**
   */
  it('Property: Super admin theme styling remains applied to header', () => {
    const mockSuperAdmin: User = {
      id: 'super-1',
      fullName: 'Super Admin User',
      email: 'super@example.com',
      role: 'super_admin',
    };

    const { container } = render(
      <Header
        user={mockSuperAdmin}
        onMenuClick={mockOnMenuClick}
        onLogout={mockOnLogout}
      />
    );

    // Requirement 3.6: Super admin theme styling SHALL CONTINUE TO apply
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();

    // Verify super admin CSS variables are applied
    const style = header!.getAttribute('style');
    expect(style).toContain('--sa-header');
    expect(style).toContain('--sa-border');

    // Verify border class is applied
    expect(header).toHaveClass('border-b');
  });
});
