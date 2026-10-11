import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { updateProductAction } from "@/app/actions";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  // เติม: ค่าที่ Next 16 ทำเป็น Promise จึงต้อง await
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  // เติม: เมธอดที่ผูกอาร์กิวเมนต์แรกให้ฟังก์ชันไว้ล่วงหน้า
  const updateAction = updateProductAction.bind(null, product.id);

  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6">แก้ไขสินค้า</h1>

        <form action={updateAction} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-300 mb-1.5"
            >
              ชื่อสินค้า
            </label>
            <input
              id="name"
              name="name"
              defaultValue={product.name}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-zinc-300 mb-1.5"
            >
              ราคา
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              defaultValue={product.price}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-zinc-300 mb-1.5"
            >
              รายละเอียด
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={product.description}
              rows={4}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-3">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition shadow-sm cursor-pointer"
            >
              บันทึก
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-sm transition"
            >
              ยกเลิก
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
