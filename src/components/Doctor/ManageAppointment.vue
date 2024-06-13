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
                    v-if="appointment.status == 0"
                    class="btn-green"
                    @click="verifiedAppointment(appointment.id)"
                  >
                    Verified
                  </button>
                  <button
                    v-if="appointment.status == 1"
                    class="btn-green"
                    @click="doneAppointment(appointment.id)"
                  >
                    Done
                  </button>
                  <button
                    v-if="appointment.status == 2"
                    class="btn-green"
                    @click="issueMedicalRecord(appointment.id)"
                  >
                    Issue Record
                  </button>
                  <button
                    class="btn-yellow"
                    @click="toggleAppointment(appointment.id)"
                  >
                    View
                  </button>
                  <button
                    class="btn-red"
                    @click="removeAppointment(appointment.id)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ViewAppointment
      :visible="showViewAppointmentModal"
      @update:visible="toggleAppointment"
    />
    <RemoveAppointment
      :visible="showRemoveAppointmentModal"
      @update:visible="removeAppointment"
    />
  </section>
</template>

<script>
import HeaderPage from "../../partials/HeaderPage.vue";
import Sidebar from "../../partials/Sidebar.vue";
import ViewAppointment from "./modals/ViewAppointment.vue";
import RemoveAppointment from "./modals/RemoveAppointment.vue";
import axios from "axios";
export default {
  data() {
    return {
      showViewAppointmentModal: false,
      showMedicalModal: false,
      showRemoveAppointmentModal: false,
    };
  },
  mounted() {
    this.fetchDoctorAppointments();
  },
  components: {
    HeaderPage,
    Sidebar,
    ViewAppointment,
    RemoveAppointment,
  },
  methods: {
    async fetchDoctorAppointments() {
      await this.$store.dispatch(
        "fetchDoctorAppointments",
        localStorage.getItem("user_id")
      );
    },
    toggleAppointment(id) {
      this.$store.getters.getAppointment(id);
      this.showViewAppointmentModal = !this.showViewAppointmentModal;

      if (this.showViewAppointmentModal == false) {
        this.$store.dispatch(
          "fetchDoctorAppointments",
          localStorage.getItem("user_id")
        );
      }
    },
    removeAppointment(id) {
      this.$store.getters.getAppointment(id);
      this.showRemoveAppointmentModal = !this.showRemoveAppointmentModal;

      if (this.showRemoveAppointmentModal == false) {
        this.$store.dispatch(
          "fetchDoctorAppointments",
          localStorage.getItem("user_id")
        );
      }
    },
    async verifiedAppointment(id) {
      this.$swal
        .fire({
          text: "Are you sure you want to mark as verified this appointment?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Verfied it!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.patch(
                this.$store.state.apiUrl + "/verifiedAppointment/" + id,
                {}
              );

              if (response.status === 200) {
                this.$swal.fire({
                  title: "Verified!",
                  text: "Your appointment has been verified.",
                  icon: "success",
                });
                this.$store.dispatch(
                  "fetchDoctorAppointments",
                  localStorage.getItem("user_id")
                );
              }
            } catch (error) {
              this.$swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error",
              });
            }
          }
        });
    },
    async doneAppointment(id) {
      this.$swal
        .fire({
          text: "Are you sure you want to mark as done this appointment?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Done it!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.patch(
                this.$store.state.apiUrl + "/doneAppointment/" + id,
                {}
              );

              if (response.status === 200) {
                this.$swal.fire({
                  title: "Done!",
                  text: "Your appointment has been mark as done.",
                  icon: "success",
                });
                this.$store.dispatch(
                  "fetchDoctorAppointments",
                  localStorage.getItem("user_id")
                );
              }
            } catch (error) {
              this.$swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error",
              });
            }
          }
        });
    },
    async issueMedicalRecord(id) {
      this.$swal
        .fire({
          text: "Are you sure you want to issue an medical record this patient?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Issue it!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.post(
                this.$store.state.apiUrl + "/issueMedicalRecord/" + id,
                {}
              );

              if (response.status === 200) {
                this.$swal.fire({
                  title: "Done!",
                  text: "Your patient have medical record.",
                  icon: "success",
                });

                console.log(response.data);
                this.$store.dispatch(
                  "fetchDoctorAppointments",
                  localStorage.getItem("user_id")
                );
              }
            } catch (error) {
              this.errors = error.response.data.errors;
            }
          }
        });
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