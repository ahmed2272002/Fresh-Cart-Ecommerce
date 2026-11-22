"use client";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "../../globals.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 mb-3"
      >
        {images.map((img , index) => {
          return (
            <>
              <SwiperSlide key={"upSlider" + index}>
                <Image width={500} height={500} loading="eager" alt={`thumbnail-Image-${index}`} src={img} />
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((img , index) => {
          return (
            <>
              <SwiperSlide key={"downSlider" + index}>
                <Image width={500} height={500} alt={`thumbnail-Image-${index}`} src={img} />
              </SwiperSlide>
            </>
          );
        })}
        
      </Swiper>
    </>
  );
}
