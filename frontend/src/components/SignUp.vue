// Html du composant signup
<template>
  <div class="home">
    <form @submit.prevent="signup()">
      <div class="image_logo">
        <a href="/"
          ><img
            src="../assets/icon-above-font.png"
            alt="Groupomania logo"
            class="logo1"
        /></a>
        <h4>Bienvenue sur le réseau social de l'entreprise Groupomania</h4>
      </div>
      <nav>
        <router-link to="/login" class="router_link">Se connecter</router-link>
        |
        <router-link to="/" class="active router_link">S'inscrire</router-link>
      </nav>
      <label for="signup-nom">Nom :</label>
      <input id="signup-nom" type="text" placeholder="Nom" required />

      <label for="signup-prenom">Prenom :</label>
      <input id="signup-prenom" type="text" placeholder="Prenom" required />

      <label for="signup-password">Mot de passe :</label>
      <input
        id="signup-password"
        type="password"
        placeholder="Mot de passe"
        required
      />

      <label for="signup-email">Email :</label>
      <input id="signup-email" type="email" placeholder="Email" required />

      <label for="avatar">Choose a profile picture:</label>

      <input
        type="file"
        id="photo"
        name="photo"
        accept="image/png, image/jpeg"
      />

      <button id="signup-btn" type="submit">S'inscrire</button>
    </form>
    <footer>
      <img src="../assets/icon.png" alt="logo2" class="logo2" />
      <p>Groupomania - {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script>
// Importe axios (permet de communiquer avec les API en utilisant des requêtes)
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    signup() {
      // Définit des constantes, recherche valeurs des éléments par Id
      const nom = document.getElementById("signup-nom").value;
      const prenom = document.getElementById("signup-prenom").value;
      const password = document.getElementById("signup-password").value;
      const email = document.getElementById("signup-email").value;
      const photo = document.getElementById("photo").value;
      axios
        // POST -- Envoi des doonénes vers l'Api
        .post(
          `http://localhost:3000/api/auth/signup`,
          {
            nom: nom,
            prenom: prenom,
            password: password,
            email: email,
            photo: photo,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        // Reponse status 201 qui renvoi vers une page
        .then((res) => {
          if (res.status === 201) {
            location.assign("/login");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.message = "Email non disponible.";
          }
        });
    },
  },
};
</script>

<style scoped>
.home {
  max-width: 700px;
  margin: 90px auto;
}
.image_logo {
  text-align: center;
}
.logo1 {
  width: 250px;
}
h1 {
  font-size: 80px;
  color: red;
}
nav {
  font-size: 1.2rem;
  text-align: center;
  padding-top: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-top: 1px solid black;
}
.router_link {
  text-decoration: none;
  color: black;
  margin-left: 5px;
  margin-right: 5px;
}
.active {
  color: red;
  font-weight: bold;
}
form {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px 10px 10px 10px;
  padding: 10px;
  box-shadow: 10px 10px 50px 10px grey;
}
form label {
  color: black;
  margin: 10px;
}
form input {
  font-size: 1.05rem;
  padding: 10px;
  margin-bottom: 15px;
  text-align: center;
  border: 1px solid black;
  border-radius: 10px 10px 10px 10px;
}
#signup-btn {
  padding: 10px;
  font-size: 1.1rem;
  color: white;
  background-color: black;
  border: none;
  border-radius: 10px;
  transition-duration: 0.2s;
  cursor: pointer;
}
#signup-btn:hover {
  transform: scale(1.02);
}
label {
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fbd1cd;
  border: 1px solid black;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
footer {
  margin-top: 30px;
  font-size: 1.2rem;
  text-align: center;
}
.logo2 {
  width: 50px;
  border-radius: 10px;
}
</style>