<template>
    <div class="nav">
        <div class="nav__logo">QuizGame</div>
        <div class="nav__text">Home</div>
        <router-link to="/Quiz" class="nav__text">Quiz</router-link>
        <div class="nav__text">Rank List</div>
        <div class="nav__text">Users</div>
    </div>
</template>

<script>
export default {
    name: 'MainNavigation',
    data() {
        return {
            
        }
    }
}
</script>

<style lang="scss">
.nav {
    width: 10%;
    height: 100%;
    background-color: rgb(81 86 123);
    padding: 5%;
    box-shadow: 0 0 5px rgb(75, 75, 75);
    color: white;
    &__text {
        padding-bottom: 20px;
    }
    &__logo {
        margin-bottom: 30px;
    }
}
a {
    display: inline-block;
    color: white;

  }
  a:hover,
  a.router-link-active {
    text-shadow: 0 0 5px grey;
  }
</style>