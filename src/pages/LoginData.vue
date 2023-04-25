<script>

import { store } from "../store.js";

// Axios
import axios from "axios";

export default {
  name: "AppHome",
  data() {
    return {};
  },
  mounted() {
    this.$router.push("/")
  },
};
</script>

<template>
  <section class="my-5 min-vh-md-100 d-flex align-items-center"></section>
</template>

<style lang="scss" scoped></style>
