<template>
  <div id="app">
    <h1>Spell-It</h1>
    <p>Listen to the word, and spell it ...</p>
    <UserDetails v-if="!user" />
    <div v-if="user">
      <UserCard />
      <WordGenerator />
      <b-button @click="reset" variant="outline-danger">Reset Game</b-button>
    </div>
  </div>
</template>

<script>
import WordGenerator from "./components/WordGenerator.vue";
import UserDetails from "./components/UserDetails.vue";
import UserCard from "./components/UserCard.vue";
export default {
  name: "App",
  components: {
    WordGenerator,
    UserDetails,
    UserCard,
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    reset() {
      this.$store.dispatch("resetUser")
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
