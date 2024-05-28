<template>
  <div class="d-flex flex-column align-center blurb">
    <div>
      <img
        :src="assets['campaign-img-1']"
        alt="supplemental image one"
        class="mx-2 my-4 supplemental-img"
      />
      <img
        :src="assets['campaign-img-2']"
        alt="supplemental image two"
        class="mx-2 my-4 supplemental-img"
      />
      <img
        :src="assets['campaign-img-3']"
        alt="supplemental image three"
        class="mx-2 my-4 supplemental-img"
      />
    </div>
    <div class="px-6 text-content">
      <p class="flavor-text" v-html="flavorText">
      </p>
    </div>

    <div class="amplify-banner">
      <img
        src="@/assets/images/amplify-web-3.png"
        alt="how amplify works"
        class="banner-img"
      />
    </div>

    <v-btn
      elevated
      class="my-4 action-btn"
      color="secondary"
      :to="{
        name: 'Campaign',
        params: { campaignId: campaignId || 'undefined' }
      }"
    >
      Write Your Representatives Now
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CampaignBlurb',
  computed: {
    flavorText() {
      return this.$store.state.campaign.campaignText
    },
    campaignId() {
      return `${this.$store.state.campaign.id}`
    },
    assets() {
      return this.$store.state.assets
    }
  }
}
</script>

<style lang="less" scoped>
.blurb {
  background-color: @white;
}

.text-content {
  width: 100%;
  text-align: left;
  white-space: break-spaces;
}

.supplemental-img {
  max-width: 350px;
  height: 225px;
}

.amplify-banner {
  background-color: @primary;
  padding: 1rem;
}

.banner-img {
  max-width: 100%;
}

.action-btn {
  font-size: 18px !important;
  font-weight: bold;
  text-transform: none !important;
  padding: 2rem !important;
}

@media screen and (min-width: 700px) {
  .text-content {
    width: 65%;
  }
}
</style>
