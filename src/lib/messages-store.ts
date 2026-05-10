export type MessageStatus = "new" | "contacted" | "archived";

export interface ContactMessage {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  status: MessageStatus;
  createdAt: number;
}

const STORAGE_KEY = "ms_messages_v1";

function read(): ContactMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ContactMessage[]) : [];
  } catch {
    return [];
  }
}

function write(items: ContactMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("ms:messages-changed"));
}

export const messagesStore = {
  list(): ContactMessage[] {
    return read().sort((a, b) => b.createdAt - a.createdAt);
  },
  add(c: Omit<ContactMessage, "id" | "createdAt" | "status">) {
    const item: ContactMessage = {
      ...c,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      status: "new",
    };
    write([item, ...read()]);
    return item;
  },
  setStatus(id: string, status: MessageStatus) {
    write(read().map((c) => (c.id === id ? { ...c, status } : c)));
  },
  remove(id: string) {
    write(read().filter((c) => c.id !== id));
  },
  subscribe(cb: () => void) {
    if (typeof window === "undefined") return () => {};
    const handler = () => cb();
    window.addEventListener("ms:messages-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ms:messages-changed", handler);
      window.removeEventListener("storage", handler);
    };
  },
};
