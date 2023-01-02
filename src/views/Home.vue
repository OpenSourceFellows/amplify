<template>
  <div v-if="mode === 'single'">
    <CampaignHero />
    <CampaignBlurb />
  </div>
  <div v-else>
    <home-hero />
    <campaign-cards />
  </div>
</template>

<script>
import CampaignHero from '@/components/CampaignHero.vue'
import HomeHero from '@/components/HomeHero.vue'
import CampaignBlurb from '@/components/CampaignBlurb.vue'
import CampaignCards from '@/components/CampaignCards'

export default {
  name: 'Home',
  components: {
    CampaignBlurb,
    CampaignCards,
    CampaignHero,
    HomeHero
  },
  data() {
    return {
      mode: ''
    }
  },
  computed: {
    campaign() {
      return this.$store.state.campaign
    }
  },
  created() {
    this.mode = process.env.VUE_APP_CAMPAIGN_MODE

    if (this.mode === 'single' && !this.campaign.id) {
      this.campaignId = process.env.VUE_APP_FEATURED_CAMPAIGN

      this.$store.commit('setGenericValue', {
        key: 'letterId',
        value: process.env.VUE_APP_LETTER_TEMPLATE
      })

      this.$store.commit('setGenericValue', { key: 'mode', value: 'single' })

      this.$store.dispatch('loadSingleCampaign', this.campaignId)
    }
  }
}
</script>
