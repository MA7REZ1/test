// Local contracts store — submissions from companies wishing to sign a
// recurring sell-to-us agreement. Persisted in localStorage like products.

export type ContractStatus = "new" | "contacted" | "signed" | "rejected";

export interface ContractRequest {
  id: string;
  companyName: string;
  contactName: string;
  position?: string;
  phone: string;
  email?: string;
  governorate?: string;
  address?: string;
  sector?: string; // بنك / مصنع / شركة ...
  deviceTypes: string; // أنواع الأجهزة المتاحة
  estimatedQuantity?: string; // كمية تقديرية شهريًا/دوريًا
  frequency?: string; // شهري / ربع سنوي / حسب الطلب
  notes?: string;
  status: ContractStatus;
  createdAt: number;
}

const STORAGE_KEY = "ms_contracts_v1";

function read(): ContractRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ContractRequest[]) : [];
  } catch {
    return [];
  }
}

function write(items: ContractRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("ms:contracts-changed"));
}

export const contractsStore = {
  list(): ContractRequest[] {
    return read().sort((a, b) => b.createdAt - a.createdAt);
  },
  add(c: Omit<ContractRequest, "id" | "createdAt" | "status">) {
    const item: ContractRequest = {
      ...c,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      status: "new",
    };
    write([item, ...read()]);
    return item;
  },
  setStatus(id: string, status: ContractStatus) {
    write(read().map((c) => (c.id === id ? { ...c, status } : c)));
  },
  remove(id: string) {
    write(read().filter((c) => c.id !== id));
  },
  subscribe(cb: () => void) {
    const handler = () => cb();
    window.addEventListener("ms:contracts-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ms:contracts-changed", handler);
      window.removeEventListener("storage", handler);
    };
  },
};
