"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Leaf, Truck, Tag, ArrowRight, Smartphone, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewsletterSection() {
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Newsletter */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wider text-green-600 uppercase">Newsletter</span>
              <p className="text-xs text-gray-400">50,000+ subscribers</p>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Get the Freshest Updates <span className="text-green-600">Delivered Free</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base">
            Weekly recipes, seasonal offers & exclusive member perks.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-green-50/50 text-green-800 text-sm font-medium">
              <Leaf className="h-4 w-4 text-green-600" />
              Fresh Picks Weekly
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-green-50/50 text-green-800 text-sm font-medium">
              <Truck className="h-4 w-4 text-green-600" />
              Free Delivery Codes
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-green-50/50 text-green-800 text-sm font-medium">
              <Tag className="h-4 w-4 text-green-600" />
              Members-Only Deals
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder="you@example.com"
                className="h-14 pl-5 rounded-2xl border-gray-200 bg-gray-50/50 text-base focus-visible:ring-green-500"
              />
            </div>
            <Link href={'/login'} className="h-14 px-8 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 shrink-0">
            Subscribe <ArrowRight className="h-5 w-5" /> 
            </Link>
          </div>

          {/* Footnote */}
          <p className="text-xs text-gray-400 flex items-center gap-1.5 pt-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Unsubscribe anytime. No spam, ever.
          </p>
        </div>

        {/* Right Side: Mobile App Promo Card */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-3xl bg-[#111827] p-8 text-white shadow-2xl border border-gray-800">
            {/* Ambient glow */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-green-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950 border border-green-800/60 text-green-400 text-xs font-semibold tracking-wide">
                <Smartphone className="h-3.5 w-3.5" /> MOBILE APP
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">Shop Faster on Our App</h3>
                <p className="text-sm text-gray-400">Get app-exclusive deals & 15% off your first order.</p>
              </div>

              {/* App Store Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
                  <svg className="h-7 w-7 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.31c.65-.79 1.09-1.89.97-2.99-.94.04-2.08.63-2.74 1.42-.58.68-1.09 1.79-.95 2.87 1.06.08 2.07-.53 2.72-1.3z" />
                  </svg>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-medium">Download on the</p>
                    <p className="text-sm font-semibold text-white leading-tight">App Store</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
                  <svg className="h-7 w-7 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.53 1.53 0 0 1-.295-.916V2.73c0-.343.107-.667.294-.916zM15.208 13.416l1.818 1.818-10.428 6.022 8.61-7.84zM17.845 10.78l2.673 1.543c.75.433.75 1.14 0 1.573l-2.673 1.543-2.023-2.023 2.023-2.636zM6.598 2.744l10.428 6.022-1.818 1.818-8.61-7.84z" />
                  </svg>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-medium">Get it on</p>
                    <p className="text-sm font-semibold text-white leading-tight">Google Play</p>
                  </div>
                </div>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-800/80 text-xs text-gray-300">
                <div className="flex text-amber-400">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                </div>
                <span className="font-semibold text-white">4.9</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">100K+ downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
