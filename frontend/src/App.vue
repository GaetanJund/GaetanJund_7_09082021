<template>
  <div id="app">
    <div class="hello">
      <img
        alt="Groupomania logo"
        src="./assets/icon-above-font.png"
        width="200px"
      />
      <h1>Bienvenue sur le réseau social de l'entreprise Groupomania</h1>
      <br />
    </div>
    <div id="nav">
      <router-link to="/signup">S'inscrire</router-link> |
      <router-link to="/login">Se connecter</router-link>
    </div>
    <router-view />
    <footer fixed dark class="footer">
      <div class="mt-2 mr-2 footer_info">
        {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
      </div>
      <div class="footer_bouton">
        <button x-small to="#" class="ml-5 mt-3">Règlement</button>
        <button class="mt-3 mr-5" x-small>Déconnexion</button>
      </div>
    </footer>
  </div>
</template>

<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* Header */
#nav {
  display: flex;
  text-align: center;
  margin-left: 370px;
  justify-content: space-around;
  background-color: grey;
  height: 50px;
  width: 500px;
  border-radius: 10px 10px 10px 10px;
}

/* Footer */
.footer_info {
  margin-bottom: 10px;
}

.footer_bouton {
  margin-left: 10px;
}

/* Boutons */
button {
  color: black;
  background-color: grey;
  text-transform: none;
  border-radius: 10px 10px 10px 10px;
  padding: 5px;
  margin-left: 10px;
}

button:hover {
  cursor: pointer;
  text-decoration: none;
  background-color: #c44949;
  color: black;
  transition: 0.3s;
}
</style>