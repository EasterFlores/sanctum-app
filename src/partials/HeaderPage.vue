<template>
  <section id="header">
    <div class="wrapper">
      <div class="header-con">
        <ul class="navbar">
          <router-link v-if="!isAuthenticate" to="/">Login</router-link>
          <router-link v-if="isAuthenticate" to="/logout">Logout</router-link>
          <!-- <li id="mobile-btn">
            <i class="fa-solid fa-bars"></i>
          </li> -->
        </ul>
      </div>
    </div>
  </section>
  <section id="mobile-nav">
    <div class="wrapper">
      <div class="mobile-nav-con">
        <ul class="navbar">
          <router-link v-if="!isAuthenticate" to="/">Login</router-link>
          <router-link v-if="isAuthenticate" to="/logout">Logout</router-link>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      account_type: 0,
      isAuthenticate: false,
    };
  },
  mounted() {
    this.account_type = localStorage.getItem("account_type");
    this.isAuthenticate = !!localStorage.getItem("token");
  },
};
</script>
