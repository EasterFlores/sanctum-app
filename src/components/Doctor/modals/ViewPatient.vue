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
              v-model="this.$store.state.patient.fullname"
              disabled
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              v-model="this.$store.state.patient.address"
              disabled
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              v-model="this.$store.state.patient.contact"
              disabled
            />
          </div>
          <div class="field-con">
            <input
              type="email"
              v-model="this.$store.state.patient.email"
              disabled
            />
          </div>
          <div class="field-con">
            <input
              type="date"
              v-model="this.$store.state.patient.birthday"
              disabled
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              v-model="this.$store.state.patient.weight"
              disabled
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              v-model="this.$store.state.patient.height"
              disabled
            />
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
  name: "ViewPatient",
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
  watch: {
    visible: {
      handler(newVal) {
        this.openClose = newVal;
      },
    },
  },
};
</script>