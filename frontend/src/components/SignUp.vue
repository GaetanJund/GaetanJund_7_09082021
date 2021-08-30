<template>
  <v-form ref="form" class="form_signup" v-model="valid" lazy-validation>
    <nav>
      <router-link to="/login">Se connecter</router-link> |
      <router-link to="/signup" class="active">S'inscrire</router-link>
    </nav>
    <v-text-field
      v-model="nom"
      :counter="20"
      :rules="nomRules"
      label="Nom"
      class="label"
      required
    ></v-text-field>

    <v-text-field
      v-model="prenom"
      :counter="20"
      label="Prenom"
      class="label"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      class="label"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      class="label"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4 label"
      @click="validate"
      aria="S'inscrire"
    >
      Inscription
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    nom: "",
    nomRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<script>
import router from "../router/index";
export default {
  name: "Signup",
  data() {
    return {
      errorMessage: "",
      input: {
        nom: "",
        prenom: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    signup() {
      if (
        this.input.nom != "" &&
        this.input.prenom != "" &&
        this.input.email != "" &&
        this.input.password != ""
      ) {
        apiClient
          .post("api/auth/signup", this.input)
          .then((data) => {
            if (!data.token) {
              this.errorMessage = data.error.errors[0].message;
            } else {
              localStorage.setItem("userToken", data.token);
              localStorage.setItem("userData", JSON.stringify(data.user));
              router.push({ name: "Posts" });
            }
          })
          .catch((error) => {
            if (error.error) {
              return (this.errorMessage = error.error.errors[0].message);
            }
            this.errorMessage = "Problème de connexion";
          });
      } else {
        this.errorMessage = "Veuillez renseigner un email et un mot de passe";
      }
    },
  },
};
</script>

<style>
.form_signup {
  background-color: #fbd1cd;
  border-radius: 10px 10px 10px 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 200px;
  margin-right: 200px;
}
nav {
  text-align: center;
  margin-top: 30px;
  padding-top: 10px;
}
.label{
  margin-left: 30px;
  margin-right: 30px;
  padding-bottom: 10px;
}
</style>