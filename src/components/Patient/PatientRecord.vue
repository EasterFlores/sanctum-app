<template>
  <HeaderPage />
  <Sidebar />
  <section id="account">
    <div class="wrapper">
      <div class="account-con">
        <h4>{{ this.$store.state.patient.fullname }}</h4>
        <h6>Basic Information</h6>
        <p>{{ this.$store.state.patient.email }}</p>
        <p>{{ this.$store.state.patient.address }}</p>
        <p>{{ this.$store.state.patient.contact }}</p>
        <p>{{ this.$store.state.patient.height }}</p>
        <p>{{ this.$store.state.patient.weight }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import HeaderPage from "../../partials/HeaderPage.vue";
import Sidebar from "../../partials/Sidebar.vue";

export default {
  data() {
    return {
      showViewRecordModal: false,
    };
  },
  mounted() {
    this.$store.getters.getPatient(localStorage.getItem("user_id"));
  },
  components: {
    HeaderPage,
    Sidebar,
  },
  methods: {},
};
</script>

<style scoped>
#account .wrapper {
  max-width: 1440px;
}

#account .account-con {
  padding: 100px 20px 100px 100px;
}

#account .account-con h4 {
  margin-bottom: 30px;
}

#account .account-con h6 {
  font-size: 18px;
  font-weight: 600;
  color: var(--global-color-primary);
}
</style>