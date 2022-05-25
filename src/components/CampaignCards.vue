<template>
  <v-container>
    <v-row>
      <v-col v-for="campaign in campaigns" :key="campaign.id">
        <v-card class="mx-auto" max-width="344">
          <v-img
            :src="require('@/assets/images/cardimage.jpeg')"
            height="200px"
          />

          <v-card-title>
            <p>
              {{ campaign.name }}
            </p>
          </v-card-title>

          <v-card-subtitle
            v-text="campaign.organization"
            style="text-align: left"
          />
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
      campaigns: []
    }
  },
  async created() {
    try {
      const res = await axios.get('/api/campaigns')
      this.campaigns = res.data
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped></style>
