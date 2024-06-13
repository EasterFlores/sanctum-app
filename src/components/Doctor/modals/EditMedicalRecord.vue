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
        <form @submit.prevent="registerDoctors">
          <div class="modal-body" v-if="record">
            <div class="field-con">
              <input type="text" v-model="record.user_fullname" disabled />
            </div>
            <div class="field-con">
              <input v-model="record.user_contact" disabled />
            </div>
            <div class="field-con">
              <input v-model="record.user_address" disabled />
            </div>
            <div class="field-con">
              <input v-model="record.birthday" disabled />
            </div>
            <div class="field-con">
              <input
                type="number"
                id="weight"
                name="weight"
                v-model="record.weight"
                @input="updateWeight"
                placeholder="Weight"
                required
              />
            </div>
            <div class="field-con">
              <input
                type="number"
                id="height"
                name="height"
                v-model="record.height"
                @input="updateHeight"
                placeholder="Height"
                required
              />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" @click="CloseModal()">Close</button>
            <button
              class="btn-primary"
              @click="editMedicalRecord(record.medical_id)"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditMedicalRecord",
  data() {
    return {
      height: "",
      weight: "",
      openClose: this.visible,
      errors: null,
    };
  },
  props: {
    visible: Boolean,
  },
  methods: {
    updateWeight(event) {
      this.$store.commit("updateWeight", event.target.value);
    },
    updateHeight(event) {
      this.$store.commit("updateHeight", event.target.value);
    },
    CloseModal() {
      this.openClose = !this.openClose;
      this.$emit("update:visible", false);
      this.$emit("modal-closed");
    },
    async editMedicalRecord(id) {

      this.$store.state.record[0]
      try {
        const response = await axios.patch(
          this.$store.state.apiUrl + "/editMedicalRecord/" + id,
          {
            patient_id: this.$store.state.record[0].id,
            weight: this.$store.state.record[0].weight,
            height: this.$store.state.record[0].height,
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