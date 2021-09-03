<template>
  <div class="header">
    <img
      src="../assets/icon.png"
      alt="logo_groupomania"
      class="logo_groupomania"
    />
    <h1>Groupomania</h1>
    <h4>Réseau social de l'entreprise : Groupomania</h4>
    <nav>
      <router-link to="/profile" id="profile-btn"> Mon compte </router-link>
      <div id="disconnect-btn" @click="disconnect()">Se déconnecter</div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",

  methods: {
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
  margin: 20px;
  border-bottom: 2px solid black;
}
.logo_groupomania {
  width: 100px;
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
  transform: scale(1.02);
}
</style>