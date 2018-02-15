<template>
    <v-card>
        {{joke.value}}
        <v-card-actions class="white">
                <v-spacer></v-spacer>
                <v-btn flat icon :color="favIconColor" @click="action(joke)">
                  <v-icon>thumb_up</v-icon>
                </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
  name: 'Joke',
  props: {
      joke: {
          required: true,
          type: Object,
      },
      action: {
          required: true,
          type: Function,
      }
  },
  computed: {
    favIconColor() {
      return this.joke.fav ? 'primary darken-1'  : 'grey lighten-3';
    },
  },
}
</script>
<style>

</style>
