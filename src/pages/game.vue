<template>
    <div class="game">
        <div class="game__start" v-if="this.gamemode == null">
            <button class="game__start__button --alone" @click="this.gamemode = 0 ">Play Alone</button>
            <button class="game__start__button --together" @click="this.gamemode = 1">Fight another Player</button>
            <button class="game__start__button --time" @click="this.gamemode = 2">Fight the Time</button>
        </div>
        <div class="game__alone" v-if="this.gamemode == 0">
            <div class="game__question" 
            v-for="(question,i) in this.questions" 
            v-show="i == this.actualQuestionIndex"
            :key="i">
                <div class="game__question__difficult --t --row" >
                    Difficulty:&nbsp;
                    <div :style="{color : this.difficultyColors[question.difficulty]}">{{ question.difficulty }}</div>
                </div>
                <div class="game__question__category --t">Category: {{ question.category }}</div>
                <div class="game__question__type --t">Type: {{ question.type }}</div>
                <div class="--t">Question:</div>
                <div class="game__question__text --t ">{{question.question.replace(/[^a-zA-Z0-9 -]*/g, '') }}</div>
                <div class="--column">
                    <button class="game__question_answers" 
                    v-for="(answer,index) in question.incorrect_answers"
                    :key="answer + index"
                    :style="{'background-color': this.buttonColors[index]}"
                    @click="checkAnswer(answer,index,question)">
                        {{ answer }}
                    </button>
                </div>
            </div>
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
            score: 0,
            questions: "",
            actualQuestionIndex: 0,
            difficultyColors: {
                easy: "green",
                medium: "orange",
                hard: "red"
            },
            buttonColors: ["#FF5F5D", "#00CCBF", "#BF6F8C", "#5B7BA6"],
        }
    },
    props: {
        user: Object
    },
    mounted () {
        this.getQuestions();
    },
    methods: {
        getQuestions: function() {
            axios
            .get('https://opentdb.com/api.php?amount=10')
            .then(response => {
                this.questions = response.data.results;
                this.questions.forEach(element => {
                    element.incorrect_answers.push(element.correct_answer);
                    element.incorrect_answers = this.shuffle(element.incorrect_answers);
                    element.question = this.decodeHTMLEntities(element.question);
                });
            })
        },
        checkAnswer: function(answer, index, question) {
            if (question.correct_answer == answer) {
                this.score += 100;
                this.$notify({
                    title: "Correct!",
                    text: "100 points were added to the score!",
                    position: "top right",
                    type: "success"
                });
            } else {
                this.$notify({
                    title: "Wrong!",
                    text: "Not the Correct Answer!",
                    position: "top right",
                    type: "warn"
                });
            }
            if (this.actualQuestionIndex < 9) {
              this.actualQuestionIndex++  
            } else {
                 this.updateScore();
                console.log("update score")
                this.gamemode = null;
                this.actualQuestionIndex = 0; 
                this.getQuestions();
            }
        },
        updateScore: async function() {
            await axios.put('https://localhost:7111/users/' + this.user.id, {
                Name: this.username,
                Password: this.password,
                Score: this.score
            }, { 
               
                    withCredentials: true,
            })
            .then(response => {
                this.$notify({
                    title: "Good Job!",
                    text: this.score +" points were added to the Account!",
                    position: "top right",
                    type: "success"
                });
                console.log(response)
            })
            .catch(error => {
                this.$notify({
                    title: "Error!",
                    text: "Could not save your points!",
                    position: "top right",
                    type: "warn"
                });
                console.log(error);
            });
            this.score = 0;
        },
        shuffle: function(array) {
            let currentIndex = array.length;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
                return array;
            }
        },
        decodeHTMLEntities: function(str) {
            let replace = {
                "\\" : "\\1F", //Note that this has to be \\, because you want a literal \.
                "~": "\\7E",
                "^": "\\5e"
            }
            return str.replace(/[\\~^]/g,(m) => replace[m])
        }
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
    &__alone {
        padding: 30px;
        font-size: 20px;
    }
    &__question {
        &__answers {
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
        }
    }
    
}
.--t {
    margin: 20px 0;
}
.--row {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.--column {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.game__question_answers {
    font-size: 15px;
    margin: 15px 0;
    padding: 10px;
    border-radius: 7px;
    border: none;
    color: white;
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px rgb(86, 86, 86);
    }
}
  </style>