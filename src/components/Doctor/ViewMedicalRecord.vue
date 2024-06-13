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
                  <button
                    class="btn-yellow"
                    @click="editMedicalRecord(medical.id)"
                  >
                    Edit
                  </button>
                  <button class="btn-green" @click="viewRecord(medical.id)">
                    View Record
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <EditMedicalRecord
      :visible="showEditMedicalRecordModal"
      @update:visible="editMedicalRecord"
    />
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
import EditMedicalRecord from "./modals/EditMedicalRecord.vue";

export default {
  data() {
    return {
      showEditMedicalRecordModal: false,
      showViewRecordModal: false,
    };
  },
  mounted() {
    this.fetchMedicals();
  },
  components: {
    HeaderPage,
    Sidebar,
    ViewMedicalRecord,
    EditMedicalRecord
  },
  methods: {
    async fetchMedicals() {
      await this.$store.dispatch(
        "fetchMedicals",
        localStorage.getItem("user_id")
      );
    },
    editMedicalRecord(id) {
      this.$store.getters.getMedicalRecord(id);
      this.showEditMedicalRecordModal = !this.showEditMedicalRecordModal;

      if (this.showEditMedicalRecordModal == false) {
        this.$store.dispatch("fetchMedicals", localStorage.getItem("user_id"));
      }
    },
    viewRecord(id) {
      this.$store.getters.getMedicalRecord(id);
      this.showViewRecordModal = !this.showViewRecordModal;

      if (this.showViewRecordModal == false) {
        this.$store.dispatch("fetchMedicals", localStorage.getItem("user_id"));
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

#record .table-btn-con {
  display: flex;
  gap: 10px;
}
</style>