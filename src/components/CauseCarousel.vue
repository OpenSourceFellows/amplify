<template lang="html">
  <section class="d-flex flex-column align-center my-6">
    <h4 class="text-h4">Other Bills that Need Your Help</h4>
    <p class="text-h6">
      Other people are also engaging with {{ repName }} on these causes.
    </p>

    <v-sheet class="d-flex justify-center cause-carousel">
      <v-slide-group
        v-model="slides"
        show-arrows
        class="mb-6"
        :center-active="true"
      >
        <v-slide-item
          v-for="campaign in campaigns"
          :key="campaign.id"
          class="mx-4 my-2"
        >
          <CampaignCard :campaign="campaign" />
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </section>
</template>

<script lang="js">
import axios from 'axios'
import CampaignCard from './CampaignCard.vue'

export default {
  name: 'CauseCarousel',
  components: { CampaignCard },
  props: [],
  data() {
    return {
      slides: 0,
      defaultCampaignLogoUrl: require('@/assets/images/cardimage.jpeg'),
      repName: 'Test Name', // Needs to be a prop or come from state?
      campaigns: []
    }
  },
  computed: {},
  created() {
    // Get campaigns from campaigns api
    axios.get('/api/campaigns').then((res) => {
      this.campaigns = [...res.data]
      console.log(this.campaigns)
    })
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

<style scoped lang="less">
.cause-carousel {
  width: 100%;
}
</style>
