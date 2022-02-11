<template>
  <div>
    <LogoutButton v-if="$auth.isAuthenticated" />
    <LoginButton v-else />
  </div>
</template>

<script>
import LoginButton from '@/components/LoginButton'
import LogoutButton from '@/components/LogoutButton'

export default {
  name: 'AuthenticationButton',
  components: { LogoutButton, LoginButton }
}
</script>
