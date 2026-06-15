import { create } from 'zustand';

interface AuditState {
  emissions: string | null;
  recommendations: string[];
  setAuditData: (emissions: string, recommendations: string[]) => void;
  clearAuditData: () => void;
}

export const useAuditStore = create<AuditState>((set) => ({
  emissions: null,
  recommendations: [],
  setAuditData: (emissions, recommendations) => set({ emissions, recommendations }),
  clearAuditData: () => set({ emissions: null, recommendations: [] }),
}));
