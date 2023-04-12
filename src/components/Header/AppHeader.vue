<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      linkHover: null,
    }
  }

}
</script>

<template>
  <div class="container h-100">
    <div class="row h-100">
      <div class="col d-flex justify-content-between h-100 align-items-center">

        <!-- contenitore per il logo  -->
        <div class="logo">
          Logo
        </div>

        <!-- link per desktop  -->
        <div class="link-header d-block d-lg-none" >
          <a href="#nogo" 
          v-on:focus="linkHover=1" 
          v-on:blur="linkHover = null" 
          v-f
          :class="{
             'hover':linkHover != null && linkHover == 1,
             'notHover':linkHover != null && linkHover != 1 
             }">
            <span>
              <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
            </span>
            <span class="d-none d-sm-inline-block">
              Login
            </span>
          </a>
          <a href="#nogo" 
          v-on:focus="linkHover=2" 
          v-on:blur="linkHover = null" 
          :class="{
             'hover':linkHover != null && linkHover == 2,
             'notHover':linkHover != null && linkHover != 2 
             }">
            <span>
              <font-awesome-icon :icon="['fas', 'user-plus']" />
            </span>
            <span  class="d-none d-sm-inline-block">
              Register
            </span>
          </a>
        </div>

        <!-- link per desktop  -->
        <div class="link-header d-none d-lg-block" >
          <a href="#nogo" 
          @mouseover="linkHover=1" 
          @mouseleave="linkHover = null" 
          :class="{
             'hover':linkHover != null && linkHover == 1,
             'notHover':linkHover != null && linkHover != 1 
             }">
            <span>
              <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
            </span>
            Login
          </a>
          <a href="#nogo" 
          @mouseover="linkHover=2" 
          @mouseleave="linkHover = null" 
          :class="{
             'hover':linkHover != null && linkHover == 2,
             'notHover':linkHover != null && linkHover != 2 
             }">
            <span>
              <font-awesome-icon :icon="['fas', 'user-plus']" />
            </span>
            Register
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.logo {
  color: $color_primary;
}

.link-header {
  a {
    span:first-child{
      margin-right: 10px;
    }
    padding: 10px;
    color: $color_dark;
    text-decoration: none;
    transition: 0.5s;
    &.hover{
      color: $color_primary;
      text-decoration:underline;
    }
    &.notHover{
      opacity: 0.5;
    }
  }

}
</style>
