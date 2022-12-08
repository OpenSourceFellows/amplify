<template>
  <v-footer padless>
    <v-card
      flat
      tile
      class="flex footer lighten-1 text-center"
      color="med-gray"
    >
      <v-card-text>
        <v-btn
          v-for="(icon, index) in icons"
          :key="index"
          class="mx-4 primary--text"
          icon
        >
          <a :href="icon.url" target="_blank" class="social-link">
            <v-icon size="3rem">
              {{ icon.logo }}
            </v-icon>
          </a>
        </v-btn>
      </v-card-text>

      <v-card-text class="primary--text pt-0 text-h5">
        Amplify. Learn. Support. Put it in Print.
      </v-card-text>

      <v-divider />

      <v-card-text class="primary-alt--text">
        © {{ new Date().getFullYear() }} —
        <strong> PASSTHEPOLICY. ALL RIGHTS RESERVED.</strong>
      </v-card-text>

      <v-card-text class="primary--text pt-0">
        To report issues, go to
        <a
          href="https://github.com/ProgramEquity/amplify/issues"
          target="_blank"
          class="bug-links"
          >our Github</a
        >
        or email
        <a href="mailto:team@programequity.com" class="bug-links">us</a>.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {
        logo: 'mdi-facebook',
        url: 'https://www.facebook.com/savetheshellmound'
      },
      {
        logo: 'mdi-twitter',
        url: 'https://twitter.com/programequity'
      },
      {
        logo: 'mdi-linkedin',
        url: 'http://www.linkedin.com/company/programequity/'
      },
      {
        logo: 'mdi-instagram',
        url: 'https://www.instagram.com/passthepolicy/'
      }
    ]
  })
}
</script>

<style lang="less" scoped>
.social-link {
  text-decoration: none;
  color: inherit;
}

.social-link:visited {
  text-decoration: inherit;
  color: inherit;
}

.bug-links {
  text-decoration: none;
  color: @secondary;
}
</style>
