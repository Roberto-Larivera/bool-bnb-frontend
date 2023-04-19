<script>
export default {
  name: 'AppFooter',
  data() {
    return {

    }
  }

}
</script>

<template>
  <div class="container h-100">
    <div class="row h-100">
      <div class="col h-100">
        <ul class=" h-100 d-flex align-items-center">
          <li>
            <p class="mb-0">
              &copy; 2023 BoolBnB
            </p>
          </li>
          <li class="d-none d-md-block">
            <span>
              Andrea - Emanuela - Francesca - Roberto - Samuel
            </span>
          </li>
          <li>
            Privacy
          </li>
          <li>
            Termini
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
ul {
  li {
    font-size: 0.9rem;
    margin-right: 15px;
    span{
      color: $color_primary;
    }
  }
}
</style>
