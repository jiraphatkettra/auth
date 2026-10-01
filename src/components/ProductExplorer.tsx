"use client";

import { useEffect, useState } from "react";
import ProductSearchForm from "./ProductSearchForm";
import ProductForm from "./ProductForm";
import { defaultQuery, fetchProducts } from "@/lib/products";
import type {
  Product,
  ProductDraft,
  ProductList,
  SearchQuery,
} from "@/lib/products";
import {
  IconRefresh,
  IconPackage,
  IconSearch,
  IconAlertCircle,
  IconEdit,
  IconTrash,
} from "./Icons";

// 4.1 นำ idle ออกจาก LoadState เพราะหน้าจอโหลดอัตโนมัติตั้งแต่เปิด
type LoadState = "loading" | "error" | "ready";

export default function ProductExplorer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  // 4.2 State สำหรับเก็บสินค้าที่กำลังแก้ไข
  const [editing, setEditing] = useState<Product | null>(null);

  function showResult(list: ProductList) {
    setProducts(list.products);
    setStatus("ready");
  }

  function showError(error: unknown) {
    setErrorMessage(
      error instanceof Error ? error.message : "เรียกข้อมูลไม่สำเร็จ"
    );
    setStatus("error");
  }

  async function loadProducts(query: SearchQuery) {
    setStatus("loading");
    setErrorMessage("");
    try {
      showResult(await fetchProducts(query));
    } catch (error) {
      showError(error);
    }
  }

  // 4.1 โหลดอัตโนมัติเมื่อเปิดหน้าด้วย useEffect
  useEffect(() => {
    fetchProducts(defaultQuery).then(showResult).catch(showError);
  }, []);

  // 3.7 & 4.2 บันทึกสินค้า (เพิ่มใหม่ หรือ แก้ไขรายการเดิม)
  function saveProduct(draft: ProductDraft) {
    if (editing) {
      // ข้อ 3 & 6: บันทึกการแก้ไขแล้วรายการนั้นเปลี่ยน รายการอื่นไม่เปลี่ยน สร้าง Array ใหม่
      setProducts(
        products.map((item) =>
          item.id === editing.id
            ? { ...draft, id: editing.id, thumbnail: editing.thumbnail }
            : item
        )
      );
      setEditing(null);
    } else {
      // สร้าง Array ใหม่ที่มีสมาชิกเดิมทั้งหมดแล้วต่อท้ายด้วยรายการใหม่
      setProducts([...products, { ...draft, id: Date.now() }]);
    }
  }

  // 4.2 ข้อ 4 & 6: ฟังก์ชันลบสินค้า สร้าง Array ใหม่ และคืนฟอร์มกลับสู่โหมดเพิ่มถ้ากำลังแก้ไขรายการนั้นอยู่
  function removeProduct(id: number) {
    setProducts(products.filter((item) => item.id !== id));
    if (editing?.id === id) {
      setEditing(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Apple Keynote Style Hero Section */}
      <section className="relative text-center flex flex-col items-center pt-2 pb-4">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/[0.1] px-4 py-1.5 text-xs font-medium text-[#a1a1a6] backdrop-blur-xl mb-4 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#2997ff] animate-pulse" />
          <span>Web 231 • Lab 11: React Hook Form & Zod</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gradient-apple leading-tight text-center">
          รายการสินค้า
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#86868b] max-w-xl text-center leading-relaxed">
          ระบบจัดการรายการสินค้า สำรวจโครงสร้างข้อมูล ตรวจสอบความถูกต้องด้วย Zod Schema
          และเชื่อมต่อ External API ตามแบบจำลองของ Apple VisionOS
        </p>

        {/* Primary Load Button (4.1 เปลี่ยนเป็นปุ่มโหลดซ้ำ Reload) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => loadProducts(defaultQuery)}
            disabled={status === "loading"}
            className="inline-flex items-center gap-2 rounded-full bg-[#2997ff] px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 transition-all duration-200 hover:bg-[#0077ed] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {status === "loading" ? (
              <>
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>กำลังโหลดข้อมูล...</span>
              </>
            ) : (
              <>
                <IconRefresh className="h-4 w-4" />
                <span>โหลดข้อมูลซ้ำ (Reload)</span>
              </>
            )}
          </button>
        </div>

        {/* Apple Bento Metrics Strip */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xl">
          <div className="apple-card rounded-2xl p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-gradient-apple">
              {products.length}
            </div>
            <div className="text-[11px] sm:text-xs text-[#86868b] mt-0.5">สินค้าในตาราง</div>
          </div>
          <div className="apple-card rounded-2xl p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-[#2997ff] capitalize">
              {status}
            </div>
            <div className="text-[11px] sm:text-xs text-[#86868b] mt-0.5">สถานะระบบ</div>
          </div>
          <div className="apple-card rounded-2xl p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-[#30d158]">
              {new Set(products.map((p) => p.category)).size}
            </div>
            <div className="text-[11px] sm:text-xs text-[#86868b] mt-0.5">หมวดหมู่สินค้า</div>
          </div>
        </div>
      </section>

      {/* 2.5 ฟอร์มค้นหาสินค้า */}
      <ProductSearchForm onSearch={loadProducts} />

      {/* 3.7 & 4.2 ฟอร์มเพิ่ม/แก้ไขสินค้า */}
      <ProductForm
        key={editing?.id ?? "new"}
        editing={editing}
        onSave={saveProduct}
        onCancel={() => setEditing(null)}
      />

      {/* 1.7 & 4.1 แสดงผลตามสถานะ */}
      <section aria-live="polite" className="space-y-4">
        {status === "loading" && (
          <div className="apple-card rounded-2xl p-10 text-center border border-white/10">
            <div className="inline-block h-8 w-8 border-2 border-white/20 border-t-[#2997ff] rounded-full animate-spin mb-3" />
            <p className="text-sm font-medium text-[#f5f5f7]">กำลังโหลดข้อมูลสินค้า...</p>
            <p className="text-xs text-[#86868b] mt-1">กำลังติดต่อและตรวจสอบความถูกต้องผ่าน Zod Schema</p>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl p-6 bg-red-500/10 border border-red-500/20 text-center">
            <IconAlertCircle className="h-8 w-8 text-[#ff453a] mx-auto mb-2" />
            <p role="alert" className="text-sm font-semibold text-[#ff453a]">
              {errorMessage}
            </p>
            <p className="text-xs text-red-400/80 mt-1">
              โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต หรือ API_BASE
            </p>
          </div>
        )}

        {status === "ready" && products.length === 0 && (
          <div className="apple-card rounded-2xl p-8 text-center border border-white/10">
            <IconSearch className="h-8 w-8 text-[#86868b] mx-auto mb-2" />
            <p className="text-sm text-[#a1a1a6] font-medium">
              ไม่พบสินค้าที่ตรงกับเงื่อนไขการค้นหา
            </p>
            <p className="text-xs text-[#86868b] mt-1">
              ลองเปลี่ยนคำค้นหา หรือเพิ่มจำนวนรายการ
            </p>
          </div>
        )}

        {status === "ready" && products.length > 0 && (
          <div className="apple-card rounded-2xl overflow-hidden border border-white/10">
            {/* Table Header Bar */}
            <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-white">รายการสินค้า</h3>
                <span className="text-xs text-[#86868b] bg-white/[0.05] px-2.5 py-0.5 rounded-full font-medium">
                  {products.length} รายการ
                </span>
              </div>
            </div>

            {/* Natural, Clean, Modern Product Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02] text-xs font-medium text-[#86868b]">
                    <th scope="col" className="py-3.5 px-6 text-left">
                      สินค้า
                    </th>
                    <th scope="col" className="py-3.5 px-6 text-left">
                      หมวดหมู่
                    </th>
                    <th scope="col" className="py-3.5 px-6 text-left">
                      ราคา
                    </th>
                    <th scope="col" className="py-3.5 px-6 text-left">
                      คงเหลือ
                    </th>
                    {/* 4.2 ข้อ 1: คอลัมน์ปุ่มการกระทำ */}
                    <th scope="col" className="py-3.5 px-6 text-right">
                      การกระทำ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {products.map((item) => (
                    <tr
                      key={item.id}
                      className="transition-colors duration-150 hover:bg-white/[0.02]"
                    >
                      {/* 1. สินค้า (รูปภาพ + ชื่อสินค้า) */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-lg bg-white/[0.04] border border-white/10 overflow-hidden flex items-center justify-center p-1">
                            {item.thumbnail ? (
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                loading="lazy"
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <IconPackage className="h-4 w-4 text-[#86868b]" />
                            )}
                          </div>
                          <span className="text-sm font-medium text-[#f5f5f7] truncate max-w-xs sm:max-w-sm">
                            {item.title}
                          </span>
                        </div>
                      </td>

                      {/* 2. หมวดหมู่ */}
                      <td className="py-3.5 px-6 text-sm text-[#86868b] capitalize">
                        {item.category}
                      </td>

                      {/* 3. ราคา */}
                      <td className="py-3.5 px-6 text-sm font-medium text-[#30d158] font-mono">
                        ${Number(item.price).toFixed(2)}
                      </td>

                      {/* 4. คงเหลือ */}
                      <td className="py-3.5 px-6 text-sm">
                        {item.stock === 0 ? (
                          <span className="text-[#ff453a] text-xs font-medium">
                            หมดสต็อก
                          </span>
                        ) : item.stock <= 5 ? (
                          <span className="text-amber-400 font-medium">
                            {item.stock} ชิ้น
                          </span>
                        ) : (
                          <span className="text-[#a1a1a6]">
                            {item.stock} ชิ้น
                          </span>
                        )}
                      </td>

                      {/* 5. ปุ่มแก้ไข / ลบ (4.2) */}
                      <td className="py-3.5 px-6 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditing(item)}
                            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-[#a1a1a6] hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
                          >
                            <IconEdit className="h-3.5 w-3.5" />
                            <span>แก้ไข</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => removeProduct(item.id)}
                            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-[#a1a1a6] hover:text-[#ff453a] hover:bg-red-400/10 transition-colors"
                          >
                            <IconTrash className="h-3.5 w-3.5" />
                            <span>ลบ</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
