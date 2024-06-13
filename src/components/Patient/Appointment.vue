<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <HeaderPage />
  <Sidebar />
  <section id="appointment">
    <div class="wrapper">
      <div class="appointment-con">
        <div class="appointment-header-con">
          <button class="btn-primary" @click="toggleAddAppointment()">
            Book Appointment
          </button>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in appointments" :key="appointment.id">
                <td>{{ appointment.type }}</td>
                <td>
                  {{
                    appointment.status == 0
                      ? "Pending"
                      : appointment.status == 1
                      ? "On Progress"
                      : "Completed"
                  }}
                </td>
                <td class="table-btn-con">
                  <button
                    class="btn-yellow"
                    @click="toggleAppointment(appointment.id)"
                  >
                    View
                  </button>
                  <button
                    v-if="appointment.status == 0"
                    class="btn-red"
                    @click="cancelAppointment(appointment.id)"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <BookAppointment
      :visible="showAppointmentModal"
      @update:visible="toggleAddAppointment"
    />
    <ViewAppointment
      :visible="showViewAppointmentModal"
      @update:visible="toggleAppointment"
    />
    <CancelAppointment
      :visible="showCancelAppointmentModal"
      @update:visible="cancelAppointment"
    />
  </section>
</template>

<script>
import HeaderPage from "../../partials/HeaderPage.vue";
import Sidebar from "../../partials/Sidebar.vue";
import BookAppointment from "./modals/BookAppointment.vue";
import ViewAppointment from "./modals/ViewAppointment.vue";
import CancelAppointment from "./modals/CancelAppointment.vue";

export default {
  data() {
    return {
      showAppointmentModal: false,
      showViewAppointmentModal: false,
      showCancelAppointmentModal: false,
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  components: {
    HeaderPage,
    Sidebar,
    BookAppointment,
    ViewAppointment,
    CancelAppointment,
  },
  methods: {
    async fetchAppointments() {
      await this.$store.dispatch(
        "fetchAppointments",
        localStorage.getItem("user_id")
      );
    },
    toggleAddAppointment() {
      this.showAppointmentModal = !this.showAppointmentModal;

      if (this.showAppointmentModal == false) {
        this.$store.dispatch(
          "fetchAppointments",
          localStorage.getItem("user_id")
        );
      }
    },
    toggleAppointment(id) {
      this.$store.getters.getAppointment(id);
      this.showViewAppointmentModal = !this.showViewAppointmentModal;

      if (this.showViewAppointmentModal == false) {
        this.$store.dispatch(
          "fetchAppointments",
          localStorage.getItem("user_id")
        );
      }
    },
    cancelAppointment(id) {
      this.$store.getters.getAppointment(id);
      this.showCancelAppointmentModal = !this.showCancelAppointmentModal;

      if (this.showCancelAppointmentModal == false) {
        this.$store.dispatch(
          "fetchAppointments",
          localStorage.getItem("user_id")
        );
      }
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