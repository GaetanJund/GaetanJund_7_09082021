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
        <h5>Ajoutez une image :</h5>
        <input
          @change="onFileChange()"
          type="file"
          ref="file"
          name="image"
          class="form-control-file"
          id="File"
          accept="*"
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
      image: "",
    };
  },
  methods: {
    onFileChange() {
      this.file = this.$refs.file.files[0];
      this.newImage = URL.createObjectURL(this.file);
    },
    // Fonction pour ajouter un nouveau post
    newpost() {
      // Définit des constantes, recherche valeurs des éléments par Id
      const newpost = document.getElementById("newpost-text").value;
      // GetItem pour retrouver le token du User
      let user = JSON.parse(localStorage.getItem("user"));
      let data = new FormData ();
      data.append("message", newpost);
      if (this.file) {
        data.append("image", this.file);
      }
      axios
        // POST -- Envoi des doonénes vers l'API
        .post(
          `http://localhost:3000/api/post/add`,
          data,
          {
            headers: {
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
  margin: 10px;
  height: 100px;
  width: 1000px;
  text-align: left;
}
.form-control-file{
  width: 500px;
}
.publication {
  padding: 6px 100px;
  font-size: 1.1rem;
  background-color: black;
  color: white;
  margin-bottom: 20px;
  border-radius: 10px 10px 10px 10px;
  transition-duration: 0.2s;
  cursor: pointer;
}
.publication:hover {
  background-color: red;
  color: black;
  transform: scale(1.02);
}
/* Format mobile */
@media screen and (max-width: 480px) {
  input {
    max-width: 330px;
  }
}
/* Format Ipad */
@media screen and (max-width: 1024px) {
  input {
    max-width: 600px;
  }
}
</style>