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
header{
  height: 70px;
}
main{
  min-height: calc(100vh - 120px);
}
footer{
  height: 50px;
}
</style>
