<script>
import { store } from '../../store.js';
export default {
  name: 'ListAutoComplete',
  data() {
    return {
      store,
    }
  },
  props:{
    itemsComplete: Array
  },
  methods: {
    // giveAddress(search) {
    //     let address = search;
    //     return this.$emit('takeAddress', address);
    // }
    giveAddress(address,lat,lon) {
        this.store.address = address;
        this.store.lat = lat;
        this.store.lon = lon;
        this.store.addressListVisible = false;
        // return this.$emit('takeAddress', address);
    }
  }
}
</script>

<template>
  <div>
    <ul v-if="itemsComplete.length > 1">
        <!-- al click figlio  -->
      <li class="p-3" v-for="search, index in itemsComplete" @click="giveAddress(search.address.freeformAddress,search.position.lat,search.position.lon)">
        {{ search.address.freeformAddress }}
      </li>
    </ul>
    <p class="p-3" v-else>
      No data
    </p>
  </div>
</template>

<style lang="scss" scoped>
.radius {
  border-radius: 0 0 5px 5px;
  border: 2px solid $color_primary;
  border-top: 0;
}

li{
  cursor: pointer;
  &:hover{
    background-color: rgb(255, 56, 92, 0.25);

}
}

</style>
