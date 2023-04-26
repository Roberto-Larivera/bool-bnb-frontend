<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useSwiper } from 'swiper/vue';
// import required modules
import { FreeMode, Pagination, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {
  name: 'AppSwiper',
  data() {
    return {

    }
  },
  props:{
    imgDefault: String,
    images: Array

  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const swiper = useSwiper();
    return {
      modules: [FreeMode, Pagination, Navigation],
      swiper
    };
  },
};
</script>

<template>
  <swiper :slidesPerView="1" :freeMode="true" :loop="true" :pagination="{
      clickable: true,
    }" :navigation="true" :modules="modules" class="mySwiper">
    <swiper-slide>
      <img :src="imgDefault" class="swiper-card-img"/>
    </swiper-slide>


    <swiper-slide v-for="(image, index) in images" >
      <img :src="image.full_path_image_gallery" class="swiper-card-img"/>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss">
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  margin-left: auto;
  margin-right: auto;
}
.swiper-button-prev,
.swiper-button-next {
color: #000;
font-size: 20px;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
color: $color_primary;
}


.swiper-card-img {
    max-width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 5px;
  }
  .swiper-pagination-bullet-active{
    background-color:  $color_primary !important;
  }
</style>
