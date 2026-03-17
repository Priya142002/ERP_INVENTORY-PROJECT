import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import * as fc from 'fast-check';
import { Sidebar } from '../Sidebar';
import { User } from '../../../types';

// Mock react-router-dom's useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ pathname: '/dashboard' })
  };
});

/**
 * Bug Condition Exploration Test for User Profile Position Fix
 * 
 * **Validates: Requirements 2.1, 2.2**
 * 
 * This test encodes the EXPECTED behavior: the user profile section should appear
 * at the bottom of the sidebar (after navigation, before footer).
 * 
 * **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists.
 * The current code has the profile positioned at the top (after header, before navigation).
 * 
 * When this test fails, it will surface counterexamples showing that the profile
 * is incorrectly positioned at the top instead of the bottom.
 */
describe('Sidebar Bug Condition Exploration', () => {
  
  /**
   * Property 1: Bug Condition - User Profile Positioned at Bottom (Expected Behavior)
   * 
   * **Validates: Requirements 2.1, 2.2**
   * 
   * Tests that for ANY sidebar render (any role, any device state), the visual order
   * of sections is: Header → Navigation → UserProfile → Footer
   * 
   * This test uses property-based testing to verify the correct positioning across
   * different scenarios (super_admin vs admin roles, mobile vs desktop states).
   * 
   * **EXPECTED OUTCOME ON UNFIXED CODE**: Test FAILS
   * - Counterexamples will show profile appears as 2nd child (after header, before navigation)
   * - This proves the bug exists: profile is at top instead of bottom
   */
  it('Property 1: User profile section should appear at bottom (after navigation, before footer)', () => {
    // Property-based test: Generate different user roles and device states
    fc.assert(
      fc.property(
        // Arbitrary for user role
        fc.constantFrom('super_admin' as const, 'admin' as const),
        // Arbitrary for device state (mobile open/closed, desktop)
        fc.boolean(),
        (role, isOpen) => {
          // Create test user with the generated role
          const testUser: User = {
            id: 'test-user-1',
            fullName: 'Test User',
            email: 'test@example.com',
            role: role,
            ...(role === 'admin' ? { companyId: 'company-1' } : {})
          };

          // Render the sidebar
          const { container } = render(
            <BrowserRouter>
              <Sidebar user={testUser} isOpen={isOpen} onClose={() => {}} />
            </BrowserRouter>
          );

          // Get the main sidebar container (the div with the sidebar content)
          const sidebarContainer = container.querySelector('[class*="fixed inset-y-0"]');
          expect(sidebarContainer).toBeTruthy();

          // Get all direct children of the sidebar to determine visual order
          const children = Array.from(sidebarContainer!.children);
          
          // Identify sections by their distinctive attributes
          const sections = children.map((child, index) => {
            const element = child as HTMLElement;
            const classes = element.className;
            const textContent = element.textContent || '';
            
            // Header: contains "ERP Admin" and logo
            if (textContent.includes('ERP Admin') && textContent.includes('Management Portal')) {
              return { type: 'Header', index, element };
            }
            
            // User Profile: contains user name and role badge
            if (textContent.includes(testUser.fullName) && textContent.includes(role.replace('_', ' '))) {
              return { type: 'UserProfile', index, element };
            }
            
            // Navigation: contains nav element
            if (element.tagName === 'NAV' || element.querySelector('nav')) {
              return { type: 'Navigation', index, element };
            }
            
            // Footer: contains "System Online" and version
            if (textContent.includes('System Online') && textContent.includes('Vivify Admin')) {
              return { type: 'Footer', index, element };
            }
            
            return { type: 'Unknown', index, element };
          }).filter(section => section.type !== 'Unknown');

          // Extract the visual order
          const visualOrder = sections
            .sort((a, b) => a.index - b.index)
            .map(section => section.type);

          // ASSERTION: The expected correct order is Header → Navigation → UserProfile → Footer
          // On UNFIXED code, this will FAIL because the actual order is Header → UserProfile → Navigation → Footer
          expect(visualOrder).toEqual(['Header', 'Navigation', 'UserProfile', 'Footer']);
        }
      ),
      {
        numRuns: 20, // Test 20 different combinations
        verbose: true // Show counterexamples when test fails
      }
    );
  });

  /**
   * Concrete test case: Super Admin role with desktop view
   * 
   * This provides a specific example to complement the property-based test.
   */
  it('Concrete case: Super admin profile should be at bottom on desktop', () => {
    const superAdminUser: User = {
      id: 'super-1',
      fullName: 'Super Admin User',
      email: 'super@example.com',
      role: 'super_admin'
    };

    const { container } = render(
      <BrowserRouter>
        <Sidebar user={superAdminUser} isOpen={false} onClose={() => {}} />
      </BrowserRouter>
    );

    const sidebarContainer = container.querySelector('[class*="fixed inset-y-0"]');
    const children = Array.from(sidebarContainer!.children);
    
    // Find indices of key sections
    let headerIndex = -1;
    let profileIndex = -1;
    let navIndex = -1;
    let footerIndex = -1;

    children.forEach((child, index) => {
      const element = child as HTMLElement;
      const text = element.textContent || '';
      
      if (text.includes('ERP Admin')) headerIndex = index;
      if (text.includes('Super Admin User')) profileIndex = index;
      if (element.tagName === 'NAV') navIndex = index;
      if (text.includes('System Online')) footerIndex = index;
    });

    // Expected order: header < nav < profile < footer
    // On UNFIXED code: header < profile < nav < footer (WRONG!)
    expect(headerIndex).toBeLessThan(navIndex);
    expect(navIndex).toBeLessThan(profileIndex);
    expect(profileIndex).toBeLessThan(footerIndex);
  });

  /**
   * Concrete test case: Regular Admin role with mobile view
   * 
   * Tests the same positioning requirement for admin role on mobile.
   */
  it('Concrete case: Admin profile should be at bottom on mobile', () => {
    const adminUser: User = {
      id: 'admin-1',
      fullName: 'Regular Admin',
      email: 'admin@example.com',
      role: 'admin',
      companyId: 'company-1'
    };

    const { container } = render(
      <BrowserRouter>
        <Sidebar user={adminUser} isOpen={true} onClose={() => {}} />
      </BrowserRouter>
    );

    const sidebarContainer = container.querySelector('[class*="fixed inset-y-0"]');
    const children = Array.from(sidebarContainer!.children);
    
    // Find indices of key sections
    let headerIndex = -1;
    let profileIndex = -1;
    let navIndex = -1;
    let footerIndex = -1;

    children.forEach((child, index) => {
      const element = child as HTMLElement;
      const text = element.textContent || '';
      
      if (text.includes('ERP Admin')) headerIndex = index;
      if (text.includes('Regular Admin')) profileIndex = index;
      if (element.tagName === 'NAV') navIndex = index;
      if (text.includes('System Online')) footerIndex = index;
    });

    // Expected order: header < nav < profile < footer
    // On UNFIXED code: header < profile < nav < footer (WRONG!)
    expect(headerIndex).toBeLessThan(navIndex);
    expect(navIndex).toBeLessThan(profileIndex);
    expect(profileIndex).toBeLessThan(footerIndex);
  });
});
