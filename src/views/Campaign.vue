<template>
  <div class="campaign">
    <div class="d-block pa-6 theme_blue accent-4 white--text">
      <h1>This is the campaign page.</h1>
      <p>Campaign ID is {{ $route.params.campaignId }}</p>
      <v-btn @click="goHome"> Back to campaigns page </v-btn>
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
  props: {
    campaign: { type: Object, default: () => new Object() },
    test: { type: String, default: '' }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>
