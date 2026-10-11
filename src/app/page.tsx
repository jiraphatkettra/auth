import Link from "next/link";
import { auth } from "@/auth";
import { getProducts } from "@/lib/products";
import { AuthButtons } from "./auth-buttons";

export default async function HomePage() {
  const session = await auth();
  const products = getProducts();
  // เติม: ฟังก์ชันที่แปลงค่าเป็น true หรือ false
  const isLoggedIn = Boolean(session?.user);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-800">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            สินค้า
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            {isLoggedIn
              ? "คุณเข้าสู่ระบบแล้ว สามารถแก้ไขหรือลบสินค้าได้"
              : "เข้าสู่ระบบเพื่อแก้ไขหรือลบสินค้า"}
          </p>
        </div>
        <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <article
            key={product.id}
            data-testid="product"
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="text-[11px] font-mono text-zinc-500 mb-1">
                ID: {product.id}
              </div>
              <h2 className="text-lg font-bold text-white mb-2">
                {product.name}
              </h2>
              <p className="text-sm text-zinc-400 line-clamp-3 mb-4">
                {product.description}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
              <p className="text-lg font-bold text-emerald-400">
                ฿{product.price.toLocaleString("th-TH")}
              </p>
              {isLoggedIn && (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition cursor-pointer"
                  >
                    แก้ไข
                  </Link>
                  <Link
                    href={`/products/${product.id}/delete`}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition cursor-pointer"
                  >
                    ลบ
                  </Link>
                </div>
              )}
            </div>
          </article>
        ))}
        {products.length === 0 && (
          <p className="col-span-full text-center text-zinc-500 py-12">
            ไม่มีสินค้า
          </p>
        )}
      </div>
    </main>
  );
}
