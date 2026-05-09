import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { productsStore, type Product } from "@/lib/products-store";
import heroImg from "@/assets/hero-electronics.jpg";
import { Phone, MessageCircle, ShoppingCart, Tag, Truck, ShieldCheck, Zap, Server, Monitor, Laptop, HardDrive } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M&S للإلكترونيات — شراء وبيع أجهزة الشركات الراكدة والمستعملة" },
      { name: "description", content: "نشتري ونبيع أجهزة الكمبيوتر واللاب توب والسيرفرات والشاشات الراكدة والمستعملة من الشركات والبنوك والمصانع. أعلى سعر، سرعة معاينة، تغطية كل مصر." },
      { property: "og:title", content: "M&S للإلكترونيات — شراء وبيع أجهزة الشركات" },
      { property: "og:description", content: "أعلى سعر للأجهزة الإلكترونية الراكدة والمستعملة. نخدم الشركات والبنوك والمصانع داخل مصر." },
    ],
  }),
  component: Index,
});

function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setProducts(productsStore.list());
    return productsStore.subscribe(() => setProducts(productsStore.list()));
  }, []);

  const sellItems = products.filter((p) => p.category === "sell").slice(0, 6);
  const buyItems = products.filter((p) => p.category === "buy").slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="أجهزة إلكترونية" width={1920} height={1080} className="h-full w-full object-cover opacity-30 animate-fade-in" />
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-blob" />
          <div className="absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
        </div>
        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold animate-fade-up animate-pulse-glow">
              <Zap className="h-3 w-3" /> أعلى سعر في السوق
            </span>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-6xl animate-fade-up delay-100">
              شركة <span className="text-gold">M&S</span> لشراء وبيع
              <br />
              <span className="text-gradient-shimmer animate-shimmer">الأجهزة الإلكترونية</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-up delay-200">
              نشتري ونبيع الأجهزة الراكدة والمستعملة والجديدة من داخل الشركات والبنوك والمصانع وجميع المؤسسات داخل مصر.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up delay-300">
              <a href="https://wa.me/message/PLVXE5WW4OAMB1" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-gradient-gold px-6 py-3 font-bold text-gold-foreground shadow-gold transition-transform hover:scale-105">
                <MessageCircle className="h-5 w-5" /> تواصل واتساب
              </a>
              <a href="tel:01011965099" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                <Phone className="h-5 w-5" /> <span dir="ltr">01011965099</span>
              </a>
              <Link to="/products" search={{ cat: "sell" }} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-6 py-3 font-semibold backdrop-blur transition-colors hover:bg-card">
                <ShoppingCart className="h-5 w-5" /> تصفح المنتجات
              </Link>
            </div>

            <div className="mt-10 hidden gap-4 md:flex animate-fade-up delay-500">
              {[Laptop, Server, Monitor, HardDrive].map((Icon, i) => (
                <div
                  key={i}
                  className="glass flex h-16 w-16 items-center justify-center rounded-2xl animate-float"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <Icon className="h-7 w-7 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two main sections: Buy / Sell */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <Link to="/products" search={{ cat: "buy" }} className="group relative overflow-hidden rounded-2xl bg-gradient-card p-8 shadow-elegant transition-all hover:-translate-y-1 hover:shadow-gold">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
            <Tag className="mb-4 h-10 w-10 text-gold" />
            <h2 className="mb-2 text-2xl font-bold">نشتري منك</h2>
            <p className="mb-4 text-muted-foreground">شراء كميات الأجهزة الراكدة والمتكهنة من الشركات والبنوك والمصانع — نجيلك لحد عندك.</p>
            <span className="font-semibold text-gold group-hover:underline">عرض ما نشتريه ←</span>
          </Link>

          <Link to="/products" search={{ cat: "sell" }} className="group relative overflow-hidden rounded-2xl bg-gradient-card p-8 shadow-elegant transition-all hover:-translate-y-1 hover:shadow-glow">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <ShoppingCart className="mb-4 h-10 w-10 text-primary" />
            <h2 className="mb-2 text-2xl font-bold">نبيع لك</h2>
            <p className="mb-4 text-muted-foreground">أجهزة كمبيوتر، لاب توب، سيرفرات، سويتشات، وشاشات — بكميات وبأسعار للجملة.</p>
            <span className="font-semibold text-primary group-hover:underline">تصفح المنتجات ←</span>
          </Link>
        </div>
      </section>

      {/* What we buy categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-2 text-center text-3xl font-bold">ما الذي نشتريه؟</h2>
        <p className="mb-10 text-center text-muted-foreground">نشتري جميع أنواع الأجهزة الإلكترونية مهما كانت الحالة</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Laptop, label: "كمبيوتر ولاب توب" },
            { icon: Server, label: "سيرفرات وسنترالات" },
            { icon: HardDrive, label: "سويتشات وشبكات" },
            { icon: Monitor, label: "شاشات بكل أنواعها" },
          ].map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className="group rounded-xl bg-gradient-card p-6 text-center shadow-elegant transition-all hover:-translate-y-2 hover:shadow-glow"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Icon className="mx-auto mb-3 h-10 w-10 text-primary transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
              <div className="font-semibold">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Tag, title: "أعلى سعر", desc: "نضمن أفضل الأسعار في السوق المصري للأجهزة بكل حالاتها." },
            { icon: Zap, title: "سرعة في المعاينة", desc: "فريق معاينة سريع يوصل لمكانك في أي محافظة." },
            { icon: ShieldCheck, title: "التزام ومصداقية", desc: "تعامل احترافي مع الشركات والبنوك والمؤسسات." },
            { icon: Truck, title: "استلام من مكانك", desc: "بنشتري من أي مكان داخل مصر، وهنجيلك لحد عندك." },
            { icon: Server, title: "كميات وجملة", desc: "نتعامل بالكميات الكبيرة ونوفر منتجات للجملة." },
            { icon: ShieldCheck, title: "خصوصية تامة", desc: "نضمن سرية البيانات عند شراء أجهزة من البنوك والمؤسسات." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl bg-gradient-card p-6 shadow-elegant">
              <Icon className="mb-3 h-8 w-8 text-gold" />
              <h3 className="mb-1 font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For sale grid */}
      {sellItems.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">منتجات معروضة للبيع</h2>
              <p className="text-muted-foreground">أجهزة جاهزة للتسليم بكميات</p>
            </div>
            <Link to="/products" search={{ cat: "sell" }} className="text-sm font-semibold text-primary hover:underline">عرض الكل ←</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sellItems.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* What we buy listings */}
      {buyItems.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">طلبات شراء حالية</h2>
              <p className="text-muted-foreground">عندنا طلبات شراء على هذه الأصناف الآن</p>
            </div>
            <Link to="/products" search={{ cat: "buy" }} className="text-sm font-semibold text-gold hover:underline">عرض الكل ←</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {buyItems.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center shadow-glow md:p-16">
          <h2 className="mb-3 text-3xl font-extrabold text-primary-foreground md:text-4xl">عندك أجهزة راكدة؟ اتصل بينا الآن</h2>
          <p className="mb-6 text-primary-foreground/80">معاينة مجانية وعرض سعر فوري — في أي مكان داخل مصر</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:01011965099" className="inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 font-bold text-foreground shadow-elegant transition-transform hover:scale-105">
              <Phone className="h-5 w-5" /> <span dir="ltr">01011965099</span>
            </a>
            <a href="https://wa.me/message/PLVXE5WW4OAMB1" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-gradient-gold px-6 py-3 font-bold text-gold-foreground shadow-gold transition-transform hover:scale-105">
              <MessageCircle className="h-5 w-5" /> واتساب مباشر
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
