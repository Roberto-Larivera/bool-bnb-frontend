<script>
// Axios
import axios from 'axios';

import { store } from './store.js';
import sessionMixin from './mixins/session.js';
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
  mixins: [sessionMixin],
  data() {
    return {
      store,
      scrolled: false,
    }
  },
  created() {
    this.checkLogin();
    console.log(this.getSession('user'));
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
    },
    checkLogin() {
      const urlParams = new URLSearchParams(window.location.search);
      const login = urlParams.get('login');

      if (login == 'true') {
        this.setSession('login', login);
        this.setSession('auth', urlParams.get('auth'));
        const value = this.getSession('login');
        const id = this.getSession('auth');
        console.log('sei entrato', value, id); // output: 'value'
        this.getUser()

      } else if (login == 'false') {
        this.removeSession('login');
        this.removeSession('auth');
        this.removeSession('user');
        console.log('sei uscito'); // output: 'value'
      }
    },
    getUser() {
      axios.get(`${this.store.pathServerHome}login`, {
        params: {
          'user_id': this.getSession('auth'),
        }
      })
        .then(response => {
          console.log(response);
          this.setSession('user', response.data.user);
          console.log(this.getSession('user'));
        }
        );
    },
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
