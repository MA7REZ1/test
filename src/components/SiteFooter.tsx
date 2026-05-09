import { Phone, MessageCircle, MapPin, ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card/50">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-gold font-bold text-gold-foreground">M&S</div>
            <div className="font-bold">M&S للإلكترونيات</div>
          </div>
          <p className="text-sm text-muted-foreground">
            متخصصون في شراء وبيع الأجهزة الإلكترونية الراكدة والمستعملة والجديدة من الشركات والبنوك والمصانع داخل مصر.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-bold">تواصل معنا</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> <a dir="ltr" href="tel:01011965099" className="hover:text-primary">01011965099</a></li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-primary" /> <a href="https://wa.me/message/PLVXE5WW4OAMB1" target="_blank" rel="noreferrer" className="hover:text-primary">واتساب مباشر</a></li>
            <li className="flex items-center gap-2"><ShoppingCart className="h-4 w-4 text-primary" /> <Link to="/products?category=sell" className="hover:text-primary">تسوق منتجات</Link></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> داخل جمهورية مصر العربية</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-bold">لماذا M&S؟</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>أعلى سعر في السوق</li>
            <li>سرعة في المعاينة</li>
            <li>التزام ومصداقية</li>
            <li>استلام من أي مكان</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} M&S للإلكترونيات — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
