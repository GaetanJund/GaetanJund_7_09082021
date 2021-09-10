<template>
  <div class="home">
    <Header />
    <Profile />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Profile from "../components/Profile.vue";
export default {
  name: "HomeProfile",
  components: {
    Header,
    Profile,
    Footer,
  },
  data() {
    return {
      connected: true,
    };
  },
};
</script>