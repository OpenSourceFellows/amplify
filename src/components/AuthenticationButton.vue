<template>
  <!-- Check that the SDK client is not currently loading before accessing is methods -->
  <div v-if="!$auth.loading">
    <!-- show login when not authenticated -->
    <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
    <!-- show logout when authenticated -->
    <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
  </div>
  <!-- <div>
    <LogoutButton v-if="$auth.isAuthenticated" />
    <LoginButton v-else />
  </div> -->
</template>

<script>
export default {
  name: 'AuthenticationButton',
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect()
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      })
    }
  }
}
// import LoginButton from '@/components/LoginButton'
// import LogoutButton from '@/components/LogoutButton'

// export default {
//   name: 'AuthenticationButton',
//   components: { LogoutButton, LoginButton }
// }
</script>
