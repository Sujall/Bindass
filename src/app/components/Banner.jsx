"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const bannerSlides = [
    { id: 1, image: "/images/samsung-galaxy-giveaway-banner.png" },
    { id: 2, image: "/images/cash-giveaway-thumbnail.png" },
    { id: 3, image: "/images/iphone-15-giveaway-banner.jpg" },
    { id: 4, image: "/images/samsung-galaxy-giveaway-banner.png" },
  ];

  return (
    <div className="w-full px-1">
      <div className="w-full max-w-[480px] mx-auto h-72 relative rounded-[16px] overflow-hidden">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="h-full"
        >
          {bannerSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-72">
                <Image
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  fill
                  sizes="(max-width: 480px) 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
