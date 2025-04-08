<template>
    <div class="nav">
        <div class="nav__logo">QuizGame</div>
        <router-link to="/Quiz" class="nav__text">Quiz</router-link>
        <div class="nav__text" @click="this.$emit('openRankList')">Rank List</div>
        <div class="nav__text" v-if="this.username.length < 1" @click="this.openUserPopUp = !this.openUserPopUp">Login</div>
        <div class="nav__text">{{ this.username }}</div>
        <UserPopUp 
            v-if="this.openUserPopUp == true" 
            @close="this.openUserPopUp = false"
            v-on:user="this.userLogin" />
    </div>
</template>

<script>
import UserPopUp from './userPopUp.vue';

export default {
    name: 'MainNavigation',
    data() {
        return {
            openUserPopUp: false,
            username: ""
        }
    },
    components: {
        UserPopUp
    },
    methods: {
        userLogin: function(user) {
            console.log(user);
            this.$emit('user', user);
            this.username = user.name;

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
        &:hover {
            cursor: pointer;
            text-shadow: 0 0 5px grey;
        }
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