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
          <form @submit.prevent="registerDoctors">
            <div class="field-con">
              <select name="type" v-model="type">
                <option value="" selected hidden disabled>
                  Select Type
                </option>
                <option value="Surgeons">Surgeons</option>
                <option value="Physician">Physician</option>
              </select>
              <small class="text-danger" v-if="errors.type">{{
                errors.type[0]
              }}</small>
            </div>
            <div class="field-con">
              <input
                type="text"
                name="fullname"
                id="fullname"
                v-model="fullname"
                class="form-control"
                placeholder="Full Name"
                required
              />
              <small class="text-danger" v-if="errors.fullname">{{
                errors.fullname[0]
              }}</small>
            </div>
            <div class="field-con">
              <input
                type="email"
                name="email"
                id="email"
                v-model="email"
                class="form-control"
                placeholder="Email"
                required
              />
              <small class="text-danger" v-if="errors.email">{{
                errors.email[0]
              }}</small>
            </div>
            <div class="field-con">
              <input
                type="text"
                name="address"
                id="address"
                v-model="address"
                class="form-control"
                placeholder="Address"
                required
              />
              <small class="text-danger" v-if="errors.address">{{
                errors.address[0]
              }}</small>
            </div>
            <div class="field-con">
              <input
                type="text"
                name="contact"
                id="contact"
                v-model="contact"
                class="form-control"
                placeholder="Contact"
                required
              />
              <small class="text-danger" v-if="errors.contact">{{
                errors.contact[0]
              }}</small>
            </div>
            <div class="field-con">
              <input
                type="password"
                id="password"
                name="password"
                v-model="password"
                placeholder="Password"
                required
              />
              <small class="text-danger" v-if="errors.password">{{
                errors.password[0]
              }}</small>
            </div>
            <div class="field-con">
              <input
                type="password"
                class="form-control"
                id="confirm"
                v-model="confirm"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div class="modal-footer">
              <button class="btn-secondary" @click="CloseFormModal()">
                Close
              </button>
              <button type="submit" class="btn-primary">Add</button>
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
  name: "AddDoctor",
  data() {
    return {
      type: "",
      fullname: "",
      contact: "",
      email: "",
      address: "",
      password: "",
      confirm: "",
      errors: {},
      openClose: this.visible,
    };
  },
  props: {
    visible: Boolean,
  },
  methods: {
    CloseFormModal() {
      this.openClose = !this.openClose;
      this.$emit("update:visible", false);
      this.$emit("modal-closed");
    },
    async registerDoctors() {
      try {
        const response = await axios.post(
          this.$store.state.apiUrl + "/registerDoctors",
          {
            type: this.type,
            fullname: this.fullname,
            contact: this.contact,
            email: this.email,
            address: this.address,
            password: this.password,
            password_confirmation: this.confirm,
          }
        );

        if (response.status === 201) {
          this.$swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
          });
          this.type = "";
          this.fullname = "";
          this.contact = "";
          this.email = "";
          this.address = "";
          this.password = "";
          this.confirm = "";
          this.openClose = !this.openClose;
          this.$emit("update:visible", false);
          this.$emit("modal-closed");
          this.$router.push("/admin/manageDoctors");
        }
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    clearErrors(field) {
      this.errors[field] = null;
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