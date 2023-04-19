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
        // non è definito address
        let address = search;
        return this.$emit('takeAddress', address);
    }
  }
}
</script>

<template>
  <div class="card radius" style="width: 100%;">
    <ul v-if="itemsComplete.length > 1">
        <!-- al click figlio  -->
      <li class="p-2" v-for="search, index in itemsComplete" @click="giveAddress(search.address.freeformAddress)">
        {{ search.address.freeformAddress }}
      </li>
    </ul>
    <p v-else>
      No data
    </p>
  </div>
</template>

<style lang="scss" scoped>
.radius {
    border-radius: 0 0 5px 5px;
    border: 0 1px 1px 1px solid $color_primary;
    @include inputCheck;
}
</style>
