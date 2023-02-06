<template>
  <div id="app">
    <WordGeneratoe />
  </div>
</template>

<script>
import WordGeneratoe from "./components/WordGeneratoe.vue";
export default {
  name: "App",
  components: {
    WordGeneratoe,
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
