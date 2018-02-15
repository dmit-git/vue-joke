<template>
  <v-app id="inspire">
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Content from './components/content';
import Footer from './components/footer';
import Header from './components/header';

export default {
  name: 'app',
  components: {
     Content,
     Footer,
     Header
  }, 
}
</script>

<style lang="scss">
html{
  scroll-behavior: smooth;
}
</style>
