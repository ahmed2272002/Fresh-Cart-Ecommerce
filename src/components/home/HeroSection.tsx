"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroSection from "@/assets/heroSection.png";
import Link from "next/link";
import "./hero.css";

export default function HeroSection() {
  const slides = [
    {
      title: "Fresh Products Delivered",
      subtitle: "to your Door",
      description: "Get 20% off your first order",
      cta: "Shop Now",
      ctaSecondary: "View Deals",
      image: heroSection,
    },
    {
      title: "Organic & Healthy Food",
      subtitle: "Everyday Fresh",
      description: "Handpicked vegetables & fruits daily",
      cta: "Shop Now",
      ctaSecondary: "View Deals",
      image: heroSection,
    },
    {
      title: "Best Quality Products",
      subtitle: "Guaranteed Freshness",
      description: "Supermarket items delivered in minutes",
      cta: "Shop Now",
      ctaSecondary: "View Deals",
      image: heroSection,
    },
  ];

  return (
    <section className="relative hero-swiper-container h-[400px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="relative h-[400px]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-[400px] w-full overflow-hidden">
              <Image
                src={slide.image}
                alt="Fresh products hero"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,128,0,0.6),rgba(0,128,0,0.25))]" />
              <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 text-white max-w-lg z-10">
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  {slide.title}
                  <span className="block mt-2">{slide.subtitle}</span>
                </h2>
                <p className="mt-4 text-lg opacity-95">{slide.description}</p>
                <div className="mt-8 flex gap-4">
                  <Link href="/products">
                    <Button className="bg-white text-green-700 hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-lg shadow">
                      {slide.cta}
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="outline" className="bg-transparent text-white border border-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-lg">
                      {slide.ctaSecondary}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
