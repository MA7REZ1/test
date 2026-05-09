import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-gold font-bold text-gold-foreground shadow-gold">
            M&S
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold leading-tight">M&S للإلكترونيات</div>
            <div className="text-[11px] text-muted-foreground">شراء وبيع أجهزة الشركات</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link to="/" className="hover:text-primary transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>الرئيسية</Link>
          <Link to="/products" search={{ cat: "sell" }} className="hover:text-primary transition-colors">للبيع</Link>
          <Link to="/products" search={{ cat: "buy" }} className="hover:text-primary transition-colors">نشتري منك</Link>
          <Link to="/contracts" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>تعاقد دائم</Link>
          <Link to="/dashboard" className="hover:text-primary transition-colors">لوحة التحكم</Link>
        </nav>

        <a
          href="tel:01011965099"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline" dir="ltr">01011965099</span>
        </a>
      </div>
    </header>
  );
}
