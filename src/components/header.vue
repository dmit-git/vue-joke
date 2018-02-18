<template>
<div>
  <v-navigation-drawer fixed v-model="drawer" app>
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
      <v-toolbar color="indigo" dark fixed app row justify-center>        
        <v-container class="header-container">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"><v-icon>menu</v-icon></v-toolbar-side-icon>
          <v-select
              v-bind:items="categories"
              label="Select category"
              class="input-group--focused"
              v-model="selectedCat"
              item-value="text"
              single-line
              v-if="!displayFavs"
            >
            </v-select>
            <v-icon class="clearBtn" @click="clearCat()" v-if="selectedCat!='' && !displayFavs">close</v-icon>
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
              v-if="!displayFavs"
            ></v-text-field>
        </v-container>
      </v-toolbar>
    <v-progress-linear v-show="loading" v-bind:indeterminate="true"></v-progress-linear>
</div>
</template>
<script>
import iconMapper from '../utilities/iconMaper.js';

export default {
  name: 'Header',
  data () {
    return {
      drawer: false,
      searchQry: '',
      selectedCat: '',
      displayFavs: '',
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  created() {
    this.$store.dispatch('fetchCategories');
  },
  methods: {
    getIconString: (string) => { return iconMapper.getIconString(string); },
    search: function() {
      if(this.searchQry !== ''){
        this.$store.dispatch('searchJoke', this.searchQry);
      }
    },
    clearCat: function() {
      this.$store.dispatch('setCategory', "" );
      this.selectedCat = "";
    },
  },
  watch: {
    selectedCat(val) {
      this.$store.dispatch('setCategory', val);
    },
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
.toolbar{
  .toolbar__content{
    display: flex;
    flex-direction: row;
    justify-content: center;

    .header-container.container{
      display: flex;
      padding: 0 16px;
    }
  }
  
}
.menu__content--select {
    margin-top: 18px;
}
.clearBtn{
  align-items: center;
  padding-bottom: 10px;
  cursor: pointer;
}
.category-title{
    text-transform: capitalize;
}
.header-container{
  .input-group__details{
    min-height: 7px;
  }
}
.progress-linear{
  top: 64px;
  margin-top: 0px !important;
    position: fixed !important;
    z-index: 1;
}
.navigation-drawer{
  .list{
    a{
      text-decoration: none;
      &:hover>li{
        background: rgba(63,81,181,0.55);
        color: white;
        .list__tile:not(.list__tile--active){
          color: white;
        }
      }
    }
  }
}
</style>

