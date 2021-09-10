<template>
  <div class="userProfile">
    <div class="profile-info" v-for="user in user" :key="user.id">
      <h2>Bonjour,</h2>
      <div class="preofile-nom">
        <h4>Nom :</h4>
        <p>{{ user.nom }}</p>
      </div>
      <div class="profile-prenom">
        <h4>Prénom :</h4>
        <p>{{ user.prenom }}</p>
        <br />
      </div>
      <div class="profile-email">
        <h4>Adresse Mail :</h4>
        <p>{{ user.email }}</p>
        <br />
      </div>
      <div class="delete-profile" @click="deleteUser()">
        Supprimer le compte
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserProfile",
  data() {
    return {
      user: [],
      posts: [],
    };
  },
  mounted() {
    if (localStorage.user != undefined) {
      // Appel de la fonction pour affichage du profil
      this.getProfile();
    }
  },
  methods: {
    // Fonction pour avoir tous les posts
    getProfile() {
      // GetItem pour retrouver le token du User
      let user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;
      axios
        // GET pour chercher tous les posts dans l'API
        .get(`http://localhost:3000/api/auth/account/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          this.user = res.data;
        });
    },
    deleteUser() {
      // GetItem pour retrouver le token du User
      let user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId;
      axios
        .delete(`http://localhost:3000/api/auth/account/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(localStorage.removeItem("user"))
        .then((location.assign = "/"));
    },
  },
};
</script>

<style scoped>
.profile-info {
  margin: 50px auto;
  text-align: center;
  max-width: 800px;
}
.profile-info h2 {
  margin-bottom: 20px;
  font-size: 3.5rem;
}
.profile-info h4 {
  font-size: 2rem;
}
.profile-info p {
  font-size: 1.5rem;
}
.delete-profile {
  color: white;
  width: 200px;
  height: 50px;
  background-color: black;
  border-radius: 10px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 11px;
  font-size: 1.2rem;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}
.delete-profile:hover {
  transform: scale(1.02);
}
</style>