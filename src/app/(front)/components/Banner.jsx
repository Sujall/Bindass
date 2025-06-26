"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import apiClient from "@/api/apiClient";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await apiClient.get("/giveaways/media/banners");
        const data = res.data.banners;
        console.log(data)
        setBanners(data);
      } catch (err) {
        console.error("Failed to fetch banners:", err.response?.data || err.message);
      }
    };

    fetchBanners();
  }, []);

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
          {banners.map((banner) => (
            <SwiperSlide key={banner._id}>
              <div className="relative w-full h-full transition-transform duration-500 hover:scale-105">
                <Image
                  src={banner.url} // Make sure image URL is absolute or handled via next.config.js rewrites
                  alt={banner.title || "Banner"}
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
