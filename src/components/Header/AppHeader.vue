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
        <div class="logo">
          Logo
        </div>
        <div class="link-header" >
          <a href="#nogo" @mouseover="linkHover=1" @mouseleave="linkHover = null" :class="{linkHover == 1 ?'hover':'', }">
            <span>
              <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
            </span>
            Login
          </a>
          <a href="#nogo" @mouseover="linkHover=1" @mouseleave="linkHover = null" :class="linkHover == 1 ?'hover':''">
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
    span{
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
    &.nothover{
      opacity: 0.5;
    }
  }

}
</style>
