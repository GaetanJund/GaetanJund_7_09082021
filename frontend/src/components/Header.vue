<template>
  <div class="header">
    <a href="/homepage"
      ><img
        src="../assets/icon.png"
        alt="logo_groupomania"
        class="logo_groupomania"
    /></a>
    <h1>Groupomania</h1>
    <h4>Réseau social de l'entreprise : Groupomania</h4>
    <nav>
      <router-link to="/profile" id="profile-btn">Mon compte </router-link>
      <div id="disconnect-btn" @click="disconnect()">Se déconnecter</div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",

  methods: {
    // Au moment du clique sur le bouton "Se déconnecter", enlève le "user" du localStorage et revient à page d'accueil
    disconnect() {
      localStorage.removeItem("user");
      location.href = "/";
    },
  },
};
</script>

<style>
.header {
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
  border-bottom: 2px solid black;
}
.logo_groupomania {
  width: 100px;
  border-radius: 10px;
}
h1 {
  color: red;
  font-size: 50px;
}
nav {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
#disconnect-btn,
#profile-btn {
  padding: 10px;
  font-size: 1.1rem;
  margin-left: 5px;
  text-decoration: none;
  color: white;
  background-color: black;
  border: none;
  border-radius: 10px;
  transition-duration: 0.2s;
  cursor: pointer;
}
#disconnect-btn:hover,
#profile-btn:hover {
  background-color: red;
  color: black;
  transform: scale(1.02);
}
</style>