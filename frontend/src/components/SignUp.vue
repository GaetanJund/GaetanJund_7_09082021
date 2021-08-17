<template>
  <div id="signup">
    <form action="" method="">
      <div>
        <label for="nom">Nom :</label>
        <input type="text" id="nom" name="nom_user" placeholder="Votre nom" />
      </div>
      <div>
        <label for="prenom">Prenom :</label>
        <input
          type="text"
          id="prenom"
          name="prenom_user"
          placeholder="Votre prenom"
        />
      </div>
      <br />
      <div>
        <label for="email">Email :</label>
        <input
          type="text"
          id="email"
          name="email_user"
          placeholder="Votre e-mail"
        />
      </div>
      <br />
      <div>
        <label for="password">Password :</label>
        <input
          type="password"
          id="password"
          name="password_user"
          placeholder="Mot de passe"
        />
      </div>
      <br />
      <button id="signup">S'inscrire</button> <br /><br />
    </form>
  </div>
</template>