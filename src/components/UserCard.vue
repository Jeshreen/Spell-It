<template>
  <div>
    <h3 class="mb-2"><b-avatar></b-avatar> Welcom {{ currUser }} !</h3>
    <h4>Words Attempted : {{userScore.attempts}}</h4>
    <h4>Successfully spelled : {{userScore.successfulAttempts}}</h4>
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