<template>
  <div>
    <b-container>
      <div>
        <b-row class="justify-content-md-center">
          <b-col lg="4" class="d-flex align-items-start flex-column">
            <label> Enter User Name </label
            ><b-form-input
              v-model="userName"
              type="text"
              id="user-name"
            ></b-form-input>
            <p v-if="isError">Please Enter a user name</p>
          </b-col></b-row
        >

        <b-row class="justify-content-md-center mt-4">
          <b-col lg="4">
            <b-button @click="setUser">Submit</b-button>
          </b-col>
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
      isError: false,
    };
  },
  methods: {
    /**
     * Submit button function
     */
    setUser() {
      if (!this.userName) {
        this.isError = true;
        return;
      }

      this.$store.commit("set_currenUser", this.userName);
    },
  },
};
</script>

<style>
</style>