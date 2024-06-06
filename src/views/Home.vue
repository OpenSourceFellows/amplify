<template>
  <div>
    <CampaignHero />
    <CampaignBlurb />
  </div>
</template>

<script>
import CampaignHero from '@/components/CampaignHero.vue'
import CampaignBlurb from '@/components/CampaignBlurb.vue'

export default {
  name: 'Home',
  components: {
    CampaignBlurb,
    CampaignHero
  },
  computed: {},
  async created() {
    const mode = process.env.VUE_APP_CAMPAIGN_MODE
    const campaignId = process.env.VUE_APP_FEATURED_CAMPAIGN

    // Also populates representatives and assets
    await this.$store.dispatch('loadSingleCampaign', campaignId)

    this.$store.commit('setGenericValue', {
      key: 'letterId',
      value: process.env.VUE_APP_LETTER_TEMPLATE
    })

    this.$store.commit('setGenericValue', { key: 'mode', value: mode })
  }
}
</script>
