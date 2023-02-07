<template>
  <div>
    <b-row class="justify-content-md-center">
      <b-col lg="4">
        <b-card bg-variant="light">
          <h3 class="mb-2"><b-avatar></b-avatar> Welcome {{ currUser }} !</h3>
          <div class="d-flex flex-row justify-content-around">
            <h4>Words Attempted : {{ userScore.attempts }} </h4>
            <h4>Successfully spelled : {{ userScore.successfulAttempts }}</h4>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "userCard",
  computed: {
    ...mapState({
      currUser: "currentUser",
      userScore: "userScore",
    }),
  },
};
</script>

<style>
</style>>