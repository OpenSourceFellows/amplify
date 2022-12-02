<template>
  <div class="d-flex flex-column align-center blurb">
    <div>
      <img
        src="@/assets/images/sogorea-te-8.png"
        alt="supplemental image one"
        class="mx-2 my-4 supplemental-img"
      />
      <img
        src="@/assets/images/sogorea-te-7.png"
        alt="supplemental image two"
        class="mx-2 my-4 supplemental-img"
      />
      <img
        src="@/assets/images/sogorea-te-3.jpg"
        alt="supplemental image three"
        class="mx-2 my-4 supplemental-img"
      />
    </div>
    <div class="px-6 text-content">
      <p class="flavor-text">
        {{ flavorText }}
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
      :to="{
        name: 'Campaign',
        params: { campaignId }
      }"
    >
      Write Your Representatives Now
    </v-btn>
  </div>
</template>

<script>
import campaignData from '@/assets/text/text.json'
export default {
  name: 'CampaignBlurb',
  computed: {
    flavorText() {
      return campaignData.campaign_text
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/styles/sogorea-te.less';
.blurb {
  background-color: #fff;
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
  background-color: @amp-blue;
  padding: 1rem;
}

.banner-img {
  max-width: 100%;
}

.action-btn {
  background-color: @amp-orange !important;
  color: #000 !important;
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
