"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const bannerSlides = [
    {
      id: 1,
      prize: "5,000",
      image: "/images/asus-laptop-thumbnail.jpg.png",
    },
    {
      id: 2,
      prize: "5,000",
      image: "/images/asus-laptop-thumbnail.jpg(1).png",
    },
    {
      id: 3,
      prize: "10,000",
      image: "/images/asus-laptop-thumbnail.jpg(2).png",
    },
    {
      id: 4,
      prize: "10,000",
      image: "/images/asus-laptop-thumbnail.jpg(3).png",
    },
    //   {
    //     id: 5,
    //     prize: "10,000",
    //     image: "/images/asus-laptop-thumbnail.jpg(2).png"
    //   },
    //   {
    //     id: 6,
    //     prize: "10,000",
    //     image: "/images/asus-laptop-thumbnail.jpg(2).png"
    //   },
    //   {
    //     id: 7,
    //     prize: "10,000",
    //     image: "/images/asus-laptop-thumbnail.jpg(2).png"
    //   },
    //   {
    //     id: 8,
    //     prize: "10,000",
    //     image: "/images/asus-laptop-thumbnail.jpg(2).png"
    //   },
  ];

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {bannerSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-96 w-full">
              <Image
                src={slide.image}
                alt={`${slide.prize} Giveaway Background`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4 py-8">
                <h2 className="text-4xl font-bold mb-2 uppercase">Giveaway</h2>
                <p className="text-6xl font-extrabold mb-4">{slide.prize}</p>
                <button className="bg-white text-purple-600 font-bold py-2 px-8 rounded-full mb-4 hover:bg-gray-100 transition-colors">
                  JOIN NOW
                </button>
                <p className="text-lg">BINADDA.COM</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
