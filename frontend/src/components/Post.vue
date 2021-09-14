<template>
  <div class="posts">
    <article class="post" v-for="post in posts" :key="post.id">
      <div class="post-header">
        <i
          ><span class="post-info"
            >Posté le {{ dateFormat(post.createdAt) }} par
            <strong>{{ post.User.prenom }} {{ post.User.nom }}</strong></span
          ></i
        >
        <button class="post-delete" @click="deletePost(post.id)">
          Supprimer
        </button>
      </div>
      <div class="post-message" v-html="characterLimit(post.message)"></div>

      <Comments v-bind:post="post" />
    </article>
  </div>
</template>

<script>
import Comments from "../components/Comments.vue";
import axios from "axios";
export default {
  name: "Posts",
  components: {
    Comments,
  },
  data() {
    // Retourne les posts
    return {
      posts: [],
    };
  },
  mounted() {
    if (localStorage.user != undefined) {
      // Appel de la fonction pour affichage des posts
      this.getAllPost();
    }
  },
  methods: {
    // Fonction pour avoir tous les posts
    getAllPost() {
      // GetItem pour retrouver le token du User
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        // GET pour chercher tous les posts dans l'API
        .get(`http://localhost:3000/api/post/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          this.posts = res.data;
        });
    },
    // Fonction pour limite de caractère avant les ...
    characterLimit(message) {
      let text = message;
      const maxLength = 250;
      if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + "...";
      } else {
        return text;
      }
    },
    // Fonction pour l'affichage correct de la date d'un post
    dateFormat(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-FR", options);
    },
    // Fonction supprimer un post
    deletePost(postId) {
      // GetItem pour retrouver le token du User
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .delete(`http://localhost:3000/api/post/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(location.reload());
    },
  },
};
</script>

<style scoped>
.posts {
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
}
.post {
  position: relative;
  padding: 20px 20px 20px 30px;
  margin-bottom: 30px;
  border-left: 5px solid red;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0px 0px 50px -7px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition-duration: 0.1s;
}
.post:hover {
  box-shadow: 0px 0px 50px -7px rgba(0, 0, 0, 0.2);
}
.post h2 {
  margin-top: 7px;
}
.post-info {
  font-size: 0.8rem;
}
.post-header {
  display: flex;
  justify-content: space-between;
  color: rgb(0, 0, 0);
  font-size: 0.8rem;
}
.post-message {
  font-size: 1.1rem;
}
</style>