<template>
  <div>
    <b-container>
      <b-row class="my-5">
        <b-col>
          <b-button
            @click="getWord"
            :disabled="isListenDisabled"
            variant="outline-info"
            >Listen</b-button
          >
        </b-col>
      </b-row>

      <!-- <b-form-input
            v-model="wordCheck"
            type="text"
            id="wordCheck"
            @keyup.enter="spellCheck"
          ></b-form-input> -->

      <b-row class="d-flex flex-row align-items-center justify-content-center">
        <b-col lg="1" v-for="l in wordLength" v-bind:key="l" class="letters">
          <b-form-input
            v-model="wordList.letter[l]"
            maxlength="1"
            type="text"
            :id="`wordCheck-${l}`"
            @keyup.enter="spellCheck"
            :disabled="isInputDisabled"
          >
          </b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="mb-3">
          <p>{{ spellResults }}</p>
        </b-col>
        <b-col cols="12" class="mb-3">
          <b-button
            block
            class="me-3"
            id="spellCheck"
            @click="spellCheck"
            :disabled="isDisableSpellCheck"
            variant="outline-success"
            >Spell Check</b-button
          >

          <b-button
            block
            id="hint"
            @click="getHint"
            :disabled="isDisableSpellCheck"
            variant="outline-warning"
            >Hint</b-button
          >
        </b-col>
      </b-row>
    </b-container>
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
  },
  data() {
    return {
      word: "",
      wordCheck: "",
      spellResults: "",
      isListenDisabled: false, //disabling the button when user enters the spelling
      isDisableSpellCheck: true, //Disable the button untill a word is entered
      isInputDisabled: true, //Disabling the input until the play button is clicked
      wordLength: 1,
      wordList: {
        //Obtainign the letters in an array
        letter: [],
      },
    };
  },
  watch: {
    //check for value change
    wordCheck(val) {
      if (val) {
        this.isDisableSpellCheck = false;
        this.isListenDisabled = true;
      }
    },
    wordList: {
      handler() {
        this.wordLength++;
        this.wordCheck = this.wordList.letter.join("");
      },
      deep: true,
    },
  },
  methods: {
    /**
     * Generating a random word
     */
    getWord() {
      //using the random words npm package to generate a word
      let randomWords = require("random-words");
      this.word = randomWords(1);

      //Enabling the input field
      this.isInputDisabled = false;

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

      if (validated || this.isDisableSpellCheck) {
        return;
      }

      //check if the spelling is correct
      if (this.word != this.wordCheck.toLowerCase()) {
        //Error audio play
        const errorAudio = new Audio(
          "https://www.fesliyanstudios.com/play-mp3/5265"
        );
        errorAudio.play();

        //dispatching the store action
        this.$store.dispatch("incorrectSpelling");

        //Displaying a toast message
        this.$bvToast.toast("You have spelled the word incorrectly", {
          title: "Incorrect",
          variant: "error",
          solid: true,
        });
      } else {
        //Success audio play
        const successAudio = new Audio(
          "https://www.fesliyanstudios.com/play-mp3/5250"
        );
        successAudio.play();

        //dispatching the store action
        this.$store.dispatch("successSpelling");

        //Displaying a toast message
        this.$bvToast.toast("You have spelled the word correct", {
          title: "Congratulations",
          variant: "success",
          autoHideDelay: 5000,
          solid: true,
        });
      }

      this.resetFields();
    },

    /**
     * Method to validate the entered word
     */
    validateWord() {
      if (!this.wordCheck) {
        //Null check
        this.spellResults = "Please Enter the word";
        return true;
      } else if (!this.wordCheck.match(/^[A-Za-z]+$/)) {
        //checking for special characters
        this.spellResults = "Please Enter a valid word with letters only";
        return true;
      } else {
        return false;
      }
    },

    /**
     * Restting all fields after every attempt
     */
    resetFields() {
      this.word = "";
      this.wordCheck = "";
      this.wordLength = 1;
      this.isInputDisabled = true;
      this.isDisableSpellCheck = true;
      this.isListenDisabled = false;
      this.wordList = {
        //Obtainign the letters in an array
        letter: [],
      };
      // Remove class from all children elements of .letters div
      const elements = document.querySelectorAll(".letters *");
      elements.forEach((element) => {
        element.classList.remove("incorrect");
      });
    },

    /**
     * Method to get hint
     */
    getHint() {
      //validate the word
      let validated = this.validateWord();

      if (validated || this.isDisableSpellCheck) {
        return;
      }

      //Spliting the string to characters to compare
      let str1 = this.word[0].split("");
      let str2 = this.wordCheck.toLowerCase().split("");

      //Identifying the difference between strings
      let diff = str2.filter((x) => !str1.includes(x));

      //Looping through the differnt letters
      let indexes = [];
      str2.forEach((w) => {
        diff.findIndex((value, index) => {
          if (value == w) {
            indexes.push(index);
          }
        });
      });

      indexes.forEach((i) => {
        let letterPos = i + 1;
        let letterId = "wordCheck-" + letterPos;
        let ele = document.getElementById(letterId);
        //Adding the class to show the hint
        ele.classList.add("incorrect");
      });

      indexes = [];
    },
  },
};
</script>

<style>
.incorrect {
  background-color: #ffcccb !important;
}
</style>