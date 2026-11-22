"use client";

import { useEffect, useState } from "react";
import { getAllProduct } from "@/services/product.service";
import { productIF } from "@/types/product.type";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { ChevronLeft, ChevronRight, Eye, GitCompareArrows, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function YouMay() {
  const [products, setProducts] = useState<productIF[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function loadProducts() {
      const response = await getAllProduct(null);
      setProducts(response.data);
    }

    loadProducts();
  }, []);

  const visibleProducts = products.length
    ? Array.from({ length: Math.min(5, products.length) }, (_, index) =>
        products[(startIndex + index) % products.length]
      )
    : [];

  function showNextProducts() {
    setStartIndex((current) => (current + 5) % products.length);
  }

  function showPreviousProducts() {
    setStartIndex((current) => (current - 5 + products.length) % products.length);
  }

  return (
    <section className="w-full py-4">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-2xl font-semibold">
          <span className="h-9 w-1 rounded-full bg-gradient-to-b from-green-300 to-green-800" />
          <span className="text-black">
            You May Also <span className="text-green-700">Like</span>
          </span>
        </h2>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Previous products"
            onClick={showPreviousProducts}
            disabled={products.length <= 5}
            className="flex size-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:border-green-700 hover:bg-green-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next products"
            onClick={showNextProducts}
            disabled={products.length <= 5}
            className="flex size-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:border-green-700 hover:bg-green-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {visibleProducts.map((product) => {
          const hasDiscount = Boolean(product.priceAfterDiscount);
          const discount = hasDiscount
            ? Math.round(
                ((product.price - product.priceAfterDiscount!) / product.price) * 100
              )
            : 0;

          return (
            <article
              key={product._id}
              className="group rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md"
            >
              <div className="relative">
                {hasDiscount && (
                  <span className="absolute left-1 top-1 z-10 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                    {discount}% off
                  </span>
                )}

                <Link href={`/products/${product._id}`} className="block">
                  <div className="relative h-40 w-full">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 20vw"
                      className="object-contain"
                    />
                  </div>
                </Link>

                <div className="absolute right-1 top-2 flex flex-col gap-2 text-gray-500" aria-hidden="true">
                  <span className="flex size-7 items-center justify-center rounded-full bg-white shadow-sm">
                    <Heart size={15} />
                  </span>
                  <span className="flex size-7 items-center justify-center rounded-full bg-white shadow-sm">
                    <GitCompareArrows size={15} />
                  </span>
                  <span className="flex size-7 items-center justify-center rounded-full bg-white shadow-sm">
                    <Eye size={15} />
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-500">{product.category.name}</p>
                <Link href={`/products/${product._id}`}>
                  <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-gray-900">
                    {product.title}
                  </h3>
                </Link>

                <div className="mt-2 flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        star < Math.floor(product.ratingsAverage)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-300 text-gray-300"
                      }
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">
                    {product.ratingsAverage}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-baseline gap-1 text-sm">
                    <span className="font-semibold text-gray-900">
                      {hasDiscount ? product.priceAfterDiscount : product.price} EGP
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-gray-400 line-through">
                        {product.price} EGP
                      </span>
                    )}
                  </div>
                  <div className="shrink-0 [&_button]:!h-10 [&_button]:!w-10 [&_button]:!rounded-full [&_button]:!p-0 [&_button]:!text-[0px] [&_button]:!justify-center [&_button]:!gap-0 [&_button_svg]:!text-white">
                    <AddToCartButton productId={product._id} />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
