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
};
</script>

<style>
.home {
  background-image: url(../assets/background.jpg);
  background-size: cover;
  border-radius: 10px;
}
h2 {
  text-align: center;
}
</style>