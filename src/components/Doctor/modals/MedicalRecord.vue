<template>
  <div
    v-if="openClose"
    class="modal fade show"
    tabindex="-1"
    aria-hidden="true"
    id="editDoctor"
    style="display: block"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <div class="field-con">
            <input
              type="text"
              id="fullname"
              v-model="this.$store.state.appointment.type"
              @input="updateFullName"
              placeholder="Enter Full Name"
              required
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="CloseModal()">Close</button>
          <button class="btn-primary" @click="issueMedicalRecord()">
            Issue Record
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
        
<script>
import axios from "axios";
export default {
  name: "MedicalRecord",
  data() {
    return {
      openClose: this.visible,
      weight: "",
      height: "",
      errors: {},
    };
  },
  props: {
    visible: Boolean,
  },
  methods: {
    CloseModal() {
      this.errors = "";
      this.openClose = !this.openClose;
      this.$emit("update:visible", false);
      this.$emit("modal-closed");
    },
    async issueMedicalRecord() {
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
                this.$store.state.apiUrl +
                  "/issueMedicalRecord/" +
                  this.$store.state.appointment.id,
                {
                  weight: this.weight,
                  height: this.height,
                }
              );

              if (response.status === 200) {
                this.$swal.fire({
                  title: "Done!",
                  text: "Your patient have medical record.",
                  icon: "success",
                });
                this.weight = "";
                this.height = "";
                this.$emit("update:visible", false);
                this.$emit("modal-closed");
                this.$router.push("/doctor/manageAppointments");
              }
            } catch (error) {
              this.errors = error.response.data.errors;
            }
          }
        });
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