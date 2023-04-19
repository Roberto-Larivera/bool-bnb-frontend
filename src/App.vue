<script>
import { store } from './store.js';
import AppHeader from './components/Header/AppHeader.vue';
import AppFooter from './components/Footer/AppFooter.vue';
import NavBarResponsive from "./components/Footer/NavBarResponsive.vue";
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    NavBarResponsive
  },
  data() {
    return {
      store,
      scrolled: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY >= 10) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    }
  }

}
</script>

<template>
  <div>
    <header :class="{ 'shadow': scrolled }">
      <AppHeader />
    </header>
    <main>
      <router-view></router-view>
    </main>
    <nav class="d-block d-lg-none sticky-bottom shadow-lg">
      <NavBarResponsive />
    </nav>
    <footer class="d-none d-lg-block">
      <AppFooter />
    </footer>
  </div>
</template>

<style lang="scss">
@import './style/main.scss';

header {
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  // border-bottom: 2px solid $color_light_gray;
  background-color: $color_light;
}

main {
  margin-top: 70px;
  margin-bottom: 50px;
  min-height: calc(100vh - 120px);
}

footer {
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  transition: 0.5s;
  border-top: 2px solid $color_light_gray;
  background-color: $color_light;
}

nav {
  background-color: $color_light;
  border-top: 2px solid $color_light_gray;
}
</style>
