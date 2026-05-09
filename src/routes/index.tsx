import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ShoppingCart, Tag, Truck, ShieldCheck, Zap, Server, Monitor, Laptop, HardDrive } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Hero */}
      <section className="relative min-h-[90vh] overflow-hidden bg-gradient-hero flex items-center">
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] animate-blob delay-500" />
        
        <div className="container relative mx-auto px-4 py-20">
          <div className="max-w-3xl animate-fade-up">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold animate-pulse-glow">
              <Zap className="h-4 w-4" /> أعلى سعر في السوق المصري
            </span>
            <h1 className="mb-6 text-5xl font-black leading-tight md:text-7xl tracking-tight">
              شركة <span className="text-gold">M&S</span> لشراء وبيع
              <br />
              <span className="text-gradient-shimmer animate-shimmer">الأجهزة الإلكترونية</span>
            </h1>
            <p className="mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
              نحن المتخصصون في إعادة تدوير وتجارة الأجهزة الراكدة والمستعملة من الشركات والبنوك والمصانع. نضمن لك أعلى تقييم مالي وأسرع تنفيذ.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://wa.me/message/PLVXE5WW4OAMB1" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-gold px-8 py-4 font-bold text-gold-foreground shadow-gold hover-lift">
                <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-12" /> تواصل عبر واتساب
              </a>
              <a href="tel:01011965099" className="group inline-flex items-center gap-3 rounded-2xl bg-white/10 border border-white/20 px-8 py-4 font-bold text-white backdrop-blur hover:bg-white/20 transition-all hover-lift">
                <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" /> <span dir="ltr">01011965099</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Actions: Buy / Sell */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <Link to="/products?category=buy" className="group glass p-10 rounded-3xl hover-lift animate-fade-up delay-100">
            <div className="mb-6 inline-flex p-4 rounded-2xl bg-gold/10 text-gold">
              <Tag className="h-10 w-10" />
            </div>
            <h2 className="mb-4 text-3xl font-bold">نشتري منك</h2>
            <p className="mb-6 text-muted-foreground text-lg">نشتري كميات الأجهزة الراكدة والمتكهنة من الشركات، البنوك، والمصانع. نصل إليك في أي مكان في مصر.</p>
            <span className="inline-flex items-center gap-2 font-bold text-gold group-hover:gap-4 transition-all">
              شاهد قائمة ما نشتريه <span className="text-2xl">←</span>
            </span>
          </Link>

          <Link to="/products?category=sell" className="group glass p-10 rounded-3xl hover-lift animate-fade-up delay-200">
            <div className="mb-6 inline-flex p-4 rounded-2xl bg-primary/10 text-primary">
              <ShoppingCart className="h-10 w-10" />
            </div>
            <h2 className="mb-4 text-3xl font-bold">نبيع لك</h2>
            <p className="mb-6 text-muted-foreground text-lg">نوفر أفضل أجهزة الكمبيوتر، اللاب توب، والسيرفرات بأسعار الجملة وبكميات تناسب احتياجاتك.</p>
            <span className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all">
              تصفح الأجهزة المتاحة <span className="text-2xl">←</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-24 border-t border-white/5">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="mb-4 text-4xl font-black">ما الذي نشتريه؟</h2>
          <p className="text-muted-foreground text-lg">نغطي كافة التخصصات الإلكترونية بأعلى دقة في التقييم</p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { icon: Laptop, label: "أجهزة اللاب توب", desc: "جميع الموديلات" },
            { icon: Server, label: "السيرفرات والشبكات", desc: "بنيتك التحتية" },
            { icon: HardDrive, label: "السويتشات والتخزين", desc: "حلول متكاملة" },
            { icon: Monitor, label: "الشاشات والمعدات", desc: "بكافة أنواعها" },
          ].map(({ icon: Icon, label, desc }, idx) => (
            <div key={label} className={`glass p-8 rounded-3xl text-center hover-lift animate-fade-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="mx-auto mb-6 inline-flex p-4 rounded-2xl bg-white/5 text-primary group-hover:scale-110 transition-transform">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 font-bold text-xl">{label}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us: Trust Indicators */}
      <section className="bg-white/2 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Tag, title: "أعلى سعر تقييم", desc: "نمتلك خبرة واسعة تتيح لنا تقديم أفضل عرض مالي في السوق المصري." },
              { icon: Zap, title: "تنفيذ فوري وسريع", desc: "فريق المعاينة مجهز للتحرك فوراً وإتمام الصفقة في وقت قياسي." },
              { icon: ShieldCheck, title: "أمان ومصداقية", desc: "تعامل رسمي وقانوني مع كافة المؤسسات، مع ضمان مسح البيانات الحساسة." },
              { icon: Truck, title: "خدمة التوصيل", desc: "نتحمل كافة تكاليف النقل والخدمات اللوجستية من مقركم." },
              { icon: Server, title: "تخصص في الجملة", desc: "قدرة على استيعاب وتوريد أكبر الكميات المطلوبة في السوق." },
              { icon: ShieldCheck, title: "التزام كامل", desc: "نحن شركاؤكم في النجاح، نلتزم بالمواعيد والاتفاقات بدقة متناهية." },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <div key={title} className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <Icon className="mb-6 h-10 w-10 text-gold" />
                <h3 className="mb-3 text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-primary p-12 md:p-20 text-center shadow-glow animate-fade-up">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h2 className="relative mb-6 text-4xl font-black text-primary-foreground md:text-5xl">هل لديك أجهزة راكدة؟</h2>
          <p className="relative mb-10 text-xl text-primary-foreground/80 max-w-2xl mx-auto">معاينة مجانية، تقييم عادل، ودفع فوري. انضم لقائمة عملائنا من كبرى الشركات والبنوك.</p>
          <div className="relative flex flex-wrap justify-center gap-4">
            <a href="tel:01011965099" className="inline-flex items-center gap-3 rounded-2xl bg-primary-foreground px-10 py-5 font-black text-primary shadow-2xl hover-lift">
              <Phone className="h-6 w-6" /> اتصل بنا الآن
            </a>
            <a href="https://wa.me/message/PLVXE5WW4OAMB1" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-2xl bg-gold px-10 py-5 font-black text-gold-foreground shadow-2xl hover-lift">
              <MessageCircle className="h-6 w-6" /> واتساب مباشر
            </a>
          </div>
        </div>
      </section>
    </div>

  );
}

export default Index;
