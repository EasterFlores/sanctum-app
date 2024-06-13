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
            <select name="type" v-model="this.$store.state.account.type">
              <option value="" selected hidden disabled>Select Type</option>
              <option
                value="Surgeons"
                :selected="this.$store.state.account.type == 'Surgeons'"
              >
                Surgeons
              </option>
              <option
                value="Physician"
                :selected="this.$store.state.account.type == 'Physician'"
              >
                Physician
              </option>
            </select>
          </div>
          <div class="field-con">
            <input
              type="text"
              id="fullname"
              v-model="this.$store.state.account.fullname"
              @input="updateFullName"
              placeholder="Enter Full Name"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="address"
              v-model="this.$store.state.account.address"
              @input="updateAddress"
              placeholder="Enter Adrress"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="contact"
              v-model="this.$store.state.account.contact"
              @input="updateContact"
              placeholder="Enter Contact"
              required
            />
          </div>
          <div class="field-con">
            <input
              type="email"
              id="email"
              v-model="this.$store.state.account.email"
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
  name: "EditPatient",
  data() {
    return {
      openClose: this.visible,
      fullname: this.$store.state.account.fullname,
      address: this.$store.state.account.address,
      contact: this.$store.state.account.contact,
      email: this.$store.state.account.email,
      type: this.$store.state.account.type,
      errors: null,
    };
  },
  props: {
    visible: Boolean,
  },
  methods: {
    updateDoctorFullName() {
      this.$store.dispatch(
        "updateDoctorFullName",
        this.$store.state.account.fullname
      );
    },
    updateDoctorAddress() {
      this.$store.dispatch(
        "updateDoctorAddress",
        this.$store.state.account.address
      );
    },
    updateDoctorContact() {
      this.$store.dispatch(
        "updateDoctorContact",
        this.$store.state.account.contact
      );
    },
    updateDoctorEmail() {
      this.$store.dispatch(
        "updateDoctorEmail",
        this.$store.state.account.email
      );
    },
    updateDoctorType() {
      this.$store.dispatch(
        "updateDoctorType",
        this.$store.state.account.type
      );
    },
    async EditDoctor() {
      try {
        const response = await axios.put(
          this.$store.state.apiUrl +
            "/editDoctor/" +
            this.$store.state.account.id,
          {
            fullname: this.$store.state.account.fullname,
            address: this.$store.state.account.address,
            contact: this.$store.state.account.contact,
            email: this.$store.state.account.email,
            type: this.$store.state.account.type,
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