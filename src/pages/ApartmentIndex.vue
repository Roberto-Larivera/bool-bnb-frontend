<script>

import AppCard from '../components/Main/AppCard.vue';

export default {
  name: 'ApartmentIndex',
  components:  {
    AppCard
  },
  data(){
    return{
        apartment: []
    }
  }
  
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="py-3">
                    Esplora gli appartamenti
                </h1>

                <h2>
                    Ricerca avanzata
                </h2>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row g-3">
            <AppCard :apartment="apartment" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
