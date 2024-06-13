<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <HeaderPage />
  <Sidebar />
  <section id="patient">
    <div class="wrapper">
      <div class="patient-con">
        <div class="patient-header-con">
        
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
              <tr v-for="patient in patients" :key="patient.user_id">
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
                    <option value="View">View</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ViewPatient
      :visible="showViewPatientModal"
      @update:visible="toggleViewPatient"
    />
    <EditPatient :visible="showEditModal" @update:visible="toggleEditPatient" />
  </section>
</template>
  
  <script>
import HeaderPage from "../../partials/HeaderPage.vue";
import Sidebar from "../../partials/Sidebar.vue";
import EditPatient from "./modals/EditPatient.vue";
import ViewPatient from "./modals/ViewPatient.vue";

export default {
  data() {
    return {
      selectedAction: "",
      showPatientModal: false,
      showEditModal: false,
      showViewPatientModal: false,
    };
  },
  components: {
    HeaderPage,
    Sidebar,
    EditPatient,
    ViewPatient,
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

      if (selectedAction === "View") {
        this.toggleViewPatient(id);
      } else if (selectedAction === "Edit") {
        this.toggleEditPatient(id);
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
    toggleViewPatient(id) {
      this.$store.getters.getPatient(id);
      this.showViewPatientModal = !this.showViewPatientModal;

      if (this.showViewPatientModal == false) {
        this.resetSelectAction();
        this.$store.dispatch("fetchPatients");
      }
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
  
  <style scoped>
#patient .patient-con {
  padding: 100px 20px 100px 100px;
}

#patient .patient-header-con {
  display: flex;
  justify-content: end;
  margin-bottom: 30px;
}
</style>

