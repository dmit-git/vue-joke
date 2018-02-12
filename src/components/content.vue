<template>
  <v-content>      
    <v-progress-linear v-show="loading" v-bind:indeterminate="true"></v-progress-linear>
      <v-container>
          <div class="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
            <v-layout d-block class="grid-sizer"></v-layout>
            <v-layout d-block v-for="(joke, index) in jokes" :key="index" class="grid-item" >
              <Joke :joke="joke"></Joke>
            </v-layout>                
        </div>
      </v-container> 
    </v-content>
</template>
<script>
import Vue from 'vue';
import Masonry from 'masonry-layout';
import Joke from './joke';

export default {
  name: 'Content',
  components: {
    Joke
  },
  data () {
    return {
      msnry: null,
    };
  },
  computed: {
    jokes() {
      return this.$store.getters.jokes;
    },
    loading() {
      return this.$store.getters.loading;
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
  },
  watch: {
    jokes: function() {
      Vue.nextTick()
      .then(function () {
        // DOM updated
        this.msnry.reloadItems();
        this.msnry.layout();
      }.bind(this))
    },
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
.progress-linear{
  margin-top:0px;
      position: absolute;
}
</style>
