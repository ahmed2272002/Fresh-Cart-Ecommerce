"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ProductDetailsIF } from "@/types/productDetails";

import { Box, CalendarDays, Check, ChevronDown, CreditCard, MessageSquareText, PackageCheck, RotateCcw, Star, Truck } from "lucide-react";


function formatReviewDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime()))

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ProductsReview({product,}: {product: ProductDetailsIF;}) {
  
  const reviews = [...(product.reviews ?? [])].sort(
    (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
  );
  const averageRating = Number.isFinite(product.ratingsAverage) ? product.ratingsAverage : 0;
  const ratingBreakdown = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((item) => Math.round(item.rating) === rating).length;
    return {
      rating,
      count,
      percentage: reviews.length ? (count / reviews.length) * 100 : 0,
    };
  });
  
  const [visibleReviewCount, setVisibleReviewCount] = useState(3);
  const visibleReviews = reviews.slice(0, visibleReviewCount);
  const [activeTab, setActiveTab] = useState("Product Details");
  const activeTabClasses = "active-tab group rounded-none p-5 text-gray-600 text-md transition-colors hover:text-gray-600 data-active:bg-green-100 group-data-[variant=line]/tabs-list:data-active:bg-green-100! data-active:text-green-800 data-active:hover:text-green-800! data-active:after:bg-green-800! focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent!";

  return (
    <>
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="line">
            <TabsTrigger
              className={activeTabClasses}
              value="Product Details"
            >
              <Box size={20} className={activeTab === "Product Details" ? "text-green-800" : "text-gray-600"} /> Product Details
            </TabsTrigger>
            <TabsTrigger
              className={activeTabClasses}
              value="Reviews"
            >
              <Star size={20} className={`fill-current ${activeTab === "Reviews" ? "text-green-800" : "text-gray-600"}`} /> Reviews
              ({product.ratingsQuantity})
            </TabsTrigger>
            <TabsTrigger
              className={activeTabClasses}
              value="Shipping"
            >
              <Truck size={20} className={`fill-current ${activeTab === "Shipping" ? "text-green-800" : "text-gray-600"}`} />{" "}
              Shipping & Returns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Product Details" className="p-5">
            <h3 className="font-semibold text-xl">About this Product</h3>
            <p className="text-gray-500 mt-3 text-md">
              Material Polyester Blend Colour Name Multicolour Department Women
            </p>
            <div className="grid grid-cols-12 mt-4 gap-4">
              <div className=" col-span-6 p-3 rounded-md bg-gray-50">
                <h4 className="text-[15px]">Product Information</h4>
                <div className="mt-3 space-y-2">
                  <h4 className="flex justify-between text-gray-400">
                    Category{" "}
                    <p className="text-black">{product.category.name}</p>
                  </h4>
                  <h4 className="flex justify-between text-gray-400">
                    Subcategory{" "}
                    <p className="text-black">{product.subcategory[0].name}</p>
                  </h4>
                  <h4 className="flex justify-between text-gray-400">
                    Brand <p className="text-black">{product.brand.name}</p>
                  </h4>
                  <h4 className="flex justify-between text-gray-400">
                    Items Sold <p className="text-black">{product.sold}</p>
                  </h4>
                </div>
              </div>

              <div className=" col-span-6 p-3 rounded-md bg-gray-50">
                <h4 className="text-[15px]">Key Features</h4>
                <div className="mt-3 space-y-2">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="text-green-700" />{" "}
                      <span>Premium Quality Product</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-green-700" />{" "}
                      <span>100% Authentic Guarantee</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-green-700" />{" "}
                      <span>Fast & Secure Packaging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="text-green-700" />{" "}
                      <span>Quality Tested</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          
          <TabsContent value="Reviews" className="mt-0 px-0 pb-3">
            <section className="rounded-2xl border border-border bg-white p-5 sm:p-7">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Customer feedback</p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight">Reviews & ratings</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Real feedback included with this product.</p>
                </div>
                <span className="w-fit rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                  {product.ratingsQuantity} {product.ratingsQuantity === 1 ? "review" : "reviews"}
                </span>
              </div>

              <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)]">
                <div className="rounded-2xl bg-primary/5 p-5">
                  <p className="text-sm font-medium text-muted-foreground">Overall rating</p>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-5xl font-black tracking-tight">{averageRating.toFixed(1)}</span>
                    <span className="pb-1 text-sm text-muted-foreground">out of 5</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1" aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={star <= Math.round(averageRating) ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Based on {product.ratingsQuantity} customer {product.ratingsQuantity === 1 ? "review" : "reviews"}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Included review ratings</p>
                    {ratingBreakdown.map((item) => (
                      <div key={item.rating} className="flex items-center gap-2 text-xs">
                        <span className="w-10 shrink-0 text-muted-foreground">{item.rating} star</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                          <div className="h-full rounded-full bg-amber-400" style={{ width: `${item.percentage}%` }} />
                        </div>
                        <span className="w-5 text-right text-muted-foreground">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Customer reviews</h3>
                    <p className="text-sm text-muted-foreground">{reviews.length} written {reviews.length === 1 ? "review" : "reviews"} included in the product details.</p>
                  </div>

                  {visibleReviews.length ? visibleReviews.map((review) => {
                    const reviewerName = review.user?.name?.trim() || "Customer";
                    const initials = reviewerName
                      .split(/\s+/)
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();
                    const roundedRating = Math.max(0, Math.min(5, Math.round(review.rating)));

                    return (
                      <article key={review._id} className="rounded-xl border border-border/70 p-4 sm:p-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {initials || "C"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate font-semibold">{reviewerName}</h4>
                            <p className="text-xs text-muted-foreground">Customer review</p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDays size={14} /> {formatReviewDate(review.createdAt)}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-1" aria-label={`Rated ${review.rating} out of 5`}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={15}
                              className={star <= roundedRating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                            />
                          ))}
                        </div>
                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                          {review.review?.trim() || "The customer left a rating without a written comment."}
                        </p>
                      </article>
                    );
                  }) : (
                    <div className="flex flex-col items-center rounded-xl border border-dashed border-border px-5 py-10 text-center">
                      <MessageSquareText className="size-9 text-primary/60" />
                      <h3 className="mt-3 font-semibold">No written reviews yet</h3>
                      <p className="mt-1 max-w-sm text-sm text-muted-foreground">There are no customer comments included for this product right now.</p>
                    </div>
                  )}
                  {visibleReviewCount < reviews.length && (
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={() => setVisibleReviewCount((count) => Math.min(count + 3, reviews.length))}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      >
                        More reviews
                        <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs">
                          +{Math.min(3, reviews.length - visibleReviewCount)}
                        </span>
                        <ChevronDown className="size-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </TabsContent>

          
          <TabsContent value="Shipping" className="mt-0 px-0 pb-3">
            <section className="space-y-5 rounded-2xl border border-border bg-white p-5 sm:p-7">
              <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Shop with confidence</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">Shipping & returns</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  The delivery and return benefits shown for this product are summarized below. Confirm address-specific details during checkout.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-xl border border-border/70 p-5">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Truck className="size-5" /></span>
                  <h3 className="mt-4 font-semibold">Free delivery</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Free delivery is highlighted for this product. Availability and delivery details are confirmed using your address at checkout.</p>
                </article>

                <article className="rounded-xl border border-border/70 p-5">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><RotateCcw className="size-5" /></span>
                  <h3 className="mt-4 font-semibold">30-day returns</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">This product is displayed with a 30-day return period. Please check your order details or contact support for item-specific return requirements.</p>
                </article>

                <article className="rounded-xl border border-border/70 p-5">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><CreditCard className="size-5" /></span>
                  <h3 className="mt-4 font-semibold">Secure checkout</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">Review your delivery address, payment choice, and order total before confirming your purchase.</p>
                </article>
              </div>

              <div className="flex gap-3 rounded-xl bg-muted/50 p-4">
                <PackageCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <h3 className="text-sm font-semibold">Before you place your order</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">Make sure your address and phone number are correct. Any final delivery or return conditions should be confirmed from the order details or with customer support.</p>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
