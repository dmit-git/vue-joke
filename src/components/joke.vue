<template>
  <v-card>
    <v-card-title>
      <div>
        <span>{{joke.value}}</span>
      </div>
    </v-card-title>
    <v-card-actions class="white">
      <v-spacer></v-spacer>
      <v-btn
        flat
        icon
        :color="favIconColor"
        @click="action(joke)"
        title="Add to favorites!"
      >
        <v-icon>thumb_up</v-icon>
      </v-btn>
      <v-btn
        flat
        small
        icon
        color="pink"
        @click="remove(joke.id)"
        title="Remove from list."
        v-if="!favs"
      >
        <v-icon>clear</v-icon>
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
    },
    action: {
      required: true,
      type: Function,
    },
    favs: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    favIconColor() {
      return this.joke.fav ? 'primary darken-1' : 'grey lighten-3';
    },
  },
  methods: {
    remove(id) {
      this.$store.dispatch('removeJokeById', id);
    },
  },
};
</script>
