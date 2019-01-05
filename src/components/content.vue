<template>
  <v-content>
      <v-container>
        <div class="grid"
          data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
            <v-layout d-block class="grid-sizer"></v-layout>
            <v-layout d-block v-for="(joke, index) in jokes" :key="index" class="grid-item">
              <Joke :joke="joke" :action="toggleFav" :favs="favorites"></Joke>
            </v-layout>
        </div>
      </v-container>
    </v-content>
</template>
<script>
import Vue from 'vue';
import Masonry from 'masonry-layout';
import localforage from 'localforage';
import _filter from 'lodash/filter';
import Joke from './joke.vue';

export default {
  name: 'Content',
  components: {
    Joke,
  },
  data() {
    return {
      msnry: null,
    };
  },
  computed: {
    jokes() {
      if (this.favorites) {
        // eslint-disable-next-line
        return _filter(this.$store.getters.favorites, (joke) => {
          return !!joke && joke.fav && this.shouldJokeDisplay(joke);
        });
      }
      // eslint-disable-next-line
      return _filter(this.$store.getters.jokes, (joke) => {
        return !!joke && (!this.categoryIsSelected || this.shouldJokeDisplay(joke));
      });
    },
    categoryIsSelected() {
      return this.category !== '';
    },
    category() {
      return this.$store.getters.selectedCategory;
    },
    favorites() {
      return this.$route.name === 'Favorites';
    },
  },
  methods: {
    toggleFav(joke) {
      this.$store.dispatch('toggleFavorites', joke).then(() => {
        if (this.favorites) this.layout();
      });
    },
    jokeHasCategory(joke) {
      if (typeof joke !== 'undefined' || joke !== null) {
        return joke.category !== null || typeof joke.category !== 'undefined';
      }
      return false;
    },
    jokeInSelectedCat(joke) {
      return joke.category.includes(this.category);
    },
    shouldJokeDisplay(joke) {
      return (this.jokeInSelectedCat(joke) && this.categoryIsSelected) || !this.categoryIsSelected;
    },
    layout() {
      Vue.nextTick()
        .then(() => {
        // DOM updated
          this.msnry.reloadItems();
          this.msnry.layout();
          window.scrollTo(0, document.querySelector('.grid').scrollHeight);
        });
    },
  },
  mounted() {
    const grid = document.querySelector('.grid');
    this.msnry = new Masonry(grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      gutter: 10,
    });
    localforage.getItem('favorites').then((value) => {
      this.$store.dispatch('localFavorites', value);
    // eslint-disable-next-line no-console
    }).catch(() => console.info('No local favorites.'));
  },
  watch: {
    category() {
      this.layout();
    },
    jokes(newJokes, oldJokes) {
      if (oldJokes.length !== newJokes.length) {
        this.layout();
      }
    },
    $route() {
      this.layout();
    },
  },
};
</script>
<style lang="scss">
@import "../../node_modules/vuetify/dist/vuetify.min";
.grid {
  padding-top: 60px;
}

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
