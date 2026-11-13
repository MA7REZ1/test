import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Globe,
  Leaf,
  ShieldCheck,
  Zap,
  Factory,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Header */}
      <section className="relative bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5" /> العودة للرئيسية
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">من نحن</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            شركة M&S Recycling - شريكك الموثوق في إعادة تدوير المخلفات الإلكترونية في مصر
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Mission & Vision */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-8 border-r-4 border-primary">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-primary/20 rounded-2xl">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-primary">رسالتنا</h2>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                في شركة M&S Recycling، نلتزم بالقضاء على الآثار الضارة للنفايات الإلكترونية في مصر،
                مع تعزيز الممارسات المستدامة في إدارة النفايات الصلبة والخطرة. هدفنا هو حماية
                البيئة، ودعم الصحة العامة، والمساهمة في رحلة مصر نحو مستقبل أكثر خضرة واستدامة.
              </p>
            </div>

            <div className="glass rounded-3xl p-8 border-r-4 border-gold">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-gold/20 rounded-2xl">
                  <Eye className="h-8 w-8 text-gold" />
                </div>
                <h2 className="text-2xl font-bold text-gold">رؤيتنا</h2>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                أن نكون الشركة الرائدة في إعادة تدوير المخلفات الإلكترونية في مصر والشرق الأوسط، من
                خلال تقديم حلول مبتكرة ومستدامة تحمي البيئة وتدعم الاقتصاد الدائري، مع الحفاظ على
                أعلى معايير الجودة والسلامة.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8 text-center">أرقامنا تتحدث عنا</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Factory, value: "١٠ + سنين", label: "خبرة في السوق", color: "primary" },
              { icon: Users, value: "١٢٠٠+شريك", label: "شريك موثوق", color: "gold" },
              { icon: Globe, value: "٢٧ محافظة", label: "تغطية جغرافية", color: "primary" },
              { icon: Leaf, value: "٩٥،٥٠٠ +طن", label: "مخلفات معاد تدويرها", color: "gold" },
            ].map(({ icon: Icon, value, label, color }, idx) => (
              <div key={label} className="glass rounded-2xl p-6 text-center hover-lift">
                <div className={`p-4 bg-${color}/20 rounded-2xl mx-auto mb-4 w-fit`}>
                  <Icon className={`h-8 w-8 text-${color}`} />
                </div>
                <h3 className="text-3xl font-black mb-2" dir="ltr">
                  {value}
                </h3>
                <p className="text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8 text-center">قيمنا</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "الالتزام والنزاهة",
                desc: "نلتزم بأعلى معايير الأخلاقيات والشفافية في جميع تعاملاتنا.",
              },
              {
                icon: Leaf,
                title: "حماية البيئة",
                desc: "نضع البيئة في قمة أولوياتنا في كل قرار نتخذه.",
              },
              {
                icon: Zap,
                title: "الابتكار المستمر",
                desc: "نسعى دائماً لتبني أحدث التقنيات والحلول المبتكرة.",
              },
              {
                icon: Users,
                title: "العملاء أولاً",
                desc: "نركز على تلبية احتياجات عملائنا وتجاوز توقعاتهم.",
              },
              {
                icon: Award,
                title: "الجودة والتميز",
                desc: "نضمن جودة خدماتنا من خلال الامتثال للمعايير الدولية.",
              },
              {
                icon: Heart,
                title: "المسؤولية المجتمعية",
                desc: "نساهم في المجتمع من خلال مبادرات مستدامة وتوعوية.",
              },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <div key={title} className="glass rounded-2xl p-6 hover-lift">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-black mb-6 text-gold">قصتنا</h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                تأسست شركة M&S Recycling برؤية واضحة: معالجة التحدي المتزايد للمخلفات الإلكترونية في
                مصر بطريقة آمنة ومستدامة. بدأنا كفريق صغير متحمس، واليوم نحن فخورون بأن نكون شريكاً
                موثوقاً لأكثر من 1200 شركة ومؤسسة في جميع أنحاء مصر.
              </p>
              <p>
                على مدار السنوات العشر الماضية، قمنا بتطوير عملياتنا وتوسيع قدراتنا، مما سمح لنا
                بمعالجة أكثر من 95,500 طن من المخلفات الإلكترونية. نحن نستخدم أحدث التقنيات ونتبع
                أعلى معايير السلامة والبيئة لضمان أن كل عملية تدوير تتم بشكل مسؤول وفعال.
              </p>
              <p>
                نحن نؤمن بأن إعادة التدوير ليست مجرد عمل تجاري، بل هي مسؤولية تجاه البيئة والمجتمع.
                لذلك نعمل باستمرار على تحسين خدماتنا وتوسيع نطاق عملنا لخدمة المزيد من الشركات
                والمؤسسات في رحلة مصر نحو مستقبل أكثر استدامة.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-8 text-center">لماذا تختار M&S Recycling؟</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "أعلى سعر في السوق المصري للخردة الإلكترونية",
              "سرعة في المعاينة والتقييم",
              "استلام من أي مكان في جميع محافظات مصر",
              "التزام كامل بالمعايير البيئية والسلامة",
              "تدمير آمن للبيانات وفق المعايير الدولية",
              "شهادات رسمية للتخلص الآمن من المخلفات",
              "فريق عمل متخصص ومدرب",
              "دعم فني واستشارات مجانية",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                <div className="p-2 bg-gold/20 rounded-lg shrink-0">
                  <Zap className="h-5 w-5 text-gold" />
                </div>
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-3xl p-8 md:p-12 bg-gradient-to-r from-primary/10 to-gold/10 text-center">
          <h2 className="text-3xl font-black mb-4">هل أنت جاهز للانضمام إلينا؟</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            انضم لقائمة عملائنا من كبرى الشركات والبنوك والمؤسسات في مصر، ودعنا نساعدك في إدارة
            مخلفاتك الإلكترونية بشكل آمن ومستدام.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:01011965099"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-primary px-8 py-4 font-bold text-primary-foreground shadow-glow hover-lift"
            >
              اتصل بنا الآن
            </a>
            <a
              href="https://wa.me/message/PLVXE5WW4OAMB1"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-gold px-8 py-4 font-bold text-gold-foreground shadow-gold hover-lift"
            >
              واتساب مباشر
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
