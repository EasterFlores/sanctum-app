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
              v-model="this.$store.state.patient.fullname"
              @input="updateFullName"
              placeholder="Enter Full Name"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="address"
              v-model="this.$store.state.patient.address"
              @input="updateAddress"
              placeholder="Enter Adrress"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="contact"
              v-model="this.$store.state.patient.contact"
              @input="updateContact"
              placeholder="Enter Contact"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="email"
              id="email"
              v-model="this.$store.state.patient.email"
              @input="updateEmail"
              placeholder="Enter Email"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="date"
              id="birthday"
              v-model="this.$store.state.patient.birthday"
              @input="updatePatientBirthday"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="weight"
              v-model="this.$store.state.patient.weight"
              @input="updateWeight"
              placeholder="Weight"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="height"
              v-model="this.$store.state.patient.height"
              @input="updateHeight"
              placeholder="Height"
              required
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="CloseModal()">Close</button>
          <button type="button" @click="EditPatient()" class="btn btn-primary">
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
  name: "EditPatient",
  data() {
    return {
      openClose: this.visible,
      fullname: this.$store.state.patient.fullname,
      address: this.$store.state.patient.address,
      contact: this.$store.state.patient.contact,
      email: this.$store.state.patient.email,
      birthday: this.$store.state.patient.birthday,
      weight: this.$store.state.patient.weight,
      height: this.$store.state.patient.height,
      errors: null,
    };
  },
  props: {
    visible: Boolean,
  },
  methods: {
    updatePatientFullName() {
      this.$store.dispatch(
        "updatePatientFullName",
        this.$store.state.patient.fullname
      );
    },
    updatePatientAddress() {
      this.$store.dispatch(
        "updatePatientAddress",
        this.$store.state.patient.address
      );
    },
    updatePatientContact() {
      this.$store.dispatch(
        "updatePatientContact",
        this.$store.state.patient.contact
      );
    },
    updatePatientEmail() {
      this.$store.dispatch(
        "updatePatientEmail",
        this.$store.state.patient.email
      );
    },
    updatePatientBirthday() {
      this.$store.dispatch(
        "updatePatientBirthday",
        this.$store.state.patient.birthday
      );
    },
    updatePatientWeight() {
      this.$store.dispatch(
        "updatePatientWeight",
        this.$store.state.patient.weight
      );
    },
    updatePatientHeight() {
      this.$store.dispatch(
        "updatePatientHeight",
        this.$store.state.patient.height
      );
    },
    async EditPatient() {
      try {
        const response = await axios.put(
          this.$store.state.apiUrl +
            "/editPatient/" +
            this.$store.state.patient.id,
          {
            fullname: this.$store.state.patient.fullname,
            address: this.$store.state.patient.address,
            contact: this.$store.state.patient.contact,
            email: this.$store.state.patient.email,
            birthday: this.$store.state.patient.birthday,
            weight: this.$store.state.patient.weight,
            height: this.$store.state.patient.height,
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
        console.log(error.response.data.message);
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