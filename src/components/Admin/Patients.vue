<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <HeaderPage />
  <Sidebar />
  <section id="patient">
    <div class="wrapper">
      <div class="patient-con">
        <div class="patient-header-con">
          <button class="btn-primary" @click="toggleAddPatient()">
            Add Patient
          </button>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in patients" :key="patient.id">
                <td>{{ patient.fullname }}</td>
                <td>{{ patient.email }}</td>
                <td>{{ patient.contact }}</td>
                <td>{{ patient.address }}</td>
                <td class="table-btn-con">
                  <select
                    name="selectAction"
                    v-model="selectedAction"
                    @change="handleSelectChange($event, patient.id)"
                  >
                    <option value="" disabled hidden selected>
                      Select Action
                    </option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>
                    <option value="Remove">Remove Patient</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <AddPatient
      :visible="showPatientModal"
      @update:visible="toggleAddPatient"
    />
    <EditPatient :visible="showEditModal" @update:visible="toggleEditPatient" />
    <DeletePatient
      :visible="showDeletePatient"
      @update:visible="toggleDeletePatient"
    />
  </section>
</template>

<script>
import HeaderPage from "../../partials/HeaderPage.vue";
import Sidebar from "../../partials/Sidebar.vue";
import AddPatient from "./modals/AddPatient.vue";
import EditPatient from "./modals/EditPatient.vue";
import DeletePatient from "./modals/DeletePatient.vue";
import axios from "axios";

export default {
  data() {
    return {
      selectedAction: "",
      showPatientModal: false,
      showEditModal: false,
      showDeletePatient: false,
    };
  },
  components: {
    HeaderPage,
    Sidebar,
    AddPatient,
    EditPatient,
    DeletePatient,
  },
  mounted() {
    this.fetchPatients();
  },
  methods: {
    async fetchPatients() {
      await this.$store.dispatch("fetchPatients");
    },
    handleSelectChange(event, id) {
      let selectedAction = event.target.value;

      if (selectedAction === "Delete") {
        this.toggleDeletePatient(id);
      } else if (selectedAction === "Edit") {
        this.toggleEditPatient(id);
      } else if (selectedAction === "Remove") {
        this.toggleRemovePatient(id);
      }
    },
    toggleAddPatient() {
      this.showPatientModal = !this.showPatientModal;

      if (this.showPatientModal == false) {
        this.resetSelectAction();
        this.$store.dispatch("fetchPatients");
      }
    },
    toggleEditPatient(id) {
      this.$store.getters.getPatient(id);
      this.showEditModal = !this.showEditModal;

      if (this.showEditModal == false) {
        this.resetSelectAction();
        this.$store.dispatch("fetchPatients");
      }
    },
    toggleDeletePatient(id) {
      this.$store.getters.getPatient(id);
      this.showDeletePatient = !this.showDeletePatient;

      if (this.showDeletePatient == false) {
        this.resetSelectAction();
        this.$store.dispatch("fetchPatients");
      }
    },
    toggleRemovePatient(id) {
      this.$swal
        .fire({
          text: "Are you sure you want to remove this patient?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Remove it!",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await axios.delete(
                this.$store.state.apiUrl + "/removePatient/" + id,
                {}
              );

              if (response.status === 200) {
                this.$swal.fire({
                  title: "Success!",
                  text: response.data.message,
                  icon: "success",
                });
                this.resetSelectAction();
                this.$store.dispatch("fetchPatients");
              }
            } catch (error) {
              this.$swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error",
              });
              this.resetSelectAction();
            }
          }
        });
    },
    resetSelectAction() {
      this.selectedAction = "";
    },
  },
  computed: {
    patients() {
      return this.$store.getters.getPatients;
    },
  },
};
</script>

<style>
#patient .patient-con {
  padding: 100px 20px 100px 100px;
}

#patient .patient-header-con {
  display: flex;
  justify-content: end;
  margin-bottom: 30px;
}
</style>