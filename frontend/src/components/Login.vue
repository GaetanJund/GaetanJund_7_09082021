// Html du composant login
<template>
  <div class="home">
    <form @submit.prevent="login()">
      <div class="image_logo">
        <img
          src="../assets/icon-above-font.png"
          alt="Groupomania logo"
          class="logo1"
        />
        <h4>Bienvenue sur le réseau social de l'entreprise Groupomania</h4>
      </div>
      <nav>
        <router-link to="/login" class="active router_link"
          >Se connecter</router-link
        >
        |
        <router-link to="/" class="router_link">S'inscrire</router-link>
      </nav>

      <label for="login-email">Email :</label>
      <input id="login-email" type="email" placeholder="Email" required />

      <label for="login-password">Mot de passe :</label>
      <input
        id="login-password"
        type="password"
        placeholder="Mot de passe"
        required
      />

      <button id="login-btn" type="submit">Connexion</button>
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
  name: "Login",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    login() {
      // Définit des constantes, recherche valeurs des éléments par Id
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      axios
        // POST -- Envoi des doonénes vers l'Api
        .post(
          `http://localhost:3000/api/auth/login`,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // Refresh de la page
          if (res.status === 200) {
            localStorage.setItem("user", JSON.stringify(res.data));
            location.assign("/homepage");
          }

        })
        // Erreur serveur
        .catch((error) => {
          if (error.response.status === 404) {
            this.message = "Utilisateur inconnu.";
          }
          if (error.response.status === 401) {
            this.message = "Email ou mot de passe invalide.";
          }
          if (error.response.status === 500) {
            this.message = "Erreur serveur.";
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
#login-btn {
  padding: 10px;
  font-size: 1.1rem;
  color: white;
  background-color: black;
  border: none;
  border-radius: 10px;
  transition-duration: 0.2s;
  cursor: pointer;
}
#login-btn:hover {
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