<script>
import { delay } from "lodash";

import AppSwiper from "./AppSwiper.vue"

export default {
  name: "AppCard",
  props: {
    apartment: Object,
    caricamento: Boolean,
  },
  data() {
    return {
      delay: false,
    };
  },
  components: {
    AppSwiper
  },
  methods: {},
  created() {
    setTimeout(() => (this.delay = true), 1000);
  },
};
</script>

<template>
  <template v-if="delay">
    <div class="col">
      <router-link :to="{ name: 'apartments-show', params: { slug: apartment.slug } }" class="text-decoration-none">
        <div class="card position-relative">
          <font-awesome-icon v-if="apartment.sponsored" class="position-absolute my-icon-sponsor rounded-circle"
            :icon="['fas', 'rocket']" beat-fade />
          <template v-if="apartment.full_image_gallery.length == 0" >
            <img :src="apartment.full_path_main_img" class="card-img" alt="img-card"/>
          </template>

          <template v-else>
            <AppSwiper :imgDefault="apartment.full_path_main_img" :images="apartment.full_image_gallery"  />
          </template>

          <div class="card-body text-center text-lg-start">
            <h5 class="card-title">
              {{ apartment.title }}
            </h5>
            <div class="card-text">
              <div>
                {{ apartment.address }}
              </div>
              <div>{{ apartment.price }} &euro; notte</div>
              <div>{{ apartment.mq }} mq</div>
            </div>
          </div>
        </div>
      </router-link>
      <!-- Da inserire rotta / nel caso preferiamo centrale text-center -->
    </div>
  </template>

  <template v-else>
    <!-- placeholder -->
    <!-- finchè carica placeholder, altrimenti card -->
    <div class="col">
      <div class="card" aria-hidden="true">
        <span class="card-img" style="background-color: lightgray"></span>
        <div class="card-body text-center text-lg-start">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <div class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.card {
  padding: 0;
  border: none;
  border-radius: 5px;
  background-color: transparent;

  .card-img {
    max-width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 5px;
  }

  .my-icon-sponsor {
    top: 10px;
    right: 10px;
    color: $color_primary;
    padding: 10px;
    background-color: $color_light;
    z-index: 2;
  }
}

.card-body {
  padding: 1rem 0;
  background-color: transparent;

  .card-title {
    color: $color_dark;
  }

  .card-text {
    color: $color_gray;
    font-size: 0.8rem;
    padding: 0.5rem 0;

    div {
      padding: 0.2rem 0;
    }
  }
}

// Non sono convinta della larghezza del bottone
.my-btn {
  font-size: 0.8rem;
  // width: 100%;
  padding: 0.5rem;
  display: inline-block;
  background-color: $color_light_gray;
  color: $color_dark;
  text-decoration: none;
  border-radius: 3px;
  border: 1px solid $color_gray;

  &:hover {
    background-color: $color_primary;
    color: $color_light;
    border: none;
  }
}
</style>
