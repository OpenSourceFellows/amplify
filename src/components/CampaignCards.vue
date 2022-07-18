<template>
  <v-container>
    <v-row>
      <v-col v-for="campaign in campaigns" :key="campaign.id">
        <v-card class="mx-auto" max-width="344">
          <v-img
            :src="getCampaignLogo(campaign)"
            :alt="'Campaign logo for ' + campaign.name"
            height="200px"
          ></v-img>

          <h5 v-text="campaign.name" class="text-h5"></h5>

          <v-card-subtitle
            v-text="campaign.organization"
            style="text-align: left"
          >
          </v-card-subtitle>
          <v-card-actions>
            <a :href="'//' + campaign.page_url" target="_blank">
              {{ campaign.page_url }}
            </a>

            <v-spacer></v-spacer>
          </v-card-actions>
          <v-card-actions>
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

            <v-spacer></v-spacer>
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
    }
  }
}
</script>

<style scoped></style>
