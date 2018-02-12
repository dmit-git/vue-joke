<template>
  <v-footer color="indigo" app fixed row justify-center>      
      <v-container row justify-space-between>
      <span class="white--text">&copy; 2018</span> 
      <v-spacer></v-spacer>
      <v-btn fab dark color="primary" @click="radnJoke">
          <v-icon  dark>add</v-icon>
      </v-btn>
      </v-container>     
    </v-footer>
</template>
<script>
export default {
  name: 'Footer',
  methods: {
    radnJoke() {
      this.$store.dispatch('fetchRandJoke');
    },
  },
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

