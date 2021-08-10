<template>
  <footer>
    <a href="#">Règles</a>
    <button>Déconnexion</button><br /><br />
    {{ new Date().getFullYear() }} — <strong>{{ msg }}</strong>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String,
  },
};
</script>