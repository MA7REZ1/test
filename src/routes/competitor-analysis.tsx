import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Shield,
  Award,
  Users,
  Factory,
  Globe,
  FileText,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/competitor-analysis")({
  component: CompetitorAnalysis,
});

function CompetitorAnalysis() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Header */}
      <section className="relative bg-gradient-hero py-16">
        <div className="container mx-auto px-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5" /> العودة للرئيسية
          </a>
          <h1 className="text-4xl md:text-5xl font-black mb-4">📊 الدراسة التنافسية</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            تحليل شامل لشركات EERC و Energy Co المنافسة في سوق إعادة تدوير المخلفات الإلكترونية في
            مصر
          </p>
          <p className="text-sm text-muted-foreground mt-2">تم التحديث: 13 نوفمبر 2026</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Executive Summary */}
        <div className="mb-12">
          <div className="glass rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-black mb-8 text-gold">📋 الملخص التنفيذي</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* EERC Summary */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-green-500">EERC - الشركة الأكثر نضجاً</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>تأسست 2016 (10 سنوات خبرة)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>530+ عميل محلي ودولي</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>4 شهادات ISO (بما في ذلك 27001)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>شراكات دولية (BitRaser, CEDARE)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>محتوى غني (أخبار، فيديوهات، ملفات)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>تواصل سهل (مساعد ذكي، واتساب)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <span>لا تخصص في البطاريات</span>
                  </li>
                </ul>
              </div>

              {/* Energy Co Summary */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Factory className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-500">
                    Energy Co - الشركة المتخصصة الناشئة
                  </h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>تأسست 2021</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>تخصص في البطاريات (ميزة فريدة)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>قوة إنتاجية 600 طن/سنة</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>مصنعين منفصلين (إلكترونيات + بطاريات)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <span>محتوى ضعيف</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <span>لا شفافية في العملاء</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <span>لا نشاط إعلامي</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="mb-12">
          <h2 className="text-3xl font-black mb-8">📊 الإحصائيات المستخرجة</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-green-500">من EERC</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span>نسبة التدوير</span>
                  <span className="font-black text-2xl text-primary">92%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span>تقليل انبعاثات الكربون</span>
                  <span className="font-black text-2xl text-primary">15%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span>زمن الاستلام</span>
                  <span className="font-black text-2xl text-primary">72 ساعة</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span>عدد العملاء</span>
                  <span className="font-black text-2xl text-primary">530+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span>عدد الشهادات</span>
                  <span className="font-black text-2xl text-primary">4 ISO</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-500">من Energy Co</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span>القوة الإنتاجية</span>
                  <span className="font-black text-2xl text-primary">600 طن/سنة</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span>مساحة المصنع الرئيسي</span>
                  <span className="font-black text-2xl text-primary">1319.5 م²</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span>مساحة فرع البطاريات</span>
                  <span className="font-black text-2xl text-primary">1550 م²</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span>عدد الشهادات</span>
                  <span className="font-black text-2xl text-primary">3 ISO</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span>التخصص</span>
                  <span className="font-black text-2xl text-primary">البطاريات</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-12">
          <h2 className="text-3xl font-black mb-8">💡 التوصيات لشركتك</h2>
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 border-r-4 border-red-500">
              <h3 className="text-xl font-bold mb-4 text-red-500 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                أولويات عالية
              </h3>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </span>
                  <span>إضافة شهادة ISO 27001 (أمن المعلومات) - ميزة تنافسية قوية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </span>
                  <span>نشر قائمة العملاء - بناء الثقة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </span>
                  <span>تحديد الإحصائيات (نسب التدوير، تقليل الكربون)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    4
                  </span>
                  <span>توثيق مراحل العملية - شفافية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    5
                  </span>
                  <span>إنشاء ملف شركة PDF - احترافية</span>
                </li>
              </ol>
            </div>

            <div className="glass rounded-2xl p-6 border-r-4 border-yellow-500">
              <h3 className="text-xl font-bold mb-4 text-yellow-500 flex items-center gap-2">
                <FileText className="h-6 w-6" />
                أولويات متوسطة
              </h3>
              <ol className="space-y-2 text-sm" start="6">
                <li className="flex items-start gap-2">
                  <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    6
                  </span>
                  <span>إضافة قسم أخبار وفعاليات</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    7
                  </span>
                  <span>تفعيل وسائل التواصل الاجتماعي</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    8
                  </span>
                  <span>إضافة واتساب مباشر</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    9
                  </span>
                  <span>إضافة الأسئلة الشائعة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                    10
                  </span>
                  <span>إنشاء قسم معرفة/مدونة</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Detailed Data Links */}
        <div className="mb-12">
          <h2 className="text-3xl font-black mb-8">📁 البيانات التفصيلية</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="/competitor_analysis/EERC_Complete_Data.md"
              target="_blank"
              className="glass rounded-2xl p-6 hover:border-green-500/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-green-500/20 rounded-xl group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">EERC - البيانات الكاملة</h3>
                  <p className="text-sm text-muted-foreground">
                    المعلومات الأساسية، الشهادات، الخدمات، العملاء
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/competitor_analysis/EnergyCo_Complete_Data.md"
              target="_blank"
              className="glass rounded-2xl p-6 hover:border-blue-500/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform">
                  <Factory className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Energy Co - البيانات الكاملة</h3>
                  <p className="text-sm text-muted-foreground">
                    القدرات الإنتاجية، التخصص في البطاريات، الخدمات
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/competitor_analysis/Competitor_Comparison.md"
              target="_blank"
              className="glass rounded-2xl p-6 hover:border-yellow-500/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-yellow-500/20 rounded-xl group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">المقارنة الشاملة</h3>
                  <p className="text-sm text-muted-foreground">
                    مقارنة تفصيلية بين الشركتين في جميع الجوانب
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/competitor_analysis/What_You_Need_Checklist.md"
              target="_blank"
              className="glass rounded-2xl p-6 hover:border-red-500/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-red-500/20 rounded-xl group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="h-8 w-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">قائمة ما ينقصك</h3>
                  <p className="text-sm text-muted-foreground">
                    قائمة شاملة بالمعلومات المطلوبة وخطة العمل
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Final Note */}
        <div className="glass rounded-2xl p-8 bg-gradient-to-r from-primary/10 to-gold/10">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-xl shrink-0">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">ملاحظة هامة</h3>
              <p className="text-muted-foreground leading-relaxed">
                هذه الدراسة التنافسية قائمة على البيانات المتاحة على المواقع الرسمية للشركتين
                المنافستين حتى 13 نوفمبر 2026. يُنصح بمراجعة هذه البيانات دورياً وتحديثها لأن السوق
                يتغير باستمرار. التركيز على الميزات الفريدة لشركتك (مثل التخصص في البطاريات أو
                تقنيات معينة) سيعطيك ميزة تنافسية قوية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
