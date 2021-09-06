<template>
  <div class="home">
    <Header />
    <NewPost />
    <h2><u>Les posts consultables :</u></h2>
    <Posts />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import NewPost from "../components/NewPost.vue";
import Posts from "../components/Post.vue";
export default {
  name: "HomePage",
  components: {
    Header,
    NewPost,
    Posts,
    Footer,
  },
  data() {
    return {
      connected: true,
    };
  },
  created() {
    this.checkConnected();
  },
  methods: {
    //   Voir si utilisateur est bien connecté
    checkConnected() {
      if (localStorage.user !== undefined) {
        this.connected = true;
        console.log("Utilisateur connecté !");
      } else if (localStorage.user == undefined) {
        this.connected = false;
        console.log("Utilisateur non connecté !");
      }
    },
  },
};
</script>

<style>
.home {
  background-image: url(../assets/background.jpg);
  background-size: cover;
}
h2 {
  text-align: center;
}
</style>