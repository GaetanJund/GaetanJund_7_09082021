<template>
  <div class="new-post">
    <form class="new-post2" @submit.prevent="newpost()">
      <div class="text-newpost">
        <label for="newpost-text">Ajoutez un nouveau Post :</label> <br /><br />
        <input
          id="newpost-text"
          type="text"
          placeholder="Quoi de neuf ?"
          required
        />
        <br /><br />
        <button class="publication" type="submit">Publier</button>
      </div>
    </form>
  </div>
</template>

<script>
// Importe axios (permet de communiquer avec les API en utilisant des requêtes)
import axios from "axios";
export default {
  name: "NewPost",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    // Fonction pour ajouter un nouveau post
    newpost() {
      // Définit des constantes, recherche valeurs des éléments par Id
      const newpost = document.getElementById("newpost-text").value;
      // GetItem pour retrouver le token du User
      let user = JSON.parse(localStorage.getItem("user"));
      axios
        // POST -- Envoi des doonénes vers l'API
        .post(
          `http://localhost:3000/api/post/add`,
          {
            message: newpost,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          // Si reponse 201, on reload la page pour mettre réussir à ajouter le post et le retrouver dans tous les posts
          if (res.status === 201) {
            location.reload();
          }
        });
    },
  },
};
</script>

<style scoped>
.new-post {
  margin: 20px;
}
.text-newpost {
  text-align: center;
  border-bottom: 2px solid black;
}
label {
  padding: 10px;
  font-size: 1.4rem;
  background-color: black;
  color: white;
  border-radius: 10px 10px 10px 10px;
}
input {
  border: 2px solid black;
  border-radius: 10px 10px 10px 10px;
  padding: 10px;
  height: 100px;
  width: 1000px;
  text-align: left;
}
.publication {
  padding: 6px 100px;
  font-size: 1.1rem;
  background-color: red;
  color: white;
  margin-bottom: 20px;
  border-radius: 10px 10px 10px 10px;
  transition-duration: 0.2s;
  cursor: pointer;
}
.publication:hover {
  transform: scale(1.02);
}
</style>