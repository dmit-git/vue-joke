<template>
  <v-footer color="indigo" app fixed row justify-center>      
      <v-container row justify-space-between>
      <span class="white--text">&copy; 2018</span> 
      <v-spacer></v-spacer>
      
      <v-btn fab dark 
        color="pink" 
        @click="clearJokes" 
        v-if="!displayFavs && jokesAvailable"
        title="Clear jokes!">
          <v-icon  dark>clear</v-icon>
      </v-btn>
      <v-btn fab dark 
        color="primary" 
        @click="radnJoke" 
        v-if="!displayFavs"
        title="Add random joke">
          <v-icon  dark>add</v-icon>
      </v-btn>
      </v-container>     
    </v-footer>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      displayFavs: false,
    }
  },
  computed: {
    jokesAvailable() {
       return this.$store.getters.jokes.length>0;
    },
  },
  methods: {
    clearJokes() {
      this.$store.dispatch('clearJokesList');
    },
    radnJoke() {
      this.$store.dispatch('fetchRandJoke');
    },
  },
  watch:{
    '$route'(to){
      if(to.name == 'Favorites'){
        this.displayFavs = true;
      }
      else{
        this.displayFavs = false;
      }
    }
  }
}
</script>
<style lang="scss">
    .footer{
    justify-content: center;
    div {
      display: flex;
      flex-direction: row;
      padding-top: 0px;
      padding-bottom: 0px;
      align-items: center;

      button.btn.btn--floating {
        margin-top: -27px !important;
      }
    }
}
</style>

