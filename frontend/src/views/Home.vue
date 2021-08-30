<template>
  <div>
    <router-view><Header /></router-view>
    <router-view><SignUp /></router-view>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import SignUp from "../components/Signup.vue";

export default {
  name: "Home",

  components: {
    Header,
    SignUp
  },
};
</script>