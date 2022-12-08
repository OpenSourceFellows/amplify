<template>
  <div
    :style="{ 'background-image': 'url(' + imgPath + ')' }"
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
      <a :href="campaignUrl" target="_blank">
        <img
          src="@/assets/scm/images/campaign-logo.webp"
          alt="sogorea te land trust"
          class="pa-4 campaign-feature-image"
        />
      </a>
      <h1 class="white--text">Protect Our Sacred Shellmounds</h1>
      <h2 class="white--text">Make Your Voice Count</h2>
      <div class="d-flex justify-center align-center">
        <v-btn
          elevation="2"
          class="mt-2 mb-4 mx-3 action-btn"
          color="secondary"
          :to="{
            name: 'Campaign',
            params: { campaignId }
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
      campaignName: "Sogorea Te' Land Trust",
      campaignUrl: 'https://sogoreate-landtrust.org/',
      campaignId: 5,
      imgPath: require('@/assets/scm/images/campaign-background.webp')
    }
  },
  computed: {
    lightTheme() {
      return lightTheme
    }
  },
  methods: {
    // Found on stack overflow, and modified to add alpha value.
    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    hexToRgba(hex, alpha) {
      hex = hex.replace('#', '')

      const bigint = parseInt(hex, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255

      return `${r}, ${g}, ${b}, ${alpha}`
    }
  }
}
</script>

<style lang="less" scoped>
.main-content {
  background-color: @tertiary;
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
  max-width: 100%;
}

.action-btn {
  font-size: 1.25rem !important;
  font-weight: bold;
  text-transform: none !important;
  padding: 2rem !important;
}

.campaign-feature-image {
  max-width: 100%; // Needs to be changed later
}
</style>
