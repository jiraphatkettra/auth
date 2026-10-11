import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/lib/products";
import { deleteProductAction } from "@/app/actions";

type DeleteProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DeleteProductPage({
  params,
}: DeleteProductPageProps) {
  const session = await auth();

  if (!session?.user) {
    // เติม: ฟังก์ชันที่พาผู้ที่ยังไม่ล็อกอินกลับหน้าแรก
    redirect("/");
  }

  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const deleteAction = deleteProductAction.bind(null, product.id);

  return (
    <main className="max-w-md mx-auto px-4 py-16">
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">ยืนยันการลบ</h1>
        <p className="text-sm text-zinc-300 mb-6">
          ต้องการลบสินค้า “{product.name}” หรือไม่?
        </p>

        <div className="flex items-center justify-center gap-3">
          <form action={deleteAction}>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition shadow-sm cursor-pointer"
            >
              ยืนยันการลบ
            </button>
          </form>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-sm transition"
          >
            ยกเลิก
          </Link>
        </div>
      </div>
    </main>
  );
}
