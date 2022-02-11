<template>
  <v-footer dark padless>
    <v-card
      flat
      tile
      class="flex lighten-1 text-center"
      color="theme_mediumGray"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 theme_darkBlue--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="theme_darkBlue--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum.fewfawfwf
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="theme_mediumGray--text">
        © {{ new Date().getFullYear() }} —
        <strong> PASSTHEPOLICY. ALL RIGHTS RESERVED.</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
  })
}
</script>
