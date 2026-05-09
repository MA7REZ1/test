import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { productsStore, type Product, type ProductCategory } from "@/lib/products-store";

type Search = { cat?: ProductCategory };

export const Route = createFileRoute("/products/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: s.cat === "buy" || s.cat === "sell" ? s.cat : undefined,
  }),
  head: () => ({
    meta: [
      { title: "المنتجات — M&S للإلكترونيات" },
      { name: "description", content: "تصفح الأجهزة المعروضة للبيع وطلبات الشراء الحالية من شركة M&S للإلكترونيات." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { cat } = Route.useSearch();
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    const refresh = () => setItems(productsStore.list());
    refresh();
    return productsStore.subscribe(refresh);
  }, []);

  const filtered = cat ? items.filter((p) => p.category === cat) : items;
  const title = cat === "buy" ? "ما نشتريه" : cat === "sell" ? "للبيع" : "كل المنتجات";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-2 text-4xl font-extrabold">{title}</h1>
        <p className="mb-8 text-muted-foreground">{filtered.length} عنصر</p>

        <div className="mb-8 flex flex-wrap gap-2">
          <Link to="/products" search={{}} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${!cat ? "bg-gradient-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"}`}>الكل</Link>
          <Link to="/products" search={{ cat: "sell" }} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${cat === "sell" ? "bg-gradient-primary text-primary-foreground" : "border border-border bg-card hover:bg-accent"}`}>للبيع</Link>
          <Link to="/products" search={{ cat: "buy" }} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${cat === "buy" ? "bg-gradient-gold text-gold-foreground" : "border border-border bg-card hover:bg-accent"}`}>نشتري</Link>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">لا توجد عناصر بعد.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
