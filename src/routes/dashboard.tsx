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
  const [authed, setAuthed] = useState(() => auth.isAuthed());
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  if (!authed) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto flex max-w-md flex-col px-4 py-20">
          <div className="rounded-2xl bg-gradient-card p-8 shadow-elegant border border-white/5">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-gradient-primary p-3 shadow-glow"><Lock className="h-6 w-6 text-primary-foreground" /></div>
              <div>
                <h1 className="text-2xl font-bold">لوحة التحكم</h1>
                <p className="text-sm text-muted-foreground">أدخل كلمة المرور للوصول</p>
              </div>
            </div>
            <input 
              type="password" 
              value={pw} 
              onChange={(e) => setPw(e.target.value)} 
              onKeyDown={(e) => { if (e.key === "Enter") { if (auth.login(pw)) setAuthed(true); else setErr("كلمة مرور خاطئة"); } }}
              placeholder="كلمة المرور" 
              className="mb-3 w-full rounded-lg border border-border bg-input px-4 py-3 outline-none focus:border-primary text-foreground" 
            />
            {err && <div className="mb-3 text-sm text-destructive">{err}</div>}
            <button 
              onClick={async () => { 
                if (await auth.login(pw)) setAuthed(true); 
                else setErr("كلمة مرور خاطئة"); 
              }} 
              className="w-full rounded-lg bg-gradient-primary px-4 py-3 font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
            >
              دخول
            </button>

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
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">لوحة التحكم</h1>
            <p className="text-muted-foreground">إدارة المنتجات وطلبات التعاقد — {items.length} عنصر</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setEditing(emptyProduct())} className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2.5 font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 active:scale-95"><Plus className="h-4 w-4" /> إضافة منتج</button>
            <button onClick={() => setShowPwModal(true)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2.5 font-semibold hover:bg-accent transition-colors"><KeyRound className="h-4 w-4" /> تغيير الباسورد</button>
            <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2.5 font-semibold hover:bg-destructive/10 text-destructive transition-colors"><LogOut className="h-4 w-4" /> خروج</button>
          </div>
        </div>

        <div className="mb-12 overflow-hidden rounded-xl border border-white/5 bg-gradient-card shadow-elegant">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-muted/50 text-muted-foreground font-bold">
                <tr>
                  <th className="px-6 py-4">المنتج</th>
                  <th className="px-6 py-4">القسم</th>
                  <th className="px-6 py-4">الكمية</th>
                  <th className="px-6 py-4">السعر</th>
                  <th className="px-6 py-4">الصور</th>
                  <th className="px-6 py-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.length === 0 && (
                  <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">لا توجد عناصر حالياً — أضف منتجك الأول</td></tr>
                )}
                {items.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-semibold">{p.title}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${p.category === "buy" ? "bg-gold/10 text-gold border border-gold/20" : "bg-primary/10 text-primary border border-primary/20"}`}>{p.category === "buy" ? "نشتري" : "نبيع"}</span>
                    </td>
                    <td className="px-6 py-4">{p.quantity.toLocaleString("ar-EG")}</td>
                    <td className="px-6 py-4">{p.price ? `${p.price.toLocaleString("ar-EG")} ج.م` : "-"}</td>
                    <td className="px-6 py-4">
                       <div className="flex -space-x-2 space-x-reverse">
                          {p.images.slice(0, 3).map((img, i) => (
                            <img key={i} src={img} className="h-8 w-8 rounded-full border-2 border-background object-cover shadow-sm" alt="" />
                          ))}
                          {p.images.length > 3 && <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-bold">+{p.images.length - 3}</div>}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditing({ ...p })} className="rounded-lg border border-border p-2 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => { if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) productsStore.remove(p.id); }} className="rounded-lg border border-border p-2 text-destructive hover:bg-destructive/10 transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 overflow-y-auto" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative my-auto w-full max-w-2xl rounded-2xl bg-card p-8 shadow-2xl border border-white/10 animate-fade-up">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{product.title ? "تعديل بيانات المنتج" : "إضافة منتج جديد"}</h2>
          <button onClick={onClose} className="rounded-full bg-muted p-2 hover:bg-accent transition-colors"><X className="h-5 w-5" /></button>
        </div>

        <div className="space-y-5">
          <Field label="اسم المنتج"><input value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} className="modern-input" placeholder="مثال: لاب توب Dell Latitude" /></Field>
          <Field label="وصف موجز للمنتج"><textarea value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} rows={3} className="modern-input" placeholder="اكتب تفاصيل المنتج هنا..." /></Field>
          
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="التصنيف">
              <select value={p.category} onChange={(e) => setP({ ...p, category: e.target.value as ProductCategory })} className="modern-input">
                <option value="sell">متاح للبيع (نبيع)</option>
                <option value="buy">مطلوب للشراء (نشتري)</option>
              </select>
            </Field>
            <Field label="حالة المنتج"><input value={p.condition || ""} onChange={(e) => setP({ ...p, condition: e.target.value })} placeholder="مستعمل / جديد / تكهين" className="modern-input" /></Field>
            <Field label="الكمية المتاحة"><input type="number" min={1} value={p.quantity} onChange={(e) => setP({ ...p, quantity: Number(e.target.value) })} className="modern-input" /></Field>
            <Field label="السعر التقديري (ج.م)"><input type="number" min={0} value={p.price ?? ""} onChange={(e) => setP({ ...p, price: e.target.value ? Number(e.target.value) : undefined })} placeholder="اتركه فارغاً للتفاوض" className="modern-input" /></Field>
          </div>

          <Field label={`معرض الصور (${p.images.length})`}>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {p.images.map((src, i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-white/5 bg-muted shadow-sm">
                  <img src={src} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                  <button onClick={() => setP({ ...p, images: p.images.filter((_, j) => j !== i) })} className="absolute right-1 top-1 rounded-full bg-destructive p-1.5 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
                </div>
              ))}
              <button onClick={() => fileRef.current?.click()} className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="text-center">
                  <ImagePlus className="mx-auto h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          </Field>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-white/5 pt-6">
          <button onClick={onClose} className="rounded-lg border border-border px-6 py-2.5 font-semibold hover:bg-accent transition-colors">إلغاء</button>
          <button onClick={() => onSave(p)} disabled={!p.title.trim()} className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-8 py-2.5 font-bold text-primary-foreground shadow-glow disabled:opacity-50 transition-all hover:brightness-110 active:scale-95"><Save className="h-4 w-4" /> حفظ البيانات</button>
        </div>
      </div>
      <style>{`.modern-input { width: 100%; border-radius: .75rem; border: 1px solid var(--border); background: var(--input); padding: .75rem 1rem; outline: none; color: inherit; transition: all 0.2s; } .modern-input:focus { border-color: var(--primary); box-shadow: 0 0 0 2px oklch(var(--primary-rgb) / 0.1); }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-muted-foreground">{label}</span>{children}</label>;
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
    new: "bg-primary/10 text-primary border-primary/20",
    contacted: "bg-gold/10 text-gold border-gold/20",
    signed: "bg-green-500/10 text-green-400 border-green-500/20",
    rejected: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <div className="mt-12">
      <div className="mb-6 flex items-center gap-4">
        <div className="rounded-xl bg-gradient-gold p-3 shadow-glow"><Handshake className="h-6 w-6 text-gold-foreground" /></div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">طلبات التعاقد الدائم</h2>
          <p className="text-sm text-muted-foreground">الشركات والمؤسسات المهتمة بتوريد أجهزة دورية — {items.length} طلب</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/5 bg-gradient-card shadow-elegant">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-right text-sm">
            <thead className="bg-muted/50 text-muted-foreground font-bold">
              <tr>
                <th className="px-6 py-4">الجهة / الشركة</th>
                <th className="px-6 py-4">مسؤول التواصل</th>
                <th className="px-6 py-4">بيانات الاتصال</th>
                <th className="px-6 py-4">الأجهزة والدورية</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.length === 0 && (
                <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">لا توجد طلبات تعاقد حالياً</td></tr>
              )}
              {items.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-base">{c.companyName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.sector || "قطاع غير محدد"}{c.governorate ? ` • ${c.governorate}` : ""}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{c.contactName}</div>
                    <div className="text-xs text-muted-foreground">{c.position || "-"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-primary font-bold hover:underline" dir="ltr"><Phone className="h-3.5 w-3.5" />{c.phone}</a>
                    {c.email && <a href={`mailto:${c.email}`} className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors" dir="ltr"><Mail className="h-3.5 w-3.5" />{c.email}</a>}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="line-clamp-2 text-xs font-medium leading-relaxed">{c.deviceTypes}</div>
                    <div className="mt-1.5 flex gap-2 text-[10px] font-bold text-muted-foreground">
                      <span className="bg-muted px-2 py-0.5 rounded">{c.frequency || "غير محدد"}</span>
                      {c.estimatedQuantity && <span className="bg-muted px-2 py-0.5 rounded">الكمية: {c.estimatedQuantity}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={c.status} 
                      onChange={(e) => contractsStore.setStatus(c.id, e.target.value as ContractStatus)}
                      className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider outline-none cursor-pointer shadow-sm transition-all ${statusClass[c.status]}`}
                    >
                      {(Object.keys(statusLabel) as ContractStatus[]).map((s) => (
                        <option key={s} value={s} className="bg-card text-foreground">{statusLabel[s]}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => { if (confirm("هل تريد حذف هذا الطلب نهائياً؟")) contractsStore.remove(c.id); }}
                      className="rounded-lg border border-border p-2.5 text-destructive hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PasswordModal({ onClose }: { onClose: () => void }) {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-card p-8 shadow-2xl border border-white/10 animate-fade-up">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">تغيير كلمة المرور</h2>
        {success ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-500"><Save className="h-6 w-6" /></div>
            <p className="text-lg font-bold">تم التغيير بنجاح</p>
            <button onClick={onClose} className="mt-6 w-full rounded-lg bg-primary px-4 py-2.5 font-bold text-primary-foreground">إغلاق</button>
          </div>
        ) : (
          <div className="space-y-4">
            <input type="password" placeholder="كلمة المرور الحالية" value={cur} onChange={(e) => setCur(e.target.value)} className="modern-input" />
            <input type="password" placeholder="كلمة المرور الجديدة" value={next} onChange={(e) => setNext(e.target.value)} className="modern-input" />
            {msg && <div className="text-xs font-bold text-destructive px-1">{msg}</div>}
            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="flex-1 rounded-lg border border-border py-2.5 font-semibold hover:bg-accent transition-colors">إلغاء</button>
              <button onClick={async () => {
                if (await hashPassword(cur) !== auth.getStoredHash()) { setMsg("كلمة المرور الحالية غير صحيحة"); return; }
                if (next.length < 4) { setMsg("كلمة مرور جديدة قصيرة جداً"); return; }
                await auth.changePassword(next); setSuccess(true);
              }} className="flex-1 rounded-lg bg-gradient-primary py-2.5 font-bold text-primary-foreground shadow-glow active:scale-95 transition-all">تحديث</button>
            </div>
          </div>
        )}
      </div>
      <style>{`.modern-input { width: 100%; border-radius: .75rem; border: 1px solid var(--border); background: var(--input); padding: .75rem 1rem; outline: none; color: inherit; } .modern-input:focus { border-color: var(--primary); }`}</style>
    </div>
  );
}
