<template>
  <div class="home">
    <home-hero />
    <campaign-cards />
  </div>
</template>

<script>
import HomeHero from '@/components/HomeHero.vue'
import CampaignCards from '@/components/CampaignCards'

export default {
  name: 'Home',
  components: {
    HomeHero,
    CampaignCards
  }
}
</script>
