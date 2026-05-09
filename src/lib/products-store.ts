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
const AUTH_KEY = "ms_admin_auth_v1";
// Default admin password — تغييره من لوحة التحكم لاحقًا.
export const DEFAULT_ADMIN_PASSWORD = "MS@2026";
const PASSWORD_KEY = "ms_admin_password_v1";

function read(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed();
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

function write(items: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("ms:products-changed"));
}

function seed(): Product[] {
  const items: Product[] = [
    {
      id: crypto.randomUUID(),
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
      id: crypto.randomUUID(),
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
      id: crypto.randomUUID(),
      title: "نشتري شاشات وكمبيوترات راكدة",
      description: "شراء كميات من الشاشات والكمبيوترات والسنترالات بأعلى سعر، استلام من مكانك.",
      category: "buy",
      quantity: 9999,
      condition: "أي حالة",
      images: [],
      createdAt: Date.now() - 2000,
    },
  ];
  write(items);
  return items;
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
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(AUTH_KEY) === "1";
  },
  getPassword(): string {
    return localStorage.getItem(PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
  },
  login(pw: string): boolean {
    if (pw === this.getPassword()) {
      sessionStorage.setItem(AUTH_KEY, "1");
      return true;
    }
    return false;
  },
  logout() {
    sessionStorage.removeItem(AUTH_KEY);
  },
  changePassword(newPw: string) {
    localStorage.setItem(PASSWORD_KEY, newPw);
  },
};
