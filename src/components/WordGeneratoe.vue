<template>
  <div>
    <container>
      <h1>SpellIt</h1>
      <b-button @click="getWord">Listen</b-button>
      <b-row>
        <b-form-input
          v-model="wordCheck"
          type="text"
          id="wordCheck"
        ></b-form-input
        >\
        <b-button id="spellCheck" @click="spellCheck">Spell Check</b-button>
      </b-row>
      <b-row>
        <p>{{ spellResults }}</p>
      </b-row>
    </container>
  </div>
</template>

<script>
export default {
  name: "wordGenerator",
  mounted() {
    //ensuring that speech synthesis is supported
    if ("speechSynthesis" in window) {
      console.log("supported");
    } else {
      alert("This browser does not support speech synthesis");
    }

    //trigger the submit functionality on enter
    let wordCheck = document.getElementById("wordCheck");
    wordCheck.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("spellCheck").click();
      }
    });
  },
  data() {
    return {
      word: "",
      wordCheck: "",
      spellResults: "",
    };
  },
  methods: {
    /**
     * Generating a random word
     */
    getWord() {
      //using the random words npm package to generate a word
      let randomWords = require("random-words");
      this.word = randomWords(1);

      //converting the text to speech
      let speechWord = new SpeechSynthesisUtterance();
      speechWord.rate = 0.5;
      speechWord.text = this.word;
      console.log(this.word);
      window.speechSynthesis.speak(speechWord);
    },

    /**
     * Checking the spelled word
     */
    spellCheck() {
      //validate the word
      let validated = this.validateWord();

      if (validated) {
        return;
      }

      //check if the spelling is correct
      if (this.word != this.wordCheck.toLowerCase()) {
        this.spellResults = "Incorrect";
      } else {
        this.spellResults = "Correct";
      }
    },

    /**
     * Method to validate the entered word
     */
    validateWord() {
      console.log(this.wordCheck.match(/^[A-Za-z]+$/));
      if (!this.wordCheck) { //Null check
        this.spellResults = "Please Enter the word";
        return true;
      } else if (!this.wordCheck.match(/^[A-Za-z]+$/)) { //checking for special characters
        this.spellResults = "Please Enter a valid word with letters only";
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
</style>