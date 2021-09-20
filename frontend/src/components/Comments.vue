<template>
  <div class="comments">
    <form @submit.prevent="newComment()">
      <textarea
        name="newComment"
        id="new-comment"
        placeholder="Laissez un commentaire..."
        v-model="comment"
        required
      ></textarea>
      <button type="submit" id="send-comment" class="send-comment">
        Commenter
      </button>
    </form>

    <div v-for="comment in post.Comments" :key="comment.id"></div>

    <div class="comments2">
      <div class="comment" v-for="comment in post.Comments" :key="comment.id">
        <div class="comment-info">
          Par
          <strong
            ><i>{{ comment.User.prenom }} {{ comment.User.nom }} </i></strong
          >
          le
          {{ dateFormat(comment.createdAt) }}
        </div>
        <div class="comment-message">
          {{ comment.message }}
          <button
            class="delete-comment"
            @click="deleteComment(comment.id)"
            v-if="comment.deleteButton"
          >
            Supprimer
          </button>
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
      posts: [],
      user: [],
    };
  },
  props: {
    post: Object,
  },
  // Au chargement de la page, détecte si user est celui qui a crée le comment ou non
  created() {
    // GetItem pour retrouver le token du User
    let user = JSON.parse(localStorage.getItem("user"));
    for (let comment of this.post.Comments) {
      if (comment.user_id == user.userId || user.isAdmin) {
        comment.deleteButton = true;
      } else {
        comment.deleteButton = false;
      }
    }
  },
  methods: {
    newComment() {
      // GetItem pour retrouver le token du User
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .post(
          `http://localhost:3000/api/comment/add`,
          {
            message: this.comment,
            postId: this.post.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((result) => {
          this.post.Comments.push(result.data.comment);
          location.reload();
          for (let comment of this.comments) {
            if (comment.user_id == user.userId || user.isAdmin) {
              comment.deleteButton = true;
            } else {
              comment.deleteButton = false;
            }
          }
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
    deleteComment(commentId) {
      // GetItem pour retrouver le token du User
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        .delete(`http://localhost:3000/api/comment/${commentId}`, {
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
  margin-bottom: 5px;
}
/* Commentaires */
.comments2 {
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
h4 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: -35px;
  text-align: left;
}
.comment-info {
  font-size: 0.7rem;
  margin-bottom: 2px;
}
.comment-message {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}
.delete-comment {
  background-color: black;
  color: red;
  font-size: 0.8rem;
  padding: 3px;
  border-radius: 5px;
  margin-top: -10px;
}
/* Format mobile */
@media screen and (max-width: 480px) {
  textarea {
    max-width: 280px;
  }
  .comment {
    padding-bottom: 60px;
  }
}
</style>