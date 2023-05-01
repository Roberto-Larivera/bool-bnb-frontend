<script>
import { store } from '../../store.js';
export default {
  name: 'AppHeader',
  data() {
    return {
      linkHover: null,
      store,
      pathServer: store.pathServer
    }
  },
  methods: {
    getImagePath(imgPath) {
      return new URL(imgPath, import.meta.url).href;
    }
  },

}
</script>

<template>
  <div class="container h-100">
    <div class="row h-100">
      <div class="col d-flex justify-content-center justify-content-sm-between h-100 align-items-center">

        <!-- contenitore per il logo  -->
        <router-link :to="{ name: 'home' }" class="logo_site first-letter:navbar-brand d-flex  align-items-center h-100">
          <div class=" h-100">
            <img :src="getImagePath(`../../assets/logo.svg`)" alt="">
          </div>
          <span>
            BoolBnB
          </span>
        </router-link>


        <!-- link per login  -->
        <div class="link-header d-none d-lg-block">
          <nav>
            <ul class="d-flex justify-content-end gx-3">
              <li class="p-2">
                <router-link :to="{ name: 'home' }" @mouseover="linkHover = 1" @mouseleave="linkHover = null" :class="{
                  'hover': this.$route.path == '/' || linkHover != null && linkHover == 1,
                  // 'notHover': linkHover != null && linkHover != 1,
                  // 'notHover': this.$route.path != '/',
                }" class="p-2 text-decoration-none">
                  <font-awesome-icon :icon="['fas', 'house']" />
                  Home
                </router-link>
              </li>
              <li class="p-2">
                <router-link :to="{ name: 'apartments-index' }" @mouseover="linkHover = 2" @mouseleave="linkHover = null"
                  :class="{
                    'hover': this.$route.path == '/apartments' || linkHover != null && linkHover == 2,
                    // 'notHover': linkHover != null && linkHover != 2,
                    // 'notHover': this.$route.path != '/apartments',
                  }" class="p-2  text-decoration-none">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                  Appartamenti
                </router-link>
              </li>
              <li class="p-2">
                <a :href="pathServer" @mouseover="linkHover = 3" @mouseleave="linkHover = null" :class="{
                  'hover': linkHover != null && linkHover == 3,
                  // 'notHover': linkHover != null && linkHover != 3
                }" class="p-2 text-decoration-none">
                  <span>
                    <font-awesome-icon :icon="['fas', 'user']" />
                  </span>
                  <span class="d-none d-sm-inline-block">
                    {{ store.user_name }}
                  </span>
                </a>
              </li>
            </ul>
          </nav>


        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a.logo_site {
  @include logo_page;
}
nav{
  background-color: transparent;
  border: none;
}
.link-header {
  a {
    span:first-child {
      margin-right: 10px;
    }

    padding: 10px;
    color: $color_dark;
    text-decoration: none;
    transition: 0.5s;
    opacity: 0.5;

    &.hover {
      color: $color_primary;
      text-decoration: underline;
      opacity: 1;
    }

    // &.notHover {
    //   opacity: 0.5;
    // }
  }

}
</style>
