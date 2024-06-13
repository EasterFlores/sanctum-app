<template>
  <div
    v-if="openClose"
    class="modal fade show"
    tabindex="-1"
    aria-hidden="true"
    id="viewMedical"
    style="display: block"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h4>Patient Medical Record</h4>
          <div class="patient-information" v-if="record">
            <div class="basic-information">
              <h6>Patient Information</h6>
              <p>{{ record.user_fullname }}</p>
              <p>{{ record.user_contact }}</p>
              <p>{{ record.user_address }}</p>
            </div>
            <div class="stats-con">
              <div class="stats">
                <h6>Birthday</h6>
                <p>{{ record.birthday }}</p>
              </div>
              <div class="stats">
                <h6>Weight</h6>
                <p>{{ record.weight }}</p>
              </div>
              <div class="stats">
                <h6>Height</h6>
                <p>{{ record.height }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="CloseModal()">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
      
  <script>
export default {
  name: "ViewMedicalRecord",
  data() {
    return {
      openClose: this.visible,
      errors: null,
    };
  },
  props: {
    visible: Boolean,
  },
  methods: {
    CloseModal() {
      this.openClose = !this.openClose;
      this.$emit("update:visible", false);
      this.$emit("modal-closed");
    },
  },
  computed: {
    record() {
      return this.$store.state.record && this.$store.state.record[0];
    },
  },
  watch: {
    visible: {
      handler(newVal) {
        this.openClose = newVal;
      },
    },
  },
};
</script>

<style scoped>
#viewMedical .modal-body h4,
#viewMedical .modal-body h6 {
  color: var(--global-color-primary);
  font-weight: 600;
}

#viewMedical .modal-body h6 {
  font-size: 16px;
}

#viewMedical .patient-information {
  display: flex;
}

#viewMedical .patient-information {
  margin-top: 20px;
  padding: 10px;
  background: #e0e7ff;
}

#viewMedical .patient-information p {
  font-size: 14px;
}

#viewMedical .patient-information > div {
  width: 50%;
}
</style>