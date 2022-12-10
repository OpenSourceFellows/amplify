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
      const campaignId = process.env.VUE_APP_FEATURED_CAMPAIGN
      this.$store.commit('setGenericValue', {
        key: 'letterId',
        value: process.env.VUE_APP_LETTER_TEMPLATE
      })

      this.loadSingleCampaign(campaignId)
    }
  },
  methods: {
    async loadSingleCampaign(id) {
      const campaignUrl = `api/campaigns/${id}`

      axios
        .get(campaignUrl)
        .then((res) => {
          this.$store.commit('setObjectValue', {
            key: 'campaign',
            data: res.data
          })
        })
        .catch((e) => alert(e.message))
    }
  }
}
</script>
