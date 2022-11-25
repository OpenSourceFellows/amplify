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
import axios from 'axios'
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
      mode: '',
      campaignId: '',
      templateId: '',
      campaign: {}
    }
  },
  created() {
    this.mode = process.env.VUE_APP_CAMPAIGN_MODE

    if (this.mode === 'single') {
      this.campaignId = process.env.VUE_APP_FEATURED_CAMPAIGN
      this.templateId = process.env.VUE_APP_LETTER_TEMPLATE

      this.$store.commit('setGenericValue', {
        key: 'letterId',
        value: this.templateId
      })
      this.loadSingleCampaign()
    }
  },
  methods: {
    async loadSingleCampaign() {
      const campaignUrl = `api/campaigns/${this.campaignId}`

      axios
        .get(campaignUrl)
        .then((res) => {
          this.campaign = res.data
        })
        .catch((e) => alert(e.message))
    }
  }
}
</script>
