import { useNetwork } from '@/shared/hooks/useNetwork';

/**
 * Simple NetworkMonitor Component
 * Monitors network connectivity and shows toast notifications
 */
export function NetworkMonitor() {
  useNetwork();
  return null;
}
