<template>
    <v-card>
        {{joke.value}}
        <v-card-actions class="white">
                <v-spacer></v-spacer>                
                <v-btn flat icon color="blue lighten-3">
                  <v-icon>thumb_down</v-icon>
                </v-btn>
                <v-btn flat icon color="red lighten-3">
                  <v-icon>favorite</v-icon>
                </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
  props: {
      joke: {
          required: true,
          type: Object,
      }
  }
}
</script>
<style>

</style>
