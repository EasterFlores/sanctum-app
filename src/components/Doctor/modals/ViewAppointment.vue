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
              disabled
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="fullname"
              v-model="this.$store.state.appointment.status"
              disabled
            />
          </div>
          <div class="field-con">
            <input
              type="text"
              id="fullname"
              v-model="this.$store.state.appointment.date"
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
  name: "ViewAppointment",
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
