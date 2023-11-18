<template>
  <div class="campaign">
    <div class="d-block pa-6 primary-alt accent-4 white--text">
      <h1>Amplify</h1>
      <h2>Learn. Support. Put it in Print.</h2>
      <v-btn class="mt-4 mb-2 action-btn" color="secondary" @click="goHome">
        Back to campaigns page
      </v-btn>
    </div>
    <search-reps />
  </div>
</template>

<script>
import SearchReps from '@/components/SearchReps.vue'

export default {
  name: 'Campaign',
  components: {
    SearchReps
  },
  data() {
    return {
      campaignHeader: 'Sogorea Te Land Trust',
      campaignSubHeader:
        'Facilitating the return of Indigenous land to Indigenous people.'
    }
  },
  created() {},
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.action-btn {
  font-size: 1.25rem !important;
  font-weight: bold;
  text-transform: none !important;
  padding: 2rem !important;
}
</style>
