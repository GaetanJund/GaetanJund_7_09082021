<template>
  <div id="app">
    <Header msg="Groupomania" />
    <SignUp />
    <Footer msg="Groupomania" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import SignUp from "./components/SignUp.vue";
import Footer from "./components/Footer.vue";
import "../public/styles.css";

export default {
  name: "App",
  components: {
    Header,
    SignUp,
    Footer
  },
};
</script>

<style lang="css">
</style>