<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      linkHover: null,
    }
  },
  methods: {
    getImagePath(imgPath){
      return new URL( imgPath, import.meta.url).href;
    }
  },

}
</script>

<template>
  <div class="container h-100">
    <div class="row h-100">
      <div class="col d-flex justify-content-between h-100 align-items-center">

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
        <div class="link-header">
          <a href="#nogo" @mouseover="linkHover = 1" @mouseleave="linkHover = null" :class="{
            'hover': linkHover != null && linkHover == 1,
            'notHover': linkHover != null && linkHover != 1
          }">
            <span>
              <font-awesome-icon :icon="['fas', 'user']" />
            </span>
            Login
          </a>
  
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a.logo_site {
  @include logo_page;
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

    &.hover {
      color: $color_primary;
      text-decoration: underline;
    }

    &.notHover {
      opacity: 0.5;
    }
  }

}
</style>
