<template>
  <v-app>
    <v-main>
      <router-view><welcome /></router-view>
    </v-main>
  </v-app>
</template>

<script>
import welcome from "./views/Home.vue";
export default {
  name: "App",
  components: {
    welcome
  },
  data: () => ({}),
};
</script>