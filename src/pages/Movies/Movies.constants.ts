import { SwiperOptions } from "swiper";

export const swiperOptions: SwiperOptions = {
  navigation: true,
  keyboard: true,
  slidesPerView: 1,
  breakpoints: {
    "320": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "768": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "1024": {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    "1400": {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
};
