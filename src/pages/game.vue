<template>
    <div class="game">
        <div class="game__start">
            <button class="game__start__button">Alone</button>
            <button class="game__start__button">Together</button>
        </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'QuizGame',
    data() {
        return {
            
        }
    },
    components: {

    }
  }
  </script>
  
  <style lang="scss">
 .game {
    margin: 20%;
    background-color: rgb(191, 189, 189);
    border-radius: 5%;
    box-shadow: 0 0 3px grey;
    &__start {
        padding: 20px;
        &__button {
            font-size: 20px;
        }
    }

 }
  </style>