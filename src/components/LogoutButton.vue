<template>
  <button
    class="btn btn-danger btn-block"
    v-if="$auth.isAuthenticated"
    @click.prevent="logout"
  >
    Log Out
  </button>
</template>

<script>
export default {
  name: 'LogoutButton',
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push({ path: '/' })
    }
  }
}
</script>
