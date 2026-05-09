import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { auth, productsStore, DEFAULT_ADMIN_PASSWORD, type Product, type ProductCategory } from "@/lib/products-store";
import { contractsStore, type ContractRequest, type ContractStatus } from "@/lib/contracts-store";
import { Lock, Plus, Trash2, Pencil, X, ImagePlus, LogOut, KeyRound, Save, Handshake, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "لوحة التحكم — M&S" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

function emptyProduct(): Product {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    category: "sell",
    price: undefined,
    quantity: 1,
    condition: "",
    images: [],
    createdAt: Date.now(),
  };
}

function Dashboard() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => { setAuthed(auth.isAuthed()); }, []);

  if (!authed) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto flex max-w-md flex-col px-4 py-20">
          <div className="rounded-2xl bg-gradient-card p-8 shadow-elegant">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-gradient-primary p-3 shadow-glow"><Lock className="h-6 w-6 text-primary-foreground" /></div>
              <div>
                <h1 className="text-2xl font-bold">لوحة التحكم</h1>
                <p className="text-sm text-muted-foreground">أدخل كلمة المرور للوصول</p>
              </div>
            </div>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="كلمة المرور" className="mb-3 w-full rounded-lg border border-border bg-input px-4 py-3 outline-none focus:border-primary" />
            {err && <div className="mb-3 text-sm text-destructive">{err}</div>}
            <button onClick={() => { if (auth.login(pw)) setAuthed(true); else setErr("كلمة مرور خاطئة"); }} className="w-full rounded-lg bg-gradient-primary px-4 py-3 font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">دخول</button>
            <p className="mt-4 text-xs text-muted-foreground">كلمة المرور الافتراضية: <code className="rounded bg-muted px-2 py-0.5">{DEFAULT_ADMIN_PASSWORD}</code> — يمكنك تغييرها بعد الدخول.</p>
          </div>
        </div>
      </div>
    );
  }

  return <DashboardInner onLogout={() => { auth.logout(); setAuthed(false); }} />;
}

function DashboardInner({ onLogout }: { onLogout: () => void }) {
  const [items, setItems] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showPwModal, setShowPwModal] = useState(false);

  useEffect(() => {
    const refresh = () => setItems(productsStore.list());
    refresh();
    return productsStore.subscribe(refresh);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold">لوحة التحكم</h1>
            <p className="text-muted-foreground">إدارة المنتجات وطلبات الشراء — {items.length} عنصر</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setEditing(emptyProduct())} className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 font-semibold text-primary-foreground shadow-glow"><Plus className="h-4 w-4" /> إضافة منتج</button>
            <button onClick={() => setShowPwModal(true)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-semibold hover:bg-accent"><KeyRound className="h-4 w-4" /> تغيير كلمة المرور</button>
            <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-semibold hover:bg-accent"><LogOut className="h-4 w-4" /> خروج</button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-gradient-card shadow-elegant">
          <table className="w-full text-right text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3">المنتج</th>
                <th className="px-4 py-3">القسم</th>
                <th className="px-4 py-3">الكمية</th>
                <th className="px-4 py-3">السعر</th>
                <th className="px-4 py-3">الصور</th>
                <th className="px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">لا توجد عناصر — أضف منتجك الأول</td></tr>
              )}
              {items.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold">{p.title}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${p.category === "buy" ? "bg-gold/20 text-gold" : "bg-primary/20 text-primary"}`}>{p.category === "buy" ? "نشتري" : "للبيع"}</span>
                  </td>
                  <td className="px-4 py-3">{p.quantity.toLocaleString("ar-EG")}</td>
                  <td className="px-4 py-3">{p.price ? `${p.price.toLocaleString("ar-EG")} ج.م` : "-"}</td>
                  <td className="px-4 py-3">{p.images.length}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setEditing({ ...p })} className="rounded-md border border-border p-1.5 hover:bg-accent"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => { if (confirm("حذف هذا المنتج؟")) productsStore.remove(p.id); }} className="rounded-md border border-border p-1.5 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ContractsPanel />
      </div>

      {editing && <EditModal product={editing} onClose={() => setEditing(null)} onSave={(p) => { productsStore.upsert(p); setEditing(null); }} />}
      {showPwModal && <PasswordModal onClose={() => setShowPwModal(false)} />}

    </div>
  );
}

function EditModal({ product, onClose, onSave }: { product: Product; onClose: () => void; onSave: (p: Product) => void }) {
  const [p, setP] = useState<Product>(product);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const arr: string[] = [];
    for (const f of Array.from(files)) {
      const dataUrl = await new Promise<string>((res) => {
        const r = new FileReader();
        r.onload = () => res(r.result as string);
        r.readAsDataURL(f);
      });
      arr.push(dataUrl);
    }
    setP((prev) => ({ ...prev, images: [...prev.images, ...arr] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-6 shadow-elegant">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{product.title ? "تعديل المنتج" : "منتج جديد"}</h2>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-accent"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-4">
          <Field label="اسم المنتج"><input value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} className="input" /></Field>
          <Field label="الوصف"><textarea value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} rows={3} className="input" /></Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="القسم">
              <select value={p.category} onChange={(e) => setP({ ...p, category: e.target.value as ProductCategory })} className="input">
                <option value="sell">للبيع</option>
                <option value="buy">نشتري</option>
              </select>
            </Field>
            <Field label="الحالة"><input value={p.condition || ""} onChange={(e) => setP({ ...p, condition: e.target.value })} placeholder="مستعمل / جديد / تكهين" className="input" /></Field>
            <Field label="الكمية"><input type="number" min={1} value={p.quantity} onChange={(e) => setP({ ...p, quantity: Number(e.target.value) })} className="input" /></Field>
            <Field label="السعر (ج.م) - اتركه فارغًا إذا حسب الكمية"><input type="number" min={0} value={p.price ?? ""} onChange={(e) => setP({ ...p, price: e.target.value ? Number(e.target.value) : undefined })} className="input" /></Field>
          </div>

          <Field label={`الصور (${p.images.length})`}>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {p.images.map((src, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-border">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                    <button onClick={() => setP({ ...p, images: p.images.filter((_, j) => j !== i) })} className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 group-hover:opacity-100"><X className="h-3 w-3" /></button>
                  </div>
                ))}
                <button onClick={() => fileRef.current?.click()} className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-accent">
                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                </button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
              <p className="text-xs text-muted-foreground">يمكنك رفع عدة صور للمنتج الواحد.</p>
            </div>
          </Field>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-border px-4 py-2 hover:bg-accent">إلغاء</button>
          <button onClick={() => onSave(p)} disabled={!p.title.trim()} className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-5 py-2 font-bold text-primary-foreground shadow-glow disabled:opacity-50"><Save className="h-4 w-4" /> حفظ</button>
        </div>
      </div>
      <style>{`.input { width: 100%; border-radius: .5rem; border: 1px solid var(--border); background: var(--input); padding: .6rem .8rem; outline: none; color: inherit; } .input:focus { border-color: var(--primary); }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-sm font-semibold">{label}</span>{children}</label>;
}

function ContractsPanel() {
  const [items, setItems] = useState<ContractRequest[]>([]);
  useEffect(() => {
    const refresh = () => setItems(contractsStore.list());
    refresh();
    return contractsStore.subscribe(refresh);
  }, []);

  const statusLabel: Record<ContractStatus, string> = {
    new: "جديد", contacted: "تم التواصل", signed: "تم التعاقد", rejected: "مرفوض",
  };
  const statusClass: Record<ContractStatus, string> = {
    new: "bg-primary/20 text-primary",
    contacted: "bg-gold/20 text-gold",
    signed: "bg-green-500/20 text-green-400",
    rejected: "bg-destructive/20 text-destructive",
  };

  return (
    <div className="mt-10">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-gradient-primary p-2 shadow-glow"><Handshake className="h-5 w-5 text-primary-foreground" /></div>
        <div>
          <h2 className="text-2xl font-bold">طلبات التعاقد</h2>
          <p className="text-sm text-muted-foreground">طلبات الشركات الراغبة في تعاقد دائم لبيع أجهزتها — {items.length} طلب</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl bg-gradient-card shadow-elegant">
        <table className="w-full min-w-[800px] text-right text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-4 py-3">الشركة</th>
              <th className="px-4 py-3">المسؤول</th>
              <th className="px-4 py-3">تواصل</th>
              <th className="px-4 py-3">الأجهزة / الدورية</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">لا توجد طلبات تعاقد بعد</td></tr>
            )}
            {items.map((c) => (
              <tr key={c.id} className="border-t border-border align-top">
                <td className="px-4 py-3">
                  <div className="font-semibold">{c.companyName}</div>
                  <div className="text-xs text-muted-foreground">{c.sector || "-"}{c.governorate ? ` • ${c.governorate}` : ""}</div>
                </td>
                <td className="px-4 py-3">
                  <div>{c.contactName}</div>
                  <div className="text-xs text-muted-foreground">{c.position || "-"}</div>
                </td>
                <td className="px-4 py-3">
                  <a href={`tel:${c.phone}`} className="flex items-center gap-1 text-primary hover:underline" dir="ltr"><Phone className="h-3 w-3" />{c.phone}</a>
                  {c.email && <a href={`mailto:${c.email}`} className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary" dir="ltr"><Mail className="h-3 w-3" />{c.email}</a>}
                </td>
                <td className="px-4 py-3 max-w-xs">
                  <div className="line-clamp-2 text-xs">{c.deviceTypes}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.frequency || "-"}{c.estimatedQuantity ? ` • ${c.estimatedQuantity}` : ""}</div>
                </td>
                <td className="px-4 py-3">
                  <select value={c.status} onChange={(e) => contractsStore.setStatus(c.id, e.target.value as ContractStatus)}
                    className={`rounded-full px-2 py-1 text-xs ${statusClass[c.status]}`}>
                    {(Object.keys(statusLabel) as ContractStatus[]).map((s) => (
                      <option key={s} value={s}>{statusLabel[s]}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => { if (confirm("حذف هذا الطلب؟")) contractsStore.remove(c.id); }}
                    className="rounded-md border border-border p-1.5 text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PasswordModal({ onClose }: { onClose: () => void }) {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-elegant">
        <h2 className="mb-4 text-xl font-bold">تغيير كلمة المرور</h2>
        <input type="password" placeholder="كلمة المرور الحالية" value={cur} onChange={(e) => setCur(e.target.value)} className="mb-2 w-full rounded-lg border border-border bg-input px-4 py-2" />
        <input type="password" placeholder="كلمة المرور الجديدة" value={next} onChange={(e) => setNext(e.target.value)} className="mb-3 w-full rounded-lg border border-border bg-input px-4 py-2" />
        {msg && <div className="mb-2 text-sm text-destructive">{msg}</div>}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-border px-4 py-2">إلغاء</button>
          <button onClick={() => {
            if (cur !== auth.getPassword()) { setMsg("كلمة المرور الحالية خاطئة"); return; }
            if (next.length < 4) { setMsg("اختر كلمة مرور أطول"); return; }
            auth.changePassword(next); onClose();
          }} className="rounded-lg bg-gradient-primary px-4 py-2 font-bold text-primary-foreground">تغيير</button>
        </div>
      </div>
    </div>
  );
}
