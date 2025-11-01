/**
 * Navigation constants for the application
 */

export interface NavPage {
  name: string;
  path: string;
}

export const NAVIGATION_PAGES: NavPage[] = [
  { name: 'Home', path: '/home' },
  { name: 'Search', path: '/search-results' }
];
