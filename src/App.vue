<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="radnJoke">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-toolbar-side-icon>
      
    </v-toolbar>
    <v-content>
      <v-container>
          <div class="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
                <v-layout d-block class="grid-sizer">empty</v-layout>
                <v-layout d-block v-for="(joke, index) in jokes" :key="index" class="grid-item" >
                  <v-card>
                   {{joke.value}}
                  </v-card>
                </v-layout>                
        </div>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Masonry from 'masonry-layout';

export default {
  name: 'app',
  data () {
    return {
      drawer: false,
      msg: 'Welcome to Your Vue.js App',
      msnry: null,
    };
  },
  computed: {
    joke1() {
      return this.$store.getters.joke1;
    },
    jokes() {
      return this.$store.getters.jokes;
    },
  },
  methods: {
    radnJoke() {
      this.$store.dispatch('fetchRandJoke');
    },
  },
  mounted() {
    console.log("Before mount");
    var grid = document.querySelector('.grid');
    console.log(grid);
    this.msnry = new Masonry( grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      gutter: 10
    });
    console.log(this.msnry);    
  },
  watch: {
    jokes: function() {
      Vue.nextTick()
      .then(function () {
        console.log(this.msnry,'thismsnry');
        // DOM updated
        this.msnry.reloadItems();
        this.msnry.layout();
      }.bind(this))
    },
  },
  ready:function(){
        // code here executes once the component is rendered
        // use this in the child component
        console.log('component rendered', this.msnry);
      //this.msnry.destroy();
      //this.msnry.reloadItems();
      //this.msnry.layout(); 
  },
}
</script>

<style lang="scss">
@import "../node_modules/vuetify/dist/vuetify.min";

@media (min-width: 1280px) {
    /* For mobile phones: */
    .grid-sizer,
    .grid-item {
        width: 20%;
    }
}
@media (max-width: 1280px) {
    /* For mobile phones: */
    .grid-sizer,
    .grid-item {
        width: 25%;
    }
}
@media (max-width: 768px) {
    /* For mobile phones: */
    .grid-sizer,
    .grid-item {
        width: 33.33%;
    }
}
.grid-item{
  margin-bottom: 10px;
}
</style>
