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
  <div class="container">
    <div class="row">
      <div class="col">
        <ul class="d-flex">
          <li>
            <p class>
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
    list-style-type: none;
    margin-right: 15px;
    span{
      color: $color_primary;
    }
  }
}
</style>
