// Reusable card for cause-campaigns.
<template>
  <v-card class="d-flex flex-column cause-card">
    <img
      :src="getCampaignLogo(campaign.logo_url)"
      :alt="`campaign image for ${campaign.name}`"
      width="100%"
    />
    <h5 class="text-h5 px-7">
      {{ campaign.name }}
    </h5>
    <v-card-subtitle class="text-p py-1">
      {{ campaign.organization }}
    </v-card-subtitle>
    <a :href="campaign.page_url" target="_blank" rel="noopener noreferrer">
      {{ campaign.page_url }}
    </a>
    <v-card-actions class="d-flex justify-center mt-auto">
      <v-btn
        color="orange lighten-2"
        text
        :to="{
          name: 'Campaign',
          params: { campaignId: campaign.id }
        }"
      >
        View Campaign
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CampaignCard',
  props: {
    campaign: {
      type: Object,
      required: true
    }
  },
  data() {
    return { defaultCampaignLogoUrl: require('@/assets/images/cardimage.jpeg') }
  },
  methods: {
    getCampaignLogo(campaign) {
      if (!campaign) {
        return this.defaultCampaignLogoUrl
      }
      if (campaign.startsWith('/')) {
        return `${this.publicPath}${campaign.logo_url.slice(1)}`
      }
      return campaign
    }
  }
}
</script>

<style lang="less" scoped>
.cause-card {
  width: 300px;
}
</style>
