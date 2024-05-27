<template>
  <div
    :style="{ 'background-image': 'url(' + bgPath + ')' }"
    class="d-flex justify-center align-center main-content"
  >
    <div
      :style="{
        'background-color': `rgba(${hexToRgba(
          lightTheme['primary-alt'],
          0.95
        )})`
      }"
      class="call-to-action"
    >
      <a :href="campaign.page_url" target="_blank">
        <img
          :src="assets.campaign_logo"
          alt="sogorea te land trust"
          class="pa-4 campaign-feature-image"
        />
      </a>
      <h2 class="white--text">
        {{ campaignTagline }}
      </h2>
      <h3 class="white--text">Make Your Voice Count</h3>
      <div class="d-flex justify-center align-center">
        <v-btn
          elevation="2"
          class="mt-2 mb-4 mx-3 action-btn"
          color="secondary"
          :to="{
            name: 'Campaign',
            params: { campaignId: campaign.id || 'undefined' }
          }"
        >
          Write Your Representatives
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { lightTheme } from '@/configs/theme.js'
export default {
  name: 'CampaignHero',
  data() {
    return {
      imgPath: require('@/assets/scm/images/campaign-background.webp')
    }
  },
  computed: {
    lightTheme() {
      return lightTheme
    },
    campaignTagline() {
      return this.campaign.campaignTagline
    },
    campaign() {
      return this.$store.state.campaign
    },
    assets() {
      return this.$store.state.assets
    },
    bgPath() {
      return this.assets.campaign_background
    }
  },
  methods: {
    // Modified to add alpha value.
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    hexToRgba(hex, alpha) {
      hex = hex.replace('#', '')

      const bigint = parseInt(hex, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255

      return `${r}, ${g}, ${b}, ${alpha}`
    },
    mounted() {
      console.log(this.campaign.assets)
      console.log(this.campaignAssets)
    }
  }
}
</script>

<style lang="less" scoped>
.main-content {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 450px;
}

.call-to-action {
  border-radius: 5px;
  box-shadow: 2px 2px 5px 1px rgba(92, 92, 92, 0.75);
  padding: 0 1.5rem;
}

.action-btn {
  font-size: 1.25rem !important;
  font-weight: bold;
  text-transform: none !important;
  padding: 2rem !important;
}

.campaign-feature-image {
  max-width: 40%; // Needs to be changed later
}
</style>
