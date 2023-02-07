import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: "",
    userScore: {
      attempts: 0,
      successfulAttempts: 0
    }
  },
  getters: {
  },
  mutations: {
    //intialising the store with the local storage
    initialiseStore(state) {
      let currUser = localStorage.getItem('currentUser')
      if (currUser) {
        state.currentUser = currUser;
      }

      let currScore = localStorage.getItem('userScore');
      if (currScore) {
        state.userScore = JSON.parse(currScore);
      }
    },

    //setting the current user to the store and local storage
    set_currenUser(state, data) {
      localStorage.setItem('currentUser', data)
      state.currentUser = data;
    },

    //setting the current user score to the store and local storage
    set_userScore(state, data) {
      localStorage.setItem('userScore', JSON.stringify(data));
      state.userScore = data
    },

    //Increamenting values based if the spelling is correct
    set_success(state) {
      state.userScore.attempts++;
      state.userScore.successfulAttempts++
      localStorage.setItem('userScore', JSON.stringify(state.userScore));
    },

    //Incrementing only the attempts value if the spelling is wrong
    set_unsuccess(state) {
      state.userScore.attempts++;
      localStorage.setItem('userScore', JSON.stringify(state.userScore));
    }
  },
  actions: {
    /**
     * Method to increament if the spelling is correct
     * @param {*} param0 
     */
    successSpelling({ commit }) {
      commit('set_success')
    },

    /**
     * Method to handle incorrect spelling
     * @param {*} param0 
     */
    incorrectSpelling({ commit }) {
      commit('set_unsuccess')
    },

    /**
     * Resting the state details
     * @param {*} param0 
     */
    resetUser({ commit }) {
      let currentUser = "";
      let userScore = {
        attempts: 0,
        successfulAttempts: 0
      };

      commit("set_currenUser", currentUser);
      commit("set_userScore", userScore);
      localStorage.clear();
    }
  },
  modules: {
  }
})
