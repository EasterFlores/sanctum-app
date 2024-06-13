<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <HeaderPage />
  <Sidebar />
  <section id="appointment">
    <div class="wrapper">
      <div class="appointment-con">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Patient Name</th>
                <th>Doctor Assigned</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in appointments" :key="appointment.id">
                <td>{{ appointment.type }}</td>
                <td>{{ appointment.patient_name }}</td>
                <td>{{ appointment.doctor_name }}</td>
                <td>
                  {{
                    appointment.status == 0
                      ? "Pending"
                      : appointment.status == 0
                      ? "On Progress"
                      : "Completed"
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script>
import HeaderPage from "../../partials/HeaderPage.vue";
import Sidebar from "../../partials/Sidebar.vue";

export default {
  data() {
    return {};
  },
  mounted() {
    this.fetchAllAppointments();
  },
  components: {
    HeaderPage,
    Sidebar,
  },
  methods: {
    async fetchAllAppointments() {
      await this.$store.dispatch("fetchAllAppointments");
    },
  },
  computed: {
    appointments() {
      return this.$store.getters.getAppointments;
    },
  },
};
</script>
  
  <style>
#appointment .wrapper {
  max-width: 1440px;
}

#appointment .appointment-con {
  padding: 100px 20px 100px 100px;
}

#appointment .appointment-header-con {
  display: flex;
  justify-content: end;
  margin-bottom: 30px;
}

#appointment .table-btn-con {
  display: flex;
  gap: 10px;
}
</style>