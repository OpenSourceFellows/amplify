<template>
  <v-container>
    <v-row>
      <v-col v-for="(campaign, index) in campaigns" :key="index">
        <v-card class="mx-auto" max-width="344">
          <v-img
            :src="getCampaignLogo(campaign)"
            :alt="'Campaign logo for ' + campaign.name"
            height="200px"
          />

          <h5 class="text-h5" v-text="campaign.name" />

          <v-card-subtitle
            style="text-align: left"
            v-text="campaign.organization"
          />
          <v-card-actions>
            <a :href="'//' + campaign.page_url" target="_blank">
              {{ campaign.page_url }}
            </a>

            <v-spacer />
          </v-card-actions>
          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
              :to="{
                name: 'Campaign',
                params: { campaignId: campaign.id }
              }"
              @click="setCampaign(index)"
            >
              View Campaign
            </v-btn>

            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CampaignCards',
  data() {
    return {
      campaigns: [],
      publicPath: process.env.BASE_URL,
      defaultCampaignLogoUrl: require('@/assets/images/cardimage.jpeg')
    }
  },
  async created() {
    try {
      const res = await axios.get('/api/campaigns')
      this.campaigns = res.data
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    getCampaignLogo(campaign) {
      if (!campaign.logo_url) {
        return this.defaultCampaignLogoUrl
      }
      if (campaign.logo_url.startsWith('/')) {
        return `${this.publicPath}${campaign.logo_url.slice(1)}`
      }
      return campaign.logo_url
    },
    setCampaign(index) {
      this.$store.commit('setObjectValue', {
        key: 'campaign',
        data: this.campaigns[index]
      })
    }
  }
}
</script>

<style scoped></style>
