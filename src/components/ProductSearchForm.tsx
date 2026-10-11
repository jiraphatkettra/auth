"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SORT_FIELDS, SearchQuerySchema, defaultQuery } from "@/lib/products-lab11";
import type { SearchQuery } from "@/lib/products-lab11";
import { IconSearch } from "./Icons";

type ProductSearchFormProps = {
  onSearch: (query: SearchQuery) => Promise<void>;
};

export default function ProductSearchForm({
  onSearch,
}: ProductSearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchQuery>({
    resolver: zodResolver(SearchQuerySchema),
    mode: "onTouched",
    defaultValues: defaultQuery,
  });

  return (
    <div className="apple-card rounded-2xl p-5 sm:p-6 transition-all duration-300">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <IconSearch className="h-4 w-4 text-[#2997ff]" />
          <span className="text-base font-semibold text-white">ค้นหารายการสินค้า</span>
        </div>
        <span className="inline-flex items-center rounded-full bg-white/[0.05] border border-white/[0.08] px-2.5 py-0.5 text-[11px] font-mono text-[#a1a1a6]">
          RHF + Zod
        </span>
      </div>

      <form onSubmit={handleSubmit(onSearch)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          {/* ช่องคำค้น */}
          <div>
            <label htmlFor="q" className="block text-xs font-medium text-[#a1a1a6] mb-1.5">
              คำค้นหา (Keyword)
            </label>
            <input
              id="q"
              {...register("q")}
              placeholder="เช่น phone, laptop, perfume..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-sm text-[#f5f5f7] placeholder:text-[#86868b] outline-none transition-all focus:border-[#2997ff] focus:ring-2 focus:ring-[#2997ff]/20"
            />
          </div>

          {/* ช่องจำนวนรายการ */}
          <div>
            <label htmlFor="limit" className="block text-xs font-medium text-[#a1a1a6] mb-1.5">
              จำนวนรายการ (1 - 30) <span className="text-[#ff453a]">*</span>
            </label>
            <input
              id="limit"
              type="number"
              required
              {...register("limit", { valueAsNumber: true })}
              aria-invalid={!!errors.limit}
              aria-describedby="limit-error"
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-sm text-[#f5f5f7] placeholder:text-[#86868b] outline-none transition-all focus:border-[#2997ff] focus:ring-2 focus:ring-[#2997ff]/20"
            />
            <span id="limit-error" role="alert" className="mt-1.5 block text-xs text-[#ff453a] font-medium">
              {errors.limit?.message}
            </span>
          </div>

          {/* ช่องจัดเรียง */}
          <div>
            <label htmlFor="sortBy" className="block text-xs font-medium text-[#a1a1a6] mb-1.5">
              เรียงตาม (Sort By)
            </label>
            <select
              id="sortBy"
              {...register("sortBy")}
              className="w-full rounded-xl border border-white/10 bg-[#0d0d0f] px-3.5 py-2.5 text-sm text-[#f5f5f7] outline-none transition-all focus:border-[#2997ff] focus:ring-2 focus:ring-[#2997ff]/20 cursor-pointer"
            >
              {SORT_FIELDS.map((field) => (
                <option key={field} value={field} className="bg-[#1c1c1e] text-white">
                  {field.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2997ff] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-[#0077ed] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>กำลังค้นหา...</span>
              </>
            ) : (
              <>
                <IconSearch className="h-4 w-4" />
                <span>ค้นหา</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
