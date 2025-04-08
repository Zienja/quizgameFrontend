<template>
  <div id="app">
    <mainNavigation @user="(user) => this.user = user" @openRankList="this.openWindow = 1" />
    <QuizGame :user="this.user" v-if="this.openWindow == 0"/>
    <RankList v-if="this.openWindow == 1" />
    <notifications />
  </div>
</template>

<script>
import mainNavigation from './components/mainNavigation.vue';
import QuizGame from './pages/game.vue';
import RankList from './pages/rankList.vue';

export default {
  name: 'App',
  data() {
    return {
      user: {},
      openWindow: 0
    }
  },
  components: {
    mainNavigation,
    QuizGame,
    RankList
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
