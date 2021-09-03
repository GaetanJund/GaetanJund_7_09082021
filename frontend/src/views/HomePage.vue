<template>
  <div class="home">
    <Header />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
export default {
  name: 'HomePage',
  components: {
    Header
  },
  data() {
    return{
      connected: true
    };
  },
  created(){
    this.checkConnected()
  },
  methods: {
    checkConnected(){
      if(localStorage.user !== undefined){
        this.connected = true;
        console.log('Utilisateur connecté !');
      }
      else if(localStorage.user == undefined){
        this.connected = false;
        console.log('Utilisateur non connecté !');
      }
    }
  }
}
</script>