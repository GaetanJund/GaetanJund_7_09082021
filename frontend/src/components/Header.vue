<template>
  <div class="hello">
    <img alt="Groupomania logo" src="../assets/icon-above-font.png" width="200px">
    <h1>Bienvenue sur le réseau social de l'entreprise {{ msg }}</h1>
    <nav id="nav">
      <ul>
        <li id="header_bouton">
          <a href="#">Inscription</a>
        </li>
        <li id="header_bouton">
          <a href="#">Connexion</a>
        </li>
      </ul>
    </nav>
    <br />
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #e43535;
  text-decoration: none;
}
</style>
