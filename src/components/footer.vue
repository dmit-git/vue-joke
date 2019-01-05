<template>
  <v-footer color="indigo" height="auto" app fixed row justify-center>
      <v-container row justify-space-between>
      <span class="white--text">&copy; 2018</span>
      <v-spacer></v-spacer>
      </v-container>
    </v-footer>
</template>
<script>
export default {
  name: 'Footer',
};
</script>
<style lang="scss">
  .footer{
    justify-content: center;
  div {
    display: flex;
    flex-direction: row;
    padding-top: 0px;
    padding-bottom: 0px;
    align-items: center;
  }
}
</style>
