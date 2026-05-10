import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth } from "@/lib/products-store"; // Keeping auth from here
import { messagesStore, type ContactMessage, type MessageStatus } from "@/lib/messages-store";
import { contractsStore, type ContractRequest, type ContractStatus } from "@/lib/contracts-store";
import { Lock, Trash2, X, LogOut, KeyRound, Save, Handshake, Phone, Mail, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "لوحة التحكم — M&S Recycling" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

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
              onKeyDown={async (e) => { if (e.key === "Enter") { if (await auth.login(pw)) setAuthed(true); else setErr("كلمة مرور خاطئة"); } }}
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
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [showPwModal, setShowPwModal] = useState(false);

  useEffect(() => {
    const refresh = () => setItems(messagesStore.list());
    refresh();
    return messagesStore.subscribe(refresh);
  }, []);

  const statusLabel: Record<MessageStatus, string> = {
    new: "جديد", contacted: "تم التواصل", archived: "مؤرشف",
  };
  const statusClass: Record<MessageStatus, string> = {
    new: "bg-primary/10 text-primary border-primary/20",
    contacted: "bg-green-500/10 text-green-400 border-green-500/20",
    archived: "bg-muted/30 text-muted-foreground border-border",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">لوحة التحكم</h1>
            <p className="text-muted-foreground">إدارة رسائل العملاء وطلبات التعاقد</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setShowPwModal(true)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2.5 font-semibold hover:bg-accent transition-colors"><KeyRound className="h-4 w-4" /> تغيير الباسورد</button>
            <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2.5 font-semibold hover:bg-destructive/10 text-destructive transition-colors"><LogOut className="h-4 w-4" /> خروج</button>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4 mt-12">
          <div className="rounded-xl bg-gradient-primary p-3 shadow-glow"><MessageSquare className="h-6 w-6 text-primary-foreground" /></div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">رسائل طلبات التخلص من المخلفات</h2>
            <p className="text-sm text-muted-foreground">الواردة من الصفحة الرئيسية — {items.length} رسالة</p>
          </div>
        </div>

        <div className="mb-12 overflow-hidden rounded-xl border border-white/5 bg-gradient-card shadow-elegant">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-right text-sm">
              <thead className="bg-muted/50 text-muted-foreground font-bold">
                <tr>
                  <th className="px-6 py-4">المرسل / الشركة</th>
                  <th className="px-6 py-4">بيانات الاتصال</th>
                  <th className="px-6 py-4 w-1/3">الرسالة والتفاصيل</th>
                  <th className="px-6 py-4">التاريخ</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.length === 0 && (
                  <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">لا توجد رسائل حالياً</td></tr>
                )}
                {items.map((m) => (
                  <tr key={m.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-base">{m.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{m.company || "بدون شركة"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`tel:${m.phone}`} className="flex items-center gap-2 text-primary font-bold hover:underline" dir="ltr"><Phone className="h-3.5 w-3.5" />{m.phone}</a>
                      {m.email && <a href={`mailto:${m.email}`} className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors" dir="ltr"><Mail className="h-3.5 w-3.5" />{m.email}</a>}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">{m.message}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground" dir="ltr">
                      {new Date(m.createdAt).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" })}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={m.status}
                        onChange={(e) => messagesStore.setStatus(m.id, e.target.value as MessageStatus)}
                        className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-wider outline-none cursor-pointer shadow-sm transition-all ${statusClass[m.status]}`}
                      >
                        {(Object.keys(statusLabel) as MessageStatus[]).map((s) => (
                          <option key={s} value={s} className="bg-card text-foreground">{statusLabel[s]}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => { if (confirm("هل تريد حذف هذه الرسالة نهائياً؟")) messagesStore.remove(m.id); }} className="rounded-lg border border-border p-2.5 text-destructive hover:bg-destructive/10 transition-colors"><Trash2 className="h-4.5 w-4.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ContractsPanel />
      </div>

      {showPwModal && <PasswordModal onClose={() => setShowPwModal(false)} />}
    </div>
  );
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
                if (!await auth.login(cur)) { setMsg("كلمة المرور الحالية غير صحيحة"); return; }
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

