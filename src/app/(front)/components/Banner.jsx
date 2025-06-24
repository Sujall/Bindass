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
    <div className="w-full px-2 py-2 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto h-80 md:h-72 relative rounded-xl overflow-hidden shadow-lg">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{ 
            delay: 3500, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
            bulletClass: "swiper-pagination-bullet !bg-gray-300 !opacity-100",
            bulletActiveClass: "!bg-white"
          }}
          modules={[Autoplay, Pagination]}
          className="h-full"
          loop={true}
        >
          {bannerSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full transition-transform duration-500 hover:scale-105">
                <Image
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  className="object-cover transition-opacity duration-300"
                  priority
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;