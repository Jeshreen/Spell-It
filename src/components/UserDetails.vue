<template>
  <div>
    <b-container>
      <div>
        <b-row>
          <label> Enter User Name </label
          ><b-form-input
            v-model="userName"
            type="text"
            id="user-name"
          ></b-form-input
        ></b-row>
        <p v-if="isError">Please Enter a user name</p>
        <b-row>
          <b-button @click="setUser">Submit</b-button>
        </b-row>
      </div>

    </b-container>
  </div>
</template>

<script>
export default {
  name: "userDetails",
  data() {
    return {
      userName: "",
      isError:false
    };
  },
  methods:{
    /**
     * Submit button function
     */
    setUser(){
        if(!this.userName) {
            this.isError = true
            return;
        }

        this.$store.commit('set_currenUser',this.userName);
    }
  }
};
</script>

<style>
</style>