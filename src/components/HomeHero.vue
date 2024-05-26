<template>
  <v-container fluid class="pa-0">
    <v-parallax height="200" class="hero-background">
      <v-row align="center">
        <v-col>
          <p class="text-h3 font-weight-medium mb-4">Amplify</p>
          <p class="text-h5 text-uppercase">Learn. Support. Put it in print.</p>
        </v-col>
      </v-row>
    </v-parallax>
    <v-card flat width="80%" class="pa-10 ma-auto"
      ><p class="text-h6">
        Choose a cause to reach out to your representative for the Climate Can’t
        Wait Campaign 2022.
      </p>
      <p>
        30 advocacy orgs across New York are pushing a historic package that can
        drastically address climate change. Your assignment? Make sure you get
        the word out, we’ll handle post.
      </p></v-card
    >
  </v-container>
</template>

<script>
export default {
  name: 'HomeHero',
  computed: {
    campaign() {
      return this.$store.state.campaign
    }
  },
  created() {
    console.log(this.campaign)
  }
}
</script>

<style lang="less">
.hero-background {
  background-color: #38618c;
}
</style>
