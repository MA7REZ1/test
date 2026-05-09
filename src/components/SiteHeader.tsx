import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-gold font-bold text-gold-foreground shadow-gold">
            M&S
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold leading-tight">M&S للإلكترونيات</div>
            <div className="text-[11px] text-muted-foreground">شراء وبيع أجهزة الشركات</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link to="/" preload={false} className="hover:text-primary transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>الرئيسية</Link>
          <Link to="/products" preload={false} search={{ cat: "sell" }} className="hover:text-primary transition-colors">للبيع</Link>
          <Link to="/products" preload={false} search={{ cat: "buy" }} className="hover:text-primary transition-colors">نشتري منك</Link>
          <Link to="/contracts" preload={false} className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>تعاقد دائم</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:01011965099"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline" dir="ltr">01011965099</span>
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="flex items-center justify-center rounded-lg border border-border bg-card p-2 text-foreground md:hidden hover:bg-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden animate-fade-up">
          <nav className="container mx-auto flex flex-col p-4 text-sm font-semibold">
            <Link to="/" preload={false} onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg p-3 hover:bg-accent transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-primary bg-accent" }}>الرئيسية</Link>
            <Link to="/products" preload={false} search={{ cat: "sell" }} onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg p-3 hover:bg-accent transition-colors">للبيع</Link>
            <Link to="/products" preload={false} search={{ cat: "buy" }} onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg p-3 hover:bg-accent transition-colors">نشتري منك</Link>
            <Link to="/contracts" preload={false} onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg p-3 hover:bg-accent transition-colors" activeProps={{ className: "text-primary bg-accent" }}>تعاقد دائم</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
