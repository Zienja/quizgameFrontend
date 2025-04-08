<template>
    <div class="userPopUp">
        <div class="userPopUp__center">
            <div class="userPopUp__container">
                <div class="userPopUp__container__style">
                    <button class="userPopUp__container__close" @click="$emit('close')">x</button>
                    <div class="userPopUp__container__label">Username</div>
                    <input class="userPopUp__container__input" v-model="this.username"/>
                    <div class="userPopUp__container__label">Password</div>
                    <input class="userPopUp__container__input" type="password" v-model="this.password" />
                    <div class="userPopUp__container__box">
                        <button class="userPopUp__container__box__button --register" @click="this.register()">Register</button>
                        <button class="userPopUp__container__box__button --login" @click="this.login()">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: 'UserPopUp',
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        register: async function() {
            const {data} = await axios.post('https://localhost:7111/users', {
                Name: this.username,
                Password: this.password,
                Score: 0
            }, { 
                headers: {
                    withCredentials: true,
            }})
            .then(response => {
                this.$emit('user', response);
                this.$emit('close');
                this.$notify({
                    title: "Worked!",
                    text: "Logged in!",
                    position: "top right",
                    type: "success"
                });
                console.log(response);
            })
            .catch(error => {
                this.$notify({
                    title: "Wrong Name or Password!",
                    text: "Try again!",
                    position: "top right",
                    type: "warn"
                });
                console.error('Error:', error);
            });
        },
        //TODO Datenschutz beachten // passsord length usw 
        login: async function() {
            axios.get('https://localhost:7111/users/' + this.username + '/' + this.password, {
                withCredentials: true,  // Erlaubt das Senden von Cookies und Auth-Headern
            })
            .then(response => {
                this.$emit('user', response.data);
                this.$emit('close');
                console.log(response);
            })
            .catch(error => {
                this.$notify({
                    title: "Wrong Name or Password!",
                    text: "Try again!",
                    position: "top right",
                    type: "warn"
                });
                console.error('Error:', error);
            });
        }

    }
  }
  </script>
  
  <style lang="scss">
 .userPopUp {
    background-color: rgba(101, 101, 101, 0.674);
    height: 100%;
    width: 100%;
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    &__center {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }
    &__container {
        background-color: white;
        height: 50%;
        width: 31%;
        border-radius: 15px;
        text-align: left;
        &__style {
            width: 100%;
            height: 100%;
            padding: 30px;
        }
        &__close {
            color: rgb(224, 136, 136);
            background-color: transparent;
            border: none;
            font-size: 15px;
            text-align: right;
            position: absolute;
            right: 38%;
            &:hover {
                color: red;
                cursor: pointer;
                text-shadow: 0 0 3px rgb(190, 190, 190);
            }
        }
        &__label {
            color:black;
            font-size: 15px;
            margin: 15px 30px;
            text-shadow: 0 0 3px rgb(230, 230, 230);
        }
        &__input {
            margin: 0 30px;
            box-shadow: 0 0 3px rgb(230, 230, 230);
            padding: 10px 15px;
        }
        &__box {
            margin: 30px;
            &__button {
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                border: none;
                box-shadow: 0 0 3px rgb(230, 230, 230);
                &.--register {
                    background-color: rgb(42, 131, 66);
                }
                &.--login {
                    background-color: rgb(69, 69, 151);
                    margin-left: 20px;
                }
                &:hover {
                    cursor: pointer;
                    box-shadow: 0 0 5px grey;
                }
            }
        }
    }
 }
  </style>