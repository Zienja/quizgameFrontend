<template>
  <div id="app">
    <mainNavigation />
    <QuizGame  />
  </div>
</template>

<script>
import mainNavigation from './components/mainNavigation.vue';
import QuizGame from './pages/game.vue'

export default {
  name: 'App',
  components: {
    mainNavigation,
    QuizGame
  }
}
</script>

<style lang="scss">
body, html {
  margin: 0;
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
</style>
