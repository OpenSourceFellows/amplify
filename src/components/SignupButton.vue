<template>
  <button
    class="btn btn-primary btn-block"
    v-if="!$auth.isAuthenticated"
    @click="signup"
  >
    Sign Up
  </button>
</template>

<script>
export default {
  name: 'SignupButton',
  methods: {
    signup() {
      this.$auth.loginWithRedirect({
        screen_hint: 'signup'
      })
    }
  }
}
</script>
