<template>
  <div class="comments">
    <form @submit.prevent="newComment()">
      <textarea
        name="newComment"
        id="new-comment"
        placeholder="Laissez un commentaire..."
        required
      ></textarea>
      <button type="submit" id="send-comment" class="send-comment">
        Envoyer
      </button>
    </form>

    <h2 v-if="comments.length > 0">Commentaires du post :</h2>

    <div class="comments2">
      <div class="comment" v-for="comment in comments" :key="comment.id">
        <div class="comment-info">
          Par {{ comment.prenom }} {{ comment.nom }} le
          {{ dateFormat(comment.createdAt) }}
        </div>
        <div class="comment-message">
          {{ comment.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  names: "Comments",
  data() {
    return {
      comments: [],
      user: [],
    };
  },
  mounted() {
    this.getAllComments();
  },
  methods: {
    newComment() {
      // GetItem pour retrouver le token du User
      let user = JSON.parse(localStorage.getItem("user"));
      const message = document.getElementById("new-comment").value;
      axios
        .post(
          `http://localhost:3000/api/comment/add`,
          {
            message,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then(this.getAllComments());
    },
    getAllComments() {
      // GetItem pour retrouver le token du User
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .get(`http://localhost:3000/api/comment/comments`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          this.comments = res.data;
        });
    },
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
  },
};
</script>

<style scoped>
/* New comment */
.comments {
  text-align: center;
  margin: 0 auto;
}
form {
  max-width: 800px;
  display: grid;
  justify-content: space-around;
}
textarea {
  padding: 5px;
  margin: 8px;
  width: 500px;
  border: 2px solid black;
  border-radius: 10px;
}
.send-comment {
  background-color: black;
  color: red;
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
}
/* Commentaires */
.comments {
  margin: 0 auto;
  padding: 20px;
  max-width: 650px;
}
.comment {
  margin-bottom: 20px;
  position: relative;
  margin-left: -40px;
  max-height: 50px;
  padding: 10px 20px 40px 40px;
  border-left: 5px solid black;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0px 0px 50px -7px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition-duration: 0.1s;
}
.comment:hover {
  box-shadow: 0px 0px 50px -7px rgba(0, 0, 0, 0.2);
}
h2 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: -40px;
  text-align: left;
}
.comment-info {
  font-size: 0.7rem;
}
.comment-message {
  font-size: 0.9rem;
}
</style>