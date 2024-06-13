<template>
  <HeaderPage />
  <Sidebar />
  <section id="account">
    <div class="wrapper">
      <div class="account-con">
        <div class="account-header">
          <h4>{{ this.$store.state.account.fullname }}</h4>
          <button
            class="btn-primary"
            @click="toggleEditAccount(this.$store.state.account.id)"
          >
            Edit
          </button>
        </div>
        <div class="account-details">
          <h6>Basic Information</h6>
          <div class="details-con">
            <p>{{ this.$store.state.account.type }}</p>
            <p>{{ this.$store.state.account.email }}</p>
            <p>{{ this.$store.state.account.address }}</p>
            <p>{{ this.$store.state.account.contact }}</p>
          </div>
        </div>
      </div>
    </div>
    <EditAccount
      :visible="showEditAccountModal"
      @update:visible="toggleEditAccount"
    />
  </section>
</template>

<script>
import HeaderPage from "../../partials/HeaderPage.vue";
import Sidebar from "../../partials/Sidebar.vue";
import EditAccount from "./modals/EditAccount.vue";

export default {
  data() {
    return {
      showEditAccountModal: false,
    };
  },
  mounted() {
    this.fetchAccount();
  },
  components: {
    HeaderPage,
    Sidebar,
    EditAccount,
  },
  methods: {
    async fetchAccount() {
      await this.$store.dispatch(
        "fetchAccount",
        localStorage.getItem("user_id")
      );
    },
    toggleEditAccount(id) {
      this.$store.getters.getAccount(id);
      this.showEditAccountModal = !this.showEditAccountModal;

      if (this.showEditAccountModal == false) {
        this.$store.dispatch("fetchAccount", localStorage.getItem("user_id"));
      }
    },
  },
  computed: {
    account() {
      return this.$store.getters.getAccount;
    },
  },
};
</script>

<style scoped>
#account .wrapper {
  max-width: 1440px;
}

#account .account-con {
  padding: 100px 20px 100px 100px;
}

#account .account-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

#account .account-details h6 {
  color: var(--global-color-primary);
  font-size: 18px;
  font-weight: 600;
}
</style>