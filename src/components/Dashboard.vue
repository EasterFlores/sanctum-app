<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <HeaderPage />
  <Sidebar />
  <section id="dasboard">
    <div class="wrapper"></div>
  </section>
</template>

<script>
import HeaderPage from "../partials/HeaderPage.vue";
import Sidebar from "../partials/Sidebar.vue";

export default {
  data() {
    return {};
  },
  components: {
    HeaderPage,
    Sidebar
  },
};
</script>

<style scoped>
#dashboard .wrapper {
  max-width: 1440px;
}
</style>