<template>
  <div>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <router-link to="/">
          <v-list-tile @click="drawer = !drawer">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>All Jokes</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/favorites">
          <v-list-tile @click="drawer = !drawer">
            <v-list-tile-action>
              <v-icon>star</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Favorites</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
      <v-divider></v-divider>
    </v-navigation-drawer>
    <v-toolbar
      color="indigo"
      dark
      fixed
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-toolbar-side-icon>
      <v-select
        v-bind:items="categories"
        label="Select category"
        class="input-group--focused"
        v-model="selectedCat"
        item-value="text"
        single-line
        v-if="!favorites"
      >
      </v-select>
      <v-icon
        class="clearBtn"
        @click="clearCat()"
        v-if="selectedCat!='' && !favorites"
      >close</v-icon>

      <v-btn
        dark
        color="primary"
        @click="randJoke"
        v-if="!favorites"
        title="Add random joke"
      >Fetch Joke
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-btn
        dark
        color="pink"
        @click="clearJokes"
        v-show="!favorites && jokesAvailable"
        title="Clear jokes!"
      >Clear Jokes
        <v-icon dark>clear</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        name="input-5"
        label="Search for joke"
        v-model="searchQry"
        :append-icon="'search'"
        :type="'text'"
        color="primary"
        single-line
        @keyup.enter="search"
        v-if="!favorites"
      ></v-text-field>
    </v-toolbar>
    <v-progress-linear
      v-show="loading"
      v-bind:indeterminate="true"
    ></v-progress-linear>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      drawer: false,
      searchQry: '',
      selectedCat: '',
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    loading() {
      return this.$store.getters.loading;
    },
    favorites() {
      return this.$route.name === 'Favorites';
    },
    jokesAvailable() {
      return this.$store.getters.jokes.length > 0;
    },
  },
  created() {
    this.$store.dispatch('fetchCategories');
  },
  methods: {
    search() {
      if (this.searchQry !== '') {
        this.$store.dispatch('searchJoke', this.searchQry);
      }
    },
    clearCat() {
      this.$store.dispatch('setCategory', '');
      this.selectedCat = '';
    },
    clearJokes() {
      this.$store.dispatch('clearJokesList');
    },
    randJoke() {
      this.$store.dispatch('fetchRandJoke');
    },
  },
  watch: {
    selectedCat(val) {
      this.$store.dispatch('setCategory', val);
    },
  },
};
</script>
<style lang="scss">
.toolbar {
  .toolbar__content {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .header-container.container {
      display: flex;
      padding: 0 16px;
    }
  }
}
.menu__content--select {
  margin-top: 18px;
}
.clearBtn {
  align-items: center;
  padding-bottom: 10px;
  cursor: pointer;
}
.category-title {
  text-transform: capitalize;
}
.header-container {
  .input-group__details {
    min-height: 7px;
  }
}
.v-progress-linear {
  top: 56px;
  margin-top: 0px !important;
  position: fixed !important;
  z-index: 1;
}
.v-navigation-drawer {
  .v-list {
    a {
      text-decoration: none;
      &:hover > li {
        background: rgba(63, 81, 181, 0.55);
        color: white;
        .list__tile:not(.list__tile--active) {
          color: white;
        }
      }
    }
  }
}
</style>
