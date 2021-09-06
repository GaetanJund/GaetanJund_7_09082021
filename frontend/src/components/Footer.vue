// Html du composant footer
<template>
    <footer>
      <img src="../assets/icon.png" alt="logo2" class="logo2" />
      <p>Groupomania - {{ new Date().getFullYear() }}</p>
    </footer>
</template>

<style>
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
