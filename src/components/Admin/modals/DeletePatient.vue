<template>
  <div
    v-if="openClose"
    class="modal fade show"
    tabindex="-1"
    aria-hidden="true"
    id="viewProduct"
    style="display: block"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="field-con">
            <input
              type="text"
              id="patientFullName"
              v-model="this.$store.state.patient.fullname"
              readonly
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="patientAddress"
              v-model="this.$store.state.patient.address"
              readonly
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="patientContact"
              v-model="this.$store.state.patient.contact"
              readonly
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="patientEmail"
              v-model="this.$store.state.patient.email"
              readonly
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="CloseModal()">Close</button>
          <button
            type="button"
            @click="DeletePatient()"
            class="btn btn-primary"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DeletePatient",
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
    async DeletePatient() {
      try {
        const response = await axios.delete(
          this.$store.state.apiUrl +
            "/deletePatient/" +
            this.$store.state.patient.id,
          {}
        );

        if (response.status === 200) {
          this.$swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
          });
          this.openClose = !this.openClose;
          this.$emit("update:visible", false);
          this.$emit("modal-closed");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    CloseModal() {
      this.openClose = !this.openClose;
      this.$emit("update:visible", false);
      this.$emit("modal-closed");
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