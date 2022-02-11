<template>
  <v-row>
    <v-btn color="primary" v-if="!$auth.isAuthenticated" @click="login">
      LOG IN TO SEND
    </v-btn>
  </v-row>
</template>

<script>
export default {
  name: 'LoginButton',
  created() {
    this.cmpId = this.$route.params.campaignId
  },
  methods: {
    login() {
      var cmpId = this.$route.params.campaignId
      var postalCode = this.$route.params.postalCode
      var memberid = this.$route.params.member

      this.$auth.loginWithRedirect({
        appState: {
          targetUrl: `/campaign/${cmpId}/postalcode/${postalCode}/member/${memberid}`
        }
      })
    }
  }
}
</script>
