"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORIES, ProductDraftSchema } from "@/lib/products-lab11";
import type { Product, ProductDraft } from "@/lib/products-lab11";
import { IconPlus, IconEdit, IconCheck, IconClose } from "./Icons";

type ProductFormProps = {
  editing: Product | null;
  onSave: (draft: ProductDraft) => void;
  onCancel: () => void;
};

export default function ProductForm({
  editing,
  onSave,
  onCancel,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ProductDraft>({
    resolver: zodResolver(ProductDraftSchema),
    mode: "onTouched",
    defaultValues: editing
      ? {
          title: editing.title,
          price: editing.price,
          stock: editing.stock,
          category: editing.category,
        }
      : { title: "", price: undefined, stock: undefined },
  });

  // 3.5 ส่งข้อมูลขึ้นไปยัง Parent Component
  function saveProduct(values: ProductDraft) {
    onSave(values);
    reset();
  }

  const isEditing = Boolean(editing);

  return (
    <div className="apple-card rounded-2xl p-5 sm:p-6 transition-all duration-300">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <IconEdit className="h-4 w-4 text-amber-400" />
          ) : (
            <IconPlus className="h-4 w-4 text-[#2997ff]" />
          )}
          <h2 className="text-base font-semibold text-white">
            {isEditing ? `แก้ไขข้อมูลสินค้า (#${editing?.id})` : "เพิ่มสินค้าใหม่"}
          </h2>
        </div>

        {isEditing ? (
          <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-400">
            กำลังแก้ไข
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-white/[0.05] border border-white/[0.08] px-2.5 py-0.5 text-[11px] font-mono text-[#a1a1a6]">
            Zod Schema
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit(saveProduct)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* ช่องชื่อสินค้า */}
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-xs font-medium text-[#86868b] mb-1.5">
              ชื่อสินค้า <span className="text-[#ff453a]">*</span>
            </label>
            <input
              id="title"
              required
              {...register("title")}
              aria-invalid={!!errors.title}
              aria-describedby="title-error"
              placeholder="กรอกชื่อสินค้า..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-[#f5f5f7] placeholder:text-[#86868b] outline-none transition-all focus:border-[#2997ff] focus:bg-white/[0.06]"
            />
            <span id="title-error" role="alert" className="mt-1.5 block text-xs text-[#ff453a] font-medium">
              {errors.title?.message}
            </span>
          </div>

          {/* 3.3 ช่องกรอกชนิดตัวเลข (ราคา) */}
          <div>
            <label htmlFor="price" className="block text-xs font-medium text-[#86868b] mb-1.5">
              ราคา ($) <span className="text-[#ff453a]">*</span>
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              required
              {...register("price", { valueAsNumber: true })}
              aria-invalid={!!errors.price}
              aria-describedby="price-error"
              placeholder="0.00"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-[#f5f5f7] placeholder:text-[#86868b] outline-none transition-all focus:border-[#2997ff] focus:bg-white/[0.06]"
            />
            <span id="price-error" role="alert" className="mt-1.5 block text-xs text-[#ff453a] font-medium">
              {errors.price?.message}
            </span>
          </div>

          {/* กิจกรรม 3.3 ช่องจำนวนคงเหลือ */}
          <div>
            <label htmlFor="stock" className="block text-xs font-medium text-[#86868b] mb-1.5">
              จำนวนคงเหลือ <span className="text-[#ff453a]">*</span>
            </label>
            <input
              id="stock"
              type="number"
              step="1"
              required
              {...register("stock", { valueAsNumber: true })}
              aria-invalid={!!errors.stock}
              aria-describedby="stock-error"
              placeholder="0"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-[#f5f5f7] placeholder:text-[#86868b] outline-none transition-all focus:border-[#2997ff] focus:bg-white/[0.06]"
            />
            <span id="stock-error" role="alert" className="mt-1.5 block text-xs text-[#ff453a] font-medium">
              {errors.stock?.message}
            </span>
          </div>

          {/* 3.4 ช่องเลือกหมวดหมู่ */}
          <div className="sm:col-span-2">
            <label htmlFor="category" className="block text-xs font-medium text-[#86868b] mb-1.5">
              หมวดหมู่สินค้า <span className="text-[#ff453a]">*</span>
            </label>
            <select
              id="category"
              required
              {...register("category")}
              aria-invalid={!!errors.category}
              aria-describedby="category-error"
              className="w-full rounded-xl border border-white/10 bg-[#0d0d0f] px-3.5 py-2.5 text-sm text-[#f5f5f7] outline-none transition-all focus:border-[#2997ff] cursor-pointer"
            >
              <option value="" className="bg-[#1c1c1e] text-[#86868b]">
                -- เลือกหมวดหมู่ --
              </option>
              {CATEGORIES.map((name) => (
                <option key={name} value={name} className="bg-[#1c1c1e] text-white">
                  {name}
                </option>
              ))}
            </select>
            <span id="category-error" role="alert" className="mt-1.5 block text-xs text-[#ff453a] font-medium">
              {errors.category?.message}
            </span>
          </div>
        </div>

        {/* 3.6 ควบคุมปุ่มส่งด้วย formState */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          {editing && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-[#a1a1a6] hover:text-white hover:bg-white/[0.06] transition-all duration-150"
            >
              <IconClose className="h-4 w-4" />
              <span>ยกเลิก</span>
            </button>
          )}

          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2997ff] px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-[#0077ed] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {editing ? (
              <>
                <IconCheck className="h-4 w-4" />
                <span>บันทึกการแก้ไข</span>
              </>
            ) : (
              <>
                <IconPlus className="h-4 w-4" />
                <span>เพิ่มสินค้า</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
