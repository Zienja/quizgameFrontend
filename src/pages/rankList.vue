<template>
  <div class="ranklist">
      <div class="ranklist__header">Rank List</div>
      <div class="table__container">
        <div class="table__header --rank">Rank</div>
        <div class="table__header --user">User</div>
        <div class="table__header --score">Score</div>
      </div>
      <div class="table__container" v-for="(user,index) in this.users">
        <div class="table__header --rank">{{ index + 1 }}</div>
        <div class="table__header --user">{{ user.name }}</div>
        <div class="table__header --score">{{ user.score }}</div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RankList',
  data() {
    return {
      users: []
    }
  },
  computed: {
    listItems() {
        return this.users.sort(({score:a}, {score:b}) => b-a); 
    }
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers: async function() {
      await axios.get('https://localhost:7111/users', {
        withCredentials: true,  
      })
      .then(response => {
        console.log(response);
        //score.sort((a, b) => b.score - a.score)
        this.users = response.data;
        console.log("sorted",this.users);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
}
</script>

<style lang="scss">
 .ranklist {
    margin: 5%;
    width: 90%;
    background-color: rgb(232, 230, 230);
    border-radius: 5%;
    box-shadow: 0 0 3px rgb(213, 213, 213);
    padding: 20px;
    display: flex;
    flex-direction: column;
    &__header {
      font-size: 20px;
      margin-bottom: 20px;
    }
 }
 .table {
  &__container {
    display: grid;
    gap: 1rem;
    grid-template-rows: 1fr 1fr 1fr;
  }
 }
 .--rank {
  grid-column: 1 / 2;
 }
 .--user {
  grid-column: 2 / 3;
 }
 .--score {
  grid-column: 3 / 4;
 }
  </style>