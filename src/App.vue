<script>
// Axios
import axios from "axios";

import { store } from "./store.js";
import sessionMixin from "./mixins/session.js";
import AppHeader from "./components/Header/AppHeader.vue";
import AppFooter from "./components/Footer/AppFooter.vue";
import NavBarResponsive from "./components/Footer/NavBarResponsive.vue";
export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    NavBarResponsive,
  },
  mixins: [sessionMixin],
  data() {
    return {
      store,
      scrolled: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  created() {
    this.checkLogin();
    if (this.getSession("auth")) {
      this.setUserData();
    }
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
      const login = urlParams.get("login");

      if (login == "true") {
        //Gestione LogIn User
        this.setSession("login", login);
        this.setSession("auth", urlParams.get("auth"));
        this.getUser();
      } else if (login == "false") {
        //Gestione Logout User
        this.removeSession("login");
        this.removeSession("auth");
        this.removeSession("name");
        this.removeSession("surname");
        this.removeSession("email");
      }
    },
    hideAddressList() {
        this.store.addressListVisible = false;
    },
    getUser() {//Funzione se user ha loggato recupero i dati tramite userid
      axios
        .get(`${this.store.pathServerHome}login`, {
          params: {
            user_id: this.getSession("auth"),
          },
        })
        .then((response) => {
          this.setSession("name", response.data.user.name);
          this.setSession("surname", response.data.user.surname);
          this.setSession("email", response.data.user.email)
          this.setUserData();
        });
    },
    setUserData() { //Funzione che imposta i dati degli utenti sullo store
      this.store.user_name = this.getSession("name");
      this.store.user_surname = this.getSession("surname");
      this.store.user_email = this.getSession("email");
    },
  },
};
</script>

<template>
  <div @click="hideAddressList()">
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
@import "./style/main.scss";

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
