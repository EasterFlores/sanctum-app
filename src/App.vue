<template>
  <router-view />
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      apiUrl: "http://127.0.0.1:8000/api",
    };
  },
};
</script>
