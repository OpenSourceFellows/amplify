<template>
  <v-toolbar color="primary">
    <v-app-bar-nav-icon to="/">
      <img alt="Vue logo" src="../assets/logo/Amplify-Email.png" height="40" />
    </v-app-bar-nav-icon>

    <v-toolbar-title
      class="white--text text-h6"
      style="cursor: pointer"
      @click="$router.push('/')"
    >
      AMPLIFY
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-btn
        v-for="item in menuItems"
        :key="item.title"
        class="white--text text-capitalize font-weight-bold"
        color="primary"
        elevation="0"
        :to="item.path"
      >
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      dialog: false,
      menuItems: [
        { title: 'Home', path: '/' }
        // { title: 'About', path: '/about' }
      ]
    }
  }
}
</script>
<style lang="less"></style>
