<script>
import { store } from './store.js';
import AppHeader from './components/Header/AppHeader.vue';
import AppFooter from './components/Footer/AppFooter.vue';
export default{
  name: 'App',
  components:{
    AppHeader,
    AppFooter,
  },
  data(){
    return{
      store,
    }
  },
  
}
</script>

<template>
  <div>
    <header>
      <AppHeader/>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <AppFooter/>
    </footer>
  </div>
</template>

<style lang="scss">
@import './style/main.scss';
</style>
