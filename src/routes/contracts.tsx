import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { contractsStore } from "@/lib/contracts-store";
import { Handshake, CheckCircle2, Building2, Repeat, ShieldCheck, Phone, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contracts")({
  head: () => ({
    meta: [
      { title: "تعاقد مستمر — M&S Recycling لشراء الأجهزة الإلكترونية" },
      { name: "description", content: "تعاقد مع M&S Recycling لشراء أجهزتكم الراكدة والمستعملة باستمرار: بنوك، مصانع، شركات ومؤسسات. أعلى سعر، استلام دوري، التزام تام." },
    ],
  }),
  component: ContractsPage,
});

const schema = z.object({
  companyName: z.string().trim().min(2, "اسم الشركة مطلوب").max(120),
  contactName: z.string().trim().min(2, "اسم المسؤول مطلوب").max(80),
  position: z.string().trim().max(80).optional(),
  phone: z.string().trim().min(8, "رقم الهاتف مطلوب").max(20),
  email: z.string().trim().email("بريد غير صالح").max(120).optional().or(z.literal("")),
  governorate: z.string().trim().max(60).optional(),
  address: z.string().trim().max(200).optional(),
  sector: z.string().trim().max(60).optional(),
  deviceTypes: z.string().trim().min(2, "اذكر أنواع الأجهزة").max(500),
  estimatedQuantity: z.string().trim().max(60).optional(),
  frequency: z.string().trim().max(60).optional(),
  notes: z.string().trim().max(1000).optional(),
});

function ContractsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    contractsStore.add({
      companyName: parsed.data.companyName,
      contactName: parsed.data.contactName,
      position: parsed.data.position,
      phone: parsed.data.phone,
      email: parsed.data.email || undefined,
      governorate: parsed.data.governorate,
      address: parsed.data.address,
      sector: parsed.data.sector,
      deviceTypes: parsed.data.deviceTypes,
      estimatedQuantity: parsed.data.estimatedQuantity,
      frequency: parsed.data.frequency,
      notes: parsed.data.notes,
    });
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm text-primary">
              <Handshake className="h-4 w-4" />
              تعاقد مستمر مع الشركات
            </div>
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
              اتفاقية شراء دائمة لأجهزتكم الراكدة والمستعملة
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              نوفّر للبنوك والمصانع والشركات والمؤسسات اتفاقية تعاقد مستمر لشراء الأجهزة الإلكترونية بشكل دوري — أعلى سعر،
              استلام منتظم من مقركم، وإجراءات تكهين موثقة.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              { icon: Building2, title: "موجّه للمؤسسات", text: "بنوك، مصانع، شركات، مستشفيات وفنادق." },
              { icon: Repeat, title: "استلام دوري", text: "جدول معاينة واستلام شهري أو حسب الحاجة." },
              { icon: ShieldCheck, title: "إجراءات موثقة", text: "محاضر استلام وتكهين رسمية لكل عملية." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card/60 p-5">
                <f.icon className="mb-3 h-6 w-6 text-primary" />
                <div className="mb-1 font-bold">{f.title}</div>
                <div className="text-sm text-muted-foreground">{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Benefits */}
      <section className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[1fr_1.2fr]">
        <aside className="space-y-6">
          <div className="rounded-2xl bg-gradient-card p-6 shadow-elegant">
            <h2 className="mb-3 text-xl font-bold">مزايا التعاقد معنا</h2>
            <ul className="space-y-3 text-sm">
              {[
                "أعلى سعر شراء مضمون مقارنة بالسوق.",
                "أولوية في المعاينة والاستلام للعملاء المتعاقدين.",
                "عقد مكتوب يحدد آلية التسعير والاستلام والدفع.",
                "محاضر تكهين واستلام رسمية تحفظ حقوق الجهة.",
                "سرية تامة لبيانات الأجهزة (مسح آمن للبيانات عند الطلب).",
                "تغطية لكل محافظات جمهورية مصر العربية.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border p-6">
            <h3 className="mb-3 font-bold">تواصل مباشر</h3>
            <div className="space-y-2 text-sm">
              <a href="tel:01011965099" className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4 text-primary" />
                <span dir="ltr">01011965099</span>
              </a>
              <a href="https://wa.me/message/PLVXE5WW4OAMB1" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary">
                <MessageCircle className="h-4 w-4 text-primary" />
                واتساب مباشر
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              يمكنكم أيضًا تصفّح <Link to="/products" search={{ cat: "buy" }} className="text-primary hover:underline">قائمة ما نشتريه</Link>.
            </p>
          </div>
        </aside>

        <div className="rounded-2xl bg-gradient-card p-6 shadow-elegant md:p-8">
          <h2 className="mb-1 text-2xl font-bold">طلب تعاقد</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            املأ البيانات وسيتواصل معك فريق المبيعات خلال 24 ساعة لإتمام الاتفاقية.
          </p>

          {submitted && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <div className="font-bold text-primary">تم استلام طلبكم بنجاح</div>
                <div className="text-muted-foreground">سنتواصل معكم قريبًا لمناقشة تفاصيل التعاقد.</div>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
            <Field name="companyName" label="اسم الشركة *" error={errors.companyName} />
            <Field name="sector" label="نشاط الشركة" placeholder="بنك / مصنع / شركة..." />
            <Field name="contactName" label="اسم المسؤول *" error={errors.contactName} />
            <Field name="position" label="المسمى الوظيفي" />
            <Field name="phone" label="رقم الهاتف *" type="tel" error={errors.phone} dir="ltr" />
            <Field name="email" label="البريد الإلكتروني" type="email" error={errors.email} dir="ltr" />
            <Field name="governorate" label="المحافظة" />
            <Field name="address" label="العنوان" />
            <div className="md:col-span-2">
              <Field name="deviceTypes" label="أنواع الأجهزة المتاحة *" textarea error={errors.deviceTypes}
                placeholder="مثال: لاب توب، كمبيوترات، سيرفرات، سويتشات، شاشات..." />
            </div>
            <Field name="estimatedQuantity" label="كمية تقديرية" placeholder="مثال: 50 جهاز شهريًا" />
            <div>
              <label className="mb-1 block text-sm font-semibold">دورية الاستلام</label>
              <select name="frequency" defaultValue=""
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <option value="">اختر...</option>
                <option value="شهري">شهري</option>
                <option value="ربع سنوي">ربع سنوي</option>
                <option value="نصف سنوي">نصف سنوي</option>
                <option value="سنوي">سنوي</option>
                <option value="حسب الطلب">حسب الطلب</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Field name="notes" label="ملاحظات إضافية" textarea />
            </div>

            <div className="md:col-span-2">
              <button type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]">
                <Handshake className="h-5 w-5" />
                إرسال طلب التعاقد
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                بإرسالك الطلب فأنت توافق على تواصل فريق M&S Recycling معك بشأن تفاصيل التعاقد.
              </p>
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}

function Field({
  name, label, type = "text", textarea = false, placeholder, error, dir,
}: {
  name: string; label: string; type?: string; textarea?: boolean;
  placeholder?: string; error?: string; dir?: "ltr" | "rtl";
}) {
  const cls = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none";
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">{label}</label>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} rows={3} className={cls} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} dir={dir} className={cls} />
      )}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

