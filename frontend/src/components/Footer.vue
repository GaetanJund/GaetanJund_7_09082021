<template>
  <v-footer fixed dark class="footer">
    <div class="mt-2 mr-2 footer_info">
      {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
    </div>
    <div class="footer_bouton">
      <v-btn x-small to="#" class="ml-5 mt-3">Règlement</v-btn>
      <v-btn class="mt-3 mr-5" x-small @click="logOut" to="/"
        >Déconnexion</v-btn
      >
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String,
  },
};
</script>