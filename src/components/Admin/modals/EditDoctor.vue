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
            <select name="type" v-model="this.$store.state.doctor.type">
              <option value="" selected hidden disabled>Select Type</option>
              <option
                value="Surgeons"
                :selected="this.$store.state.doctor.type == 'Surgeons'"
              >
                Surgeons
              </option>
              <option
                value="Physician"
                :selected="this.$store.state.doctor.type == 'Physician'"
              >
                Physician
              </option>
            </select>
          </div>
          <div class="field-con">
            <input
              type="text"
              id="fullname"
              v-model="this.$store.state.doctor.fullname"
              @input="updateFullName"
              placeholder="Enter Full Name"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="address"
              v-model="this.$store.state.doctor.address"
              @input="updateAddress"
              placeholder="Enter Adrress"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="contact"
              v-model="this.$store.state.doctor.contact"
              @input="updateContact"
              placeholder="Enter Contact"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="email"
              id="email"
              v-model="this.$store.state.doctor.email"
              @input="updateEmail"
              placeholder="Enter Email"
              required
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="CloseModal()">Close</button>
          <button type="button" @click="EditDoctor()" class="btn btn-primary">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
export default {
  name: "EditDoctor",
  data() {
    return {
      openClose: this.visible,
      type: this.$store.state.doctor.type,
      fullname: this.$store.state.doctor.fullname,
      address: this.$store.state.doctor.address,
      contact: this.$store.state.doctor.contact,
      email: this.$store.state.doctor.email,
      errors: null,
    };
  },
  props: {
    visible: Boolean,
  },
  methods: {
    updateDoctorType() {
      this.$store.dispatch(
        "updateDoctorType",
        this.$store.state.doctor.type
      );
    },
    updateDoctorFullName() {
      this.$store.dispatch(
        "updateDoctorFullName",
        this.$store.state.doctor.fullname
      );
    },
    updateAddress() {
      this.$store.dispatch(
        "updateDoctorAddress",
        this.$store.state.doctor.address
      );
    },
    updateContact() {
      this.$store.dispatch(
        "updateDoctorContact",
        this.$store.state.doctor.contact
      );
    },
    updateEmail() {
      this.$store.dispatch("updateDoctorEmail", this.$store.state.doctor.email);
    },
    async EditDoctor() {
      try {
        const response = await axios.put(
          this.$store.state.apiUrl +
            "/editDoctor/" +
            this.$store.state.doctor.id,
          {
            type: this.$store.state.doctor.type,
            fullname: this.$store.state.doctor.fullname,
            address: this.$store.state.doctor.address,
            contact: this.$store.state.doctor.contact,
            email: this.$store.state.doctor.email,
          }
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