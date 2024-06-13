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
              id="doctorFullName"
              v-model="this.$store.state.doctor.fullname"
              readonly
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="doctorAddress"
              v-model="this.$store.state.doctor.address"
              readonly
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="doctorContact"
              v-model="this.$store.state.doctor.contact"
              readonly
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="doctorEmail"
              v-model="this.$store.state.doctor.email"
              readonly
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="CloseModal()">Close</button>
          <button type="button" @click="RemoveDoctor()" class="btn btn-primary">
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
  name: "DeleteDoctor",
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
    async RemoveDoctor() {
      try {
        const response = await axios.delete(
          this.$store.state.apiUrl +
            "/deleteDoctor/" +
            this.$store.state.doctor.id,
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