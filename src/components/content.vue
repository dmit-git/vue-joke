<template>
  <v-content>
      <v-container>
        <div class="grid" 
          data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
            <v-layout d-block class="grid-sizer"></v-layout>
            <v-layout d-block v-for="(joke, index) in jokes" :key="index" class="grid-item" 
              v-if="!!joke && shouldJokeDisplay(joke)">
              <Joke :joke="joke" :action="toggleFav"></Joke>
            </v-layout>                
        </div>
      </v-container> 
    </v-content>
</template>
<script>
import Vue from 'vue';
import Masonry from 'masonry-layout';
import localforage from 'localforage';
import Joke from './joke';

export default {
  name: 'Content',
  components: {
    Joke
  },
  data () {
    return {
      msnry: null,
      displayFavorites: false,
    };
  },
  computed: {
    jokes() {
      if(this.displayFavorites){
        return this.$store.getters.favorites;
      }
      return this.$store.getters.jokes;
    },
    category() {
      return this.$store.getters.selectedCategory;
    },
  },
  methods: {
    toggleFav(joke) {
      this.$store.dispatch('toggleFavorites', joke).then(()=>{
        if(this.displayFavorites)
          this.layout();
      });
    },
    jokeHasCategory(joke) {
      if(typeof joke !== 'undefined' || joke !== null)
        return joke.category !== null || typeof joke.category !== 'undefined';
      return false;
    },
    categoryIsSelected() {
      return this.category != "";
    },
    jokeInSelectedCat(joke) {
        return joke.category.includes(this.category);
    },
    shouldJokeDisplay(joke) {
      if(this.jokeInSelectedCat(joke) && this.categoryIsSelected()) return true;
      if(!this.categoryIsSelected() && !this.displayFavorites) return true;
      if(this.displayFavorites && joke.fav) return true;
      return false;
    },
    layout() {
      Vue.nextTick()
      .then(function () {
        // DOM updated
        this.msnry.reloadItems();
        this.msnry.layout();
        window.scrollTo(0,document.querySelector(".grid").scrollHeight);
      }.bind(this));
    },
  },
  mounted() {
    var grid = document.querySelector('.grid');
    this.msnry = new Masonry( grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      gutter: 10
    });
    localforage.getItem('favorites').then((value) => {
      this.$store.dispatch('localFavorites', value);
    }).catch(() => {
      console.log("No local favrites.")
    })
  },
  watch: {
    category: function() {
      this.layout();
    },
    jokes: function(newJokes, oldJokes) {
      if(oldJokes.length != newJokes.length){
        this.layout();
      }
    },
    '$route' (to, from) {
      if(to.name == 'Favorites'  && to.name != from.name){
        this.displayFavorites = true;
        this.layout();
      }
      if(to.name == "Jokes" && to.name != from.name) {
        this.displayFavorites = false; 
        this.layout();  
      }
    }
  },
}
</script>
<style lang="scss">
@import "../../node_modules/vuetify/dist/vuetify.min";

@media (min-width: 1280px) {
    /* For mobile phones: */
    .grid-sizer,
    .grid-item {
        width: calc(20% - 8px);
    }
}
@media (max-width: 1280px) {
    /* For mobile phones: */
    .grid-sizer,
    .grid-item {
        width: calc(25% - 7.5px);
    }
}
@media (max-width: 768px) {
    /* For mobile phones: */
    .grid-sizer,
    .grid-item {
        width: calc(33.33% - 6.7px);
    }
}
.grid-item{
  margin-bottom: 10px;
  .card{
    padding: 10px;    
  }
}

</style>
