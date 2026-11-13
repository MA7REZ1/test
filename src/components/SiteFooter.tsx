import {
  Phone,
  MessageCircle,
  MapPin,
  ShoppingCart,
  Share2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card/50">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-gold font-bold text-gold-foreground">
              M&S
            </div>
            <div className="font-bold">M&S Recycling للإلكترونيات</div>
          </div>
          <p className="text-sm text-muted-foreground">
            شركة M&S Recycling هي شركة مصرية متخصصة في إدارة جميع أنواع النفايات، مع التركيز بشكل
            خاص على إعادة تدوير المخلفات الإلكترونية. نقدم خدمات شاملة لمعالجة النفايات الخطرة
            بطريقة آمنة وفعالة، مما يساهم في حماية البيئة وتعزيز الاستدامة.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-bold">تواصل معنا</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />{" "}
              <a dir="ltr" href="tel:01011965099" className="hover:text-primary">
                01011965099
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />{" "}
              <a
                href="https://wa.me/message/PLVXE5WW4OAMB1"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                واتساب مباشر
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> داخل جمهورية مصر العربية
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              title="فيسبوك"
            >
              <Share2 className="h-5 w-5 text-primary" />
            </a>
            <a
              href="#"
              className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              title="لينكدين"
            >
              <Share2 className="h-5 w-5 text-primary" />
            </a>
            <a
              href="#"
              className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              title="يوتيوب"
            >
              <Share2 className="h-5 w-5 text-primary" />
            </a>
            <a
              href="#"
              className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              title="تويتر"
            >
              <Share2 className="h-5 w-5 text-primary" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 font-bold">روابط سريعة</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors">
                من نحن
              </Link>
            </li>
            <li>
              <Link to="/contracts" className="hover:text-primary transition-colors">
                تعاقد دائم
              </Link>
            </li>
            <li>
              <Link to="/competitor-analysis" className="hover:text-primary transition-colors">
                الدراسة التنافسية
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} M&S Recycling للإلكترونيات — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
