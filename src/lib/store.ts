import { create } from 'zustand';

/**
 * Shape of the global audit state managed by Zustand.
 *
 * `emissions` and `recommendations` are populated after a
 * successful AI audit and consumed by the Dashboard page.
 */
interface AuditState {
  emissions: string | null;
  recommendations: string[];
  setAuditData: (emissions: string, recommendations: string[]) => void;
  clearAuditData: () => void;
}

/**
 * Global store for persisting AI audit results across routes.
 *
 * When a user completes an audit on `/audit`, the results are
 * pushed here so `/dashboard` can render them without another
 * network request.
 */
export const useAuditStore = create<AuditState>((set) => ({
  emissions: null,
  recommendations: [],
  setAuditData: (emissions, recommendations) =>
    set({ emissions, recommendations }),
  clearAuditData: () => set({ emissions: null, recommendations: [] }),
}));
