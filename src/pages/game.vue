<template>
    <div class="game">
        <div class="game__start" v-if="this.gamemode == null">
            <button class="game__start__button --alone" @click="this.gamemode = 0 ">Play Alone</button>
            <button class="game__start__button --together" @click="this.gamemode = 1">Fight another Player</button>
            <button class="game__start__button --time" @click="this.gamemode = 2">Fight the Time</button>
        </div>
        <div class="game__alone" v-if="this.gamemode == 0">
            <div>{{ this.questions }}</div>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
    name: 'QuizGame',
    data() {
        return {
            gamemode: null,
            questions: "",


        }
    },
    mounted () {
        axios
        .get('https://opentdb.com/api.php?amount=20')
        .then(response => (this.questions = response))
        console.log(this.questions);
    },
    components: {

    }
  }
  </script>
  
  <style lang="scss">
 .game {
    margin: 5%;
    width: 90%;
    background-color: rgb(232, 230, 230);
    border-radius: 5%;
    box-shadow: 0 0 3px rgb(213, 213, 213);
    &__start {
        padding: 20px;
        display: flex;
        flex-direction: column;

        &__button {
            font-size: 20px;
            margin: 20px;
            padding: 15px;
            border-radius: 7px;
            border: none;
            color: white;
            &:hover {
                cursor: pointer;
                box-shadow: 0 0 5px rgb(86, 86, 86);
            }
            &.--alone {
                background-color: rgb(60, 141, 60);
            }
            &.--together {
                background-color: rgb(81, 81, 190);
            }
            &.--time {
                background-color: rgb(169, 75, 169);
            }
        }
    }

 }
  </style>