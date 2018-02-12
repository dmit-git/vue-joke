<template>
<div>
  <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
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
            ></v-select>
          <v-spacer></v-spacer>
          <v-text-field
              name="input-5"
              label="Search for joke"
              v-model="searchQry"
              :append-icon="'search'"
              :type="'text'"
              color="primary"
              single-line
            ></v-text-field>
        </v-container>
      </v-toolbar>
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
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    }
  },
  created() {
    this.$store.dispatch('fetchCategories');
  },
  methods: {
    getIconString: (string) => { return iconMapper.getIconString(string); },
  },
  watch: {
    selectedCat(val) {
      this.$store.dispatch('setCategory', val);
    },
  },
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
.category-title{
    text-transform: capitalize;
}
.header-container{
  .input-group__details{
    min-height: 7px;
  }
}
</style>

