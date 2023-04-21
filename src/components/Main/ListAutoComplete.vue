<script>
export default {
  name: 'ListAutoComplete',
  data() {
    return {

    }
  },
  props:{
    itemsComplete: Array
  },
  methods: {
    giveAddress(search) {
        let address = search;
        return this.$emit('takeAddress', address);
    }
  }
}
</script>

<template>
  <div>
    <ul v-if="itemsComplete.length > 1">
        <!-- al click figlio  -->
      <li class="p-3 cursor" v-for="search, index in itemsComplete" @click="giveAddress(search.address.freeformAddress)">
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


    .cursor {
      cursor: pointer;
    }
}

</style>
