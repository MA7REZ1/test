import { useState } from "react";
import type { Product } from "@/lib/products-store";
import { Package, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ProductCard({ product }: { product: Product }) {
  const [idx, setIdx] = useState(0);
  const hasImages = product.images.length > 0;
  const next = (e: React.MouseEvent) => { e.preventDefault(); setIdx((i) => (i + 1) % product.images.length); };
  const prev = (e: React.MouseEvent) => { e.preventDefault(); setIdx((i) => (i - 1 + product.images.length) % product.images.length); };

  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="group block overflow-hidden rounded-xl bg-gradient-card shadow-elegant transition-all hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {hasImages ? (
          <>
            <img src={product.images[idx]} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            {product.images.length > 1 && (
              <>
                <button onClick={prev} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-1.5 opacity-0 transition-opacity hover:bg-background group-hover:opacity-100">
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button onClick={next} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-1.5 opacity-0 transition-opacity hover:bg-background group-hover:opacity-100">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                  {product.images.map((_, i) => (
                    <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === idx ? "bg-primary" : "bg-background/60"}`} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-10 w-10" />
          </div>
        )}
        <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${product.category === "buy" ? "bg-gradient-gold text-gold-foreground" : "bg-gradient-primary text-primary-foreground"}`}>
          {product.category === "buy" ? "نشتري" : "للبيع"}
        </span>
      </div>
      <div className="p-4">
        <h3 className="mb-1 line-clamp-1 font-bold">{product.title}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>كمية: {product.quantity.toLocaleString("ar-EG")}</span>
          </div>
          {product.price ? (
            <div className="font-bold text-gold">{product.price.toLocaleString("ar-EG")} ج.م</div>
          ) : (
            <div className="text-xs text-primary">السعر حسب الكمية</div>
          )}
        </div>
      </div>
    </Link>
  );
}
