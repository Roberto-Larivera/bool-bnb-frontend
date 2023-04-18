<script>
export default {
  name: 'ListAutoComplete',
  data() {
    return {

    }
  },
  props:{
    itemsComplete: Array

  }
}
</script>

<template>
  <div class="card">
    <ul v-if="itemsComplete != null">
      <li v-for="search in itemsComplete">
        {{ search.address.freeformAddress }}
      </li>
    </ul>
    <p v-else>
      No data
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
