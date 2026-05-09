import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { productsStore, type Product } from "@/lib/products-store";
import { Phone, MessageCircle, Package, ImageOff, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/products/$id")({
  head: () => ({
    meta: [
      { title: "تفاصيل المنتج — M&S للإلكترونيات" },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const refresh = () => setProduct(productsStore.get(id) ?? null);
    refresh();
    return productsStore.subscribe(refresh);
  }, [id]);

  if (product === undefined) return null;
  if (product === null) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">المنتج غير موجود</h1>
          <Link to="/products" search={{}} className="mt-4 inline-block text-primary hover:underline">العودة للمنتجات</Link>
        </div>
      </div>
    );
  }

  const hasImages = product.images.length > 0;
  const waMessage = encodeURIComponent(`السلام عليكم، استفسار عن: ${product.title}`);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-elegant">
              {hasImages ? (
                <>
                  <img src={product.images[idx]} alt={product.title} className="h-full w-full object-cover" />
                  {product.images.length > 1 && (
                    <>
                      <button onClick={() => setIdx((i) => (i - 1 + product.images.length) % product.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background"><ChevronLeft /></button>
                      <button onClick={() => setIdx((i) => (i + 1) % product.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background"><ChevronRight /></button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground"><ImageOff className="h-16 w-16" /></div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {product.images.map((src, i) => (
                  <button key={i} onClick={() => setIdx(i)} className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 ${i === idx ? "border-primary" : "border-transparent"}`}>
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${product.category === "buy" ? "bg-gradient-gold text-gold-foreground" : "bg-gradient-primary text-primary-foreground"}`}>
              {product.category === "buy" ? "نشتري" : "للبيع"}
            </span>
            <h1 className="mt-3 text-4xl font-extrabold">{product.title}</h1>
            {product.condition && <p className="mt-2 text-muted-foreground">الحالة: {product.condition}</p>}

            <div className="my-6 flex items-center gap-6">
              {product.price ? (
                <div>
                  <div className="text-xs text-muted-foreground">السعر</div>
                  <div className="text-3xl font-extrabold text-gold">{product.price.toLocaleString("ar-EG")} ج.م</div>
                </div>
              ) : (
                <div className="text-lg font-bold text-primary">السعر حسب الكمية</div>
              )}
              <div>
                <div className="text-xs text-muted-foreground">الكمية المتاحة</div>
                <div className="flex items-center gap-2 text-2xl font-bold"><Package className="h-5 w-5 text-primary" /> {product.quantity.toLocaleString("ar-EG")}</div>
              </div>
            </div>

            <p className="mb-8 leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="flex flex-wrap gap-3">
              <a href={`https://wa.me/message/PLVXE5WW4OAMB1?text=${waMessage}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-gradient-gold px-6 py-3 font-bold text-gold-foreground shadow-gold transition-transform hover:scale-105">
                <MessageCircle className="h-5 w-5" /> اطلب عبر واتساب
              </a>
              <a href="tel:01011965099" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105">
                <Phone className="h-5 w-5" /> <span dir="ltr">01011965099</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
