import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ShoppingCart, Tag, Truck, ShieldCheck, Zap, Server, Monitor, Laptop, HardDrive, Router, PhoneCall, Cpu, Building2, Database, Recycle, Trash2, Leaf, RefreshCw, Handshake, Users, Globe, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/image.png";
import brandsEquipmentImage from "@/assets/brands-equipment.png";
import { useState } from "react";
import { messagesStore } from "@/lib/messages-store";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return alert("يرجى إدخال الاسم ورقم التليفون على الأقل.");

    messagesStore.add({
      name: form.name,
      company: form.company,
      email: form.email,
      phone: "+20 " + form.phone,
      message: form.message,
    });

    setSubmitted(true);
    setForm({ name: "", company: "", email: "", phone: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Hero */}
      <section className="relative min-h-[90vh] overflow-hidden bg-gradient-hero flex items-center">
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] animate-blob delay-500" />

        <div className="container relative mx-auto px-4 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="max-w-3xl animate-fade-up">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold animate-pulse-glow">
                <Zap className="h-4 w-4" /> أعلى سعر في السوق المصري
              </span>
              <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                شركة <span className="text-gold">M&S Recycling</span> لإعادة تدوير
                <br />
                <span className="text-gradient-shimmer animate-shimmer">المخلفات الإلكترونية</span>
              </h1>
              <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                شركة M&S Recycling هي شركة مصرية متخصصة في إدارة جميع أنواع النفايات، مع التركيز بشكل خاص على إعادة تدوير المخلفات الإلكترونية. نقدم خدمات شاملة لمعالجة النفايات الخطرة بطريقة آمنة وفعالة، مما يساهم في حماية البيئة وتعزيز الاستدامة.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://wa.me/message/PLVXE5WW4OAMB1" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-gold px-8 py-4 font-bold text-gold-foreground shadow-gold hover-lift">
                  <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-12" /> تواصل عبر واتساب
                </a>
                <a href="#contact" className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-primary px-8 py-4 font-bold text-primary-foreground shadow-primary hover-lift">
                  <ShieldCheck className="h-5 w-5 transition-transform group-hover:rotate-12" /> تخلص من مخلفاتك الآن
                </a>
                <a href="tel:01011965099" className="group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur transition-all hover:bg-white/20 hover-lift">
                  <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" /> <span dir="ltr">01011965099</span>
                </a>
              </div>
            </div>

            <div className="relative hidden animate-fade-up lg:block" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 -z-10 animate-pulse-glow rounded-full bg-gradient-to-r from-primary/20 to-gold/20 opacity-50 blur-2xl" />
              <img src={heroImage} alt="M&S Recycling Electronics" className="mx-auto w-full max-w-lg object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <style>{`
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-scroll-marquee {
          animation: scroll-marquee 35s linear infinite;
        }
      `}</style>
      <div className="relative flex overflow-hidden border-y border-white/5 bg-primary/5 py-8 group">
        <div className="animate-scroll-marquee flex whitespace-nowrap w-max group-hover:[animation-play-state:paused] transition-all">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {[
                "شراء الرواكد", "تدمير البيانات", "تجميع وإدارة المخلفات", "معالجة المخلفات وإعادة تدويرها",
                "نقل المخلفات", "تقليل الانبعاث الكربوني", "إعادة تدوير", "إيقاف مراكز البيانات", "إعادة تصنيع", "إدارة المخلفات"
              ].map((item, idx) => (
                <span key={idx} className="text-3xl font-black text-muted-foreground/60 tracking-tight flex items-center gap-12 hover:text-primary transition-colors cursor-default">
                  {item} <span className="text-gold/40 text-4xl">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <section id="contact" className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto glass rounded-[40px] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10" />

          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-4xl font-black mb-4">تخلص من مخلفات شركتك الآن</h2>
            <p className="text-muted-foreground text-lg">بخطوات بسيطة، دعنا نساعدك في إدارة وتدوير مخلفاتك الإلكترونية بشكل قانوني وآمن.</p>
          </div>

          {submitted ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-10 text-center animate-fade-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-green-500 mb-2">تم إرسال طلبك بنجاح!</h3>
              <p className="text-muted-foreground">سنتواصل معك في أقرب وقت ممكن لمناقشة التفاصيل.</p>
            </div>
          ) : (
            <form className="grid gap-6 animate-fade-up delay-100" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-2">اسمك</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" placeholder="اكتب اسمك" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-2">اسم الشركة</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} type="text" placeholder="اكتب اسم الشركة" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-2">البريد الإلكتروني</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="اكتب ايميلك" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted-foreground mb-2">رقم التليفون</label>
                  <div className="flex gap-2" dir="ltr">
                    <span className="flex items-center justify-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-bold text-muted-foreground text-sm">Egypt +20</span>
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} type="tel" placeholder="اكتب رقم تليفونك" className="flex-1 bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-right" dir="rtl" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2">الرسالة</label>
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="اكتب رسالتك وتفاصيل المخلفات..." rows={4} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
              </div>

              <button type="submit" className="w-full md:w-auto px-10 py-4 bg-gradient-primary text-primary-foreground font-black rounded-xl shadow-glow hover:scale-105 transition-transform mt-4 text-lg">
                إرسال الطلب
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-24 border-t border-white/5">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="mb-4 text-4xl font-black">ماذا نقدم في M&S Recycling ؟</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">في شركة M&S Recycling، نقدم حلولاً آمنة ومستدامة لإدارة النفايات – من التجميع والنقل إلى إعادة التدوير وكلها مصممة لحماية البيئة وخدمة عملائنا بكفاءة.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Database, title: "تدمير البيانات", desc: "التخلص من البيانات والمعلومات وفقًا للمعايير الأمنية والبيئية، وضمان عدم إمكانية الوصول إليها مرة أخرى." },
            { icon: Truck, title: "نقل المخلفات", desc: "أسطول مخصص لنقل النفايات الخطرة وغير الخطرة في جميع محافظات الجمهورية." },
            { icon: Recycle, title: "اعادة تدوير المخلفات", desc: "إعادة تدوير النفايات الإلكترونية والكهربائية والميكانيكية والمعدنية بطريقة صديقة للبيئة." },
            { icon: ShoppingCart, title: "شراء الرواكد", desc: "نقوم بمراقبة وفحص الخردة التي نشتريها بعناية لضمان جودتها ومعاييرها." },
            { icon: Trash2, title: "إدارة النفايات", desc: "جمع النفايات ومعالجتها وإعادة تدويرها بكفاءة لحماية البيئة وتعظيم الموارد." },
            { icon: Leaf, title: "انبعاثات الكربون", desc: "قلل من بصمتك البيئية عن طريق تقليل الغازات المسببة للاحتباس الحراري الضارة." },
            { icon: RefreshCw, title: "تجديد", desc: "استعادة وترقية الأجهزة المستخدمة لتعمل وكأنها جديدة مع كامل الوظائف والموثوقية." },
            { icon: ShieldCheck, title: "حماية العلامة التجارية", desc: "حماية اسمك وشعارك وسمعتك ضد سوء الاستخدام والتزوير والمنافسة غير العادلة." },
          ].map(({ icon: Icon, title, desc }, idx) => (
            <div key={title} className={`glass p-8 rounded-3xl text-center hover-lift animate-fade-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="mx-auto mb-6 inline-flex p-4 rounded-2xl bg-white/5 text-primary group-hover:scale-110 transition-transform">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 font-bold text-xl">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Stats Section */}
      <section className="bg-white/2 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-up">
            <h2 className="mb-6 text-4xl font-black text-gold">رسالة الشركة</h2>
            <p className="text-xl leading-relaxed text-muted-foreground">
              في شركة M&S Recycling، نلتزم بالقضاء على الآثار الضارة للنفايات الإلكترونية في مصر، مع تعزيز الممارسات المستدامة في إدارة النفايات الصلبة والخطرة. هدفنا هو حماية البيئة، ودعم الصحة العامة، والمساهمة في رحلة مصر نحو مستقبل أكثر خضرة واستدامة.
            </p>
          </div>

          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl font-black">أرقام تستحق الذكر...</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "٧ سنين", desc: "بخبرة تمتد لأكثر من سبع سنوات، نوفر حلولاً مبتكرة وفعّالة في إدارة وإعادة تدوير المخلفات." },
              { title: "+ ٥،٥٠٠ طن", desc: "من المخلفات، ساهمنا في تحويل آلاف الأطنان إلى موارد قيمة، وتقليل الأثر البيئي بشكل ملموس." },
              { title: "+ ٢٠٠ شريك", desc: "أكثر من ٢٠٠ شركة ومؤسسة اختارت M&S Recycling كشريك موثوق لإدارة مخلفاتها وتحقيق أهداف الاستدامة." },
            ].map(({ title, desc }, idx) => (
              <div key={title} className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent animate-fade-up text-center" style={{ animationDelay: `${idx * 0.1}s` }}>
                <h3 className="mb-4 text-4xl font-black text-primary" dir="ltr">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-24 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass p-10 rounded-3xl animate-fade-up">
            <h3 className="text-2xl font-bold mb-4 text-gold">M&S Recycling لإدارة المخلفات الخطرة والغير خطرة</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              نقدم حلول متكاملة وآمنة لإدارة جميع أنواع المخلفات، بدءًا من الجمع والنقل وحتى المعالجة وإعادة التدوير، وفق أعلى معايير السلامة والامتثال البيئي.
            </p>
          </div>
          <div className="glass p-10 rounded-3xl animate-fade-up delay-100">
            <h3 className="text-2xl font-bold mb-4 text-primary">التخلص الآمن من المخلفات الخطرة</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              تساعد M&S Recycling الشركات والمجتمعات على تحويل المخلفات إلى موارد من خلال حلول إعادة التدوير المعتمدة. من الجمع والفرز إلى المعالجة الصديقة للبيئة، نضمن إدارة المخلفات بأمان وتقليل المدافن وخفض الانبعاثات الكربونية ودعم الاقتصاد الدائري.
            </p>
          </div>
        </div>
      </section>

      {/* Brands & Equipment Section */}
      <section className="bg-white/2 py-24 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-black mb-4">ماركات وأجهزة نتعامل معها</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">نستقبل ونتعامل مع كافة أنواع المعدات الإلكترونية، شبكات، سيرفرات، أجهزة كمبيوتر، وأنظمة اتصالات من مختلف العلامات التجارية العالمية.</p>
          </div>
          <div className="glass rounded-[40px] p-4 md:p-12 animate-fade-up delay-100 flex justify-center items-center overflow-hidden">
            <img src={brandsEquipmentImage} alt="Brands and Equipment" className="w-full max-w-5xl h-auto rounded-2xl object-contain drop-shadow-xl hover:scale-[1.02] transition-transform duration-500 bg-white" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-primary p-12 md:p-20 text-center shadow-glow animate-fade-up">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h2 className="relative mb-6 text-4xl font-black text-primary-foreground md:text-5xl">هل لديك مخلفات إلكترونية للتدوير؟</h2>
          <p className="relative mb-10 text-xl text-primary-foreground/80 max-w-2xl mx-auto">معاينة مجانية، تقييم عادل، والتزام كامل بحماية البيئة. انضم لقائمة عملائنا من كبرى الشركات والبنوك.</p>
          <div className="relative flex flex-wrap justify-center gap-4">
            <a href="tel:01011965099" className="inline-flex items-center gap-3 rounded-2xl bg-primary-foreground px-10 py-5 font-black text-primary shadow-2xl hover-lift">
              <Phone className="h-6 w-6" /> اتصل بنا الآن
            </a>
            <a href="https://wa.me/message/PLVXE5WW4OAMB1" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-2xl bg-gold px-10 py-5 font-black text-gold-foreground shadow-2xl hover-lift">
              <MessageCircle className="h-6 w-6" /> واتساب مباشر
            </a>
            <a href="#contact" className="inline-flex items-center gap-3 rounded-2xl bg-white/20 border border-white/30 px-10 py-5 font-black text-white backdrop-blur shadow-2xl hover-lift">
              <ShieldCheck className="h-6 w-6" /> تخلص من مخلفاتك
            </a>
          </div>
        </div>
      </section>
    </div>

  );
}

export default Index;

