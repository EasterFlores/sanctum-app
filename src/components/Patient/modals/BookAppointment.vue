<template>
  <div
    v-if="openClose"
    class="modal fade show"
    tabindex="-1"
    aria-hidden="true"
    id="AddUser"
    style="display: block"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form @submit.prevent="bookAppointment">
            <div class="field-con">
              <select name="doctor" id="doctor" v-model="doctor">
                <option value="" selected disabled hidden>Select Doctor</option>
                <option
                  v-for="doctor in doctors"
                  :key="doctor.id"
                  :value="doctor.id"
                >
                  {{ doctor.fullname }}
                </option>
              </select>
              <small class="text-danger" v-if="errors.doctor">{{
                errors.doctor[0]
              }}</small>
            </div>
            <div class="field-con">
              <input
                type="text"
                name="type"
                id="type"
                v-model="type"
                class="form-control"
                placeholder="Appointment Type"
                required
              />
              <small class="text-danger" v-if="errors.type">{{
                errors.type[0]
              }}</small>
            </div>
            <div class="field-con">
              <input
                type="date"
                name="date"
                id="date"
                v-model="date"
                class="form-control"
                required
              />
              <small class="text-danger" v-if="errors.date">{{
                errors.date[0]
              }}</small>
            </div>
            <div class="modal-footer">
              <button class="btn-secondary" @click="CloseFormModal()">
                Close
              </button>
              <button type="submit" class="btn-primary">Book</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import axios from "axios";

export default {
  name: "BookAppointment",
  data() {
    return {
      type: "",
      doctor: "",
      date: "",
      errors: {},
      openClose: this.visible,
    };
  },
  props: {
    visible: Boolean,
  },
  mounted() {
    this.fetchDoctors();
  },
  methods: {
    async fetchDoctors() {
      await this.$store.dispatch("fetchDoctors");
    },
    CloseFormModal() {
      this.openClose = !this.openClose;
      this.$emit("update:visible", false);
      this.$emit("modal-closed");
    },
    async bookAppointment() {
      try {
        const response = await axios.post(
          this.$store.state.apiUrl + "/bookAppointment",
          {
            type: this.type,
            date: this.date,
            doctor: this.doctor,
            user_id: localStorage.getItem("user_id"),
          }
        );

        if (response.status === 201) {
          this.$swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
          });
          this.type = "";
          this.date = "";
          this.doctor = "";
          this.openClose = !this.openClose;
          this.$emit("update:visible", false);
          this.$emit("modal-closed");
          this.$router.push("/patient/appointment");
        }
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    clearErrors(field) {
      this.errors[field] = null;
    },
  },
  computed: {
    doctors() {
      return this.$store.getters.getDoctors;
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