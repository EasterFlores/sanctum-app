<template>
  <HeaderPage />
  <Sidebar />
  <section id="record">
    <div class="wrapper">
      <div class="record-con">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="medical in records" :key="medical.id">
                <td>{{ medical.fullname }}</td>
                <td>{{ medical.address }}</td>
                <td>{{ medical.email }}</td>
                <td class="table-btn-con">
                  <button class="btn-primary" @click="viewRecord(medical.id)">
                    View Record
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ViewMedicalRecord
      :visible="showViewRecordModal"
      @update:visible="viewRecord"
    />
  </section>
</template>

<script>
import HeaderPage from "../../partials/HeaderPage.vue";
import Sidebar from "../../partials/Sidebar.vue";
import ViewMedicalRecord from "./modals/ViewMedicalRecord.vue";

export default {
  data() {
    return {
      showViewRecordModal: false,
    };
  },
  mounted() {
    this.getAllMedicalRecords();
  },
  components: {
    HeaderPage,
    Sidebar,
    ViewMedicalRecord,
  },
  methods: {
    async getAllMedicalRecords() {
      await this.$store.dispatch("getAllMedicalRecords");
    },
    viewRecord(id) {
      this.$store.getters.getMedicalRecord(id);
      this.showViewRecordModal = !this.showViewRecordModal;

      if (this.showViewRecordModal == false) {
        this.$store.dispatch("getAllMedicalRecords");
      }
    },
  },
  computed: {
    records() {
      return this.$store.getters.getMedicalRecords;
    },
  },
};
</script>

<style scoped>
#record .wrapper {
  max-width: 1440px;
}

#record .record-con {
  padding: 100px 20px 100px 100px;
}
</style>