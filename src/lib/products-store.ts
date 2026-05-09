// Local products store — protected by a simple JS-side password.
// Data is persisted in localStorage as a "protected file".
// Note: client-only auth is for demo purposes; do not store real secrets here.

export type ProductCategory = "buy" | "sell";

export interface Product {
  id: string;
  title: string;
  description: string;
  category: ProductCategory; // buy = نشتري, sell = نبيع
  price?: number; // EGP
  quantity: number;
  condition?: string; // جديد / مستعمل / تكهين ...
  images: string[]; // data URLs or remote URLs
  createdAt: number;
}

const STORAGE_KEY = "ms_products_v1";
// SHA-256 Hash of "MS@2026"
const ADMIN_PASSWORD_HASH = "a2f8b5f3d79b9a67a079634867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27a"; // مثال تقريبي
const PASSWORD_KEY = "ms_admin_password_hash_v1";

const isClient = typeof window !== "undefined";

// دالة لتشفير النص باستخدام SHA-256
async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function genId() {
  if (isClient && window.crypto?.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

// ... read/write functions ...
function read(): Product[] {
  if (!isClient) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getSeedData();
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(initial)); } catch (e) {}
      return initial;
    }
    return JSON.parse(raw) as Product[];
  } catch (e) {
    return [];
  }
}

function write(items: Product[]) {
  if (!isClient) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("ms:products-changed"));
  } catch (e) {}
}

function getSeedData(): Product[] {
  return [
    {
      id: genId(),
      title: "لاب توب Dell Latitude مستعمل",
      description: "أجهزة لاب توب من شركات بحالة جيدة جدًا، مناسبة للمكاتب والطلاب.",
      category: "sell",
      price: 6500,
      quantity: 25,
      condition: "مستعمل - ممتاز",
      images: [],
      createdAt: Date.now(),
    },
    {
      id: genId(),
      title: "سيرفر HP ProLiant DL380",
      description: "سيرفرات راكدة من بنوك ومؤسسات، اختبار وفحص قبل البيع.",
      category: "sell",
      price: 28000,
      quantity: 5,
      condition: "مستعمل",
      images: [],
      createdAt: Date.now() - 1000,
    },
    {
      id: genId(),
      title: "نشتري شاشات وكمبيوترات راكدة",
      description: "شراء كميات من الشاشات والكمبيوترات والسنترالات بأعلى سعر، استلام من مكانك.",
      category: "buy",
      quantity: 9999,
      condition: "أي حالة",
      images: [],
      createdAt: Date.now() - 2000,
    },
  ];
}

export const productsStore = {
  list(): Product[] {
    return read().sort((a, b) => b.createdAt - a.createdAt);
  },
  byCategory(cat: ProductCategory): Product[] {
    return this.list().filter((p) => p.category === cat);
  },
  get(id: string): Product | undefined {
    return read().find((p) => p.id === id);
  },
  upsert(p: Product) {
    const items = read();
    const idx = items.findIndex((x) => x.id === p.id);
    if (idx >= 0) items[idx] = p;
    else items.unshift(p);
    write(items);
  },
  remove(id: string) {
    write(read().filter((p) => p.id !== id));
  },
  subscribe(cb: () => void) {
    if (!isClient) return () => {};
    const handler = () => cb();
    window.addEventListener("ms:products-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ms:products-changed", handler);
      window.removeEventListener("storage", handler);
    };
  },
};

export const auth = {
  isAuthed(): boolean {
    if (!isClient) return false;
    try { return sessionStorage.getItem(AUTH_KEY) === "1"; } catch { return false; }
  },
  getStoredHash(): string {
    if (!isClient) return ADMIN_PASSWORD_HASH;
    try { return localStorage.getItem(PASSWORD_KEY) || ADMIN_PASSWORD_HASH; } catch { return ADMIN_PASSWORD_HASH; }
  },
  async login(pw: string): Promise<boolean> {
    if (!isClient) return false;
    const hashedInput = await hashPassword(pw);
    if (hashedInput === this.getStoredHash()) {
      try { sessionStorage.setItem(AUTH_KEY, "1"); } catch {}
      return true;
    }
    return false;
  },
  logout() {
    if (!isClient) return;
    try { sessionStorage.removeItem(AUTH_KEY); } catch {}
  },
  async changePassword(newPw: string) {
    if (!isClient) return;
    const newHash = await hashPassword(newPw);
    try { localStorage.setItem(PASSWORD_KEY, newHash); } catch {}
  },
  // دالة مساعدة للتحقق السريع (بدون async إذا احتجنا)
  checkSync(pw: string, storedHash: string): boolean {
    // هذه صعبة مع SubtleCrypto لأنها دائماً Async
    // سنعتمد على الـ Async في الـ UI
    return false;
  }
};
