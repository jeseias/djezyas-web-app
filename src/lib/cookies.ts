import Cookies from 'js-cookie'

// Cookie utility functions for organization persistence

const ORGANIZATION_COOKIE_KEY = 'selected_organization_id'

export const cookies = {
  /**
   * Set a cookie with the given name, value, and optional expiration days
   */
  set: (name: string, value: string, days: number = 30): void => {
    Cookies.set(name, value, { expires: days, path: '/', sameSite: 'lax' })
  },

  /**
   * Get a cookie value by name
   */
  get: (name: string): string | null => {
    return Cookies.get(name) || null
  },

  /**
   * Remove a cookie by name
   */
  remove: (name: string): void => {
    Cookies.remove(name, { path: '/' })
  },

  /**
   * Set the selected organization ID in cookies
   */
  setSelectedOrganization: (organizationId: string): void => {
    Cookies.set(ORGANIZATION_COOKIE_KEY, organizationId, { 
      expires: 30, // 30 days expiration
      path: '/',
      sameSite: 'lax'
    })
  },

  /**
   * Get the selected organization ID from cookies
   */
  getSelectedOrganization: (): string | null => {
    return Cookies.get(ORGANIZATION_COOKIE_KEY) || null
  },

  /**
   * Remove the selected organization ID from cookies
   */
  removeSelectedOrganization: (): void => {
    Cookies.remove(ORGANIZATION_COOKIE_KEY, { path: '/' })
  }
} 